const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
let redisUrl = 'redis://127.0.0.1:6379';
if(process.env.NODE_ENV === 'production'){
  redisUrl = process.env.REDISCLOUD_URL 
}
const client = redis.createClient(redisUrl, {no_ready_check: true})
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key || '');
 
  return this
}

mongoose.Query.prototype.exec = async function () {
  if(!this.useCache){
    return exec.apply(this, arguments)
  } 
 
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {collection: this.mongooseCollection.name})) 
  const cacheValue = await client.hget(this.hashKey, key) 

  if(cacheValue){ 
    const doc = JSON.parse(cacheValue) 
   return Array.isArray(doc) ? doc.map(element => new this.model(element)) : new this.model(doc) 
  }
  const result = await exec.apply(this, arguments)
  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 1800)
  return result
}

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
}