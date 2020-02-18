if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const contactRoutes = require('./routes');
const mongoose = require('mongoose');
let uri =`mongodb://localhost:27017/contact-app` + process.env.NODE_ENV
if(process.env.NODE_ENV === 'production'){
  uri = process.env.MONGODB_URI
}
const errHandler = require('./helpers/errhandler')

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, function (err) {
  if(err){
    console.log(err);
  }else {
    console.log(`${uri} successfully conected`);
    
  }
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api', contactRoutes);
app.use((err, req, res, next)=>{
  let errorDetail = errHandler(err)
  res.status(errorDetail.status).json(errorDetail.message)
})
app.listen(port, function(){
  console.log(`Listening to Port ${port}`);
})

module.exports = app;