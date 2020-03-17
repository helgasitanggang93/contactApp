const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
let redisUrl = process.env.REDISCLOUD_URL_PRODUCTION || process.env.REDISCLOUD_URL_DEVELOPMENT
/**
 * check if on production stage, mutate to RedisCloud url
 */
// if (process.env.NODE_ENV === "production") {
//   redisUrl = process.env.REDISCLOUD_URL;
// }
const client = redis.createClient(redisUrl, { no_ready_check: true });
client.hget = util.promisify(client.hget); // since redis not provide promise, we should make it promise using promisify
/**
 * Hijack mongoose Query to get exec
 */
const exec = mongoose.Query.prototype.exec;

/**
 * add one property to receive user id
 */
mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

/**
 * setting up exec function
 */
mongoose.Query.prototype.exec = async function() {
  /**
   * check if mongoose query not implement cache(key: <userId?: String>), then execute the query directly
   */
  if (!this.useCache) {
    /**
     * execute the exec function
     */
    return exec.apply(this, arguments);
  }

  /**
   * create Object contain type of query and collection name
   * convert into string (redis hget only accept string)
   * store into const
   */
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );
  /**
   * check into cache, if the data exist on cache then cacheValue contain data
   */
  const cacheValue = await client.hget(this.hashKey, key);

  /**
   * if the data exist send the data from cache
   */
  if (cacheValue) {
    /**
     * cacheValue still string type then convert it because it should be an array or an object
     */
    const doc = JSON.parse(cacheValue);
    /**
     * check if the data an array, it should maping into collection model one by one
     */
    return Array.isArray(doc)
      ? doc.map(element => new this.model(element))
      : new this.model(doc);
  }
  /**
   * if there is no data in cache, get data from mongoDB by execute the query
   */
  const result = await exec.apply(this, arguments);
  /**
   * set the data into cache using hset redis query
   */
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 20);
  return result;
};

module.exports = {
  /**
   * function to clear cache by id
   * hashKey?: Object - contain {key: userId}
   */
  clearHash(hashKey) {
    /**
     * redis query to delete data
     */
    client.del(JSON.stringify(hashKey));
  }
};
