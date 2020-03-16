const {messageHandler} = require('./constantType');

const errHadnler = (err) => {
  if(err.status === undefined || err.status == null){
    err.status = 400
  }
  let errorDetail = {status: err.status, message: err.message}
  if(err.message === undefined || err.message == null){
    switch (err.status) {
      case 400:
        errorDetail.message = messageHandler.err400message
        break;
      case 401:
        errorDetail.message = messageHandler.err401message
        break;
      case 403:
        errorDetail.message = messageHandler.err403message
        break;
      case 404: 
        errorDetail.message = messageHandler.err404message
        break;
      case 500:
        errorDetail.message = messageHandler.err500message
        break
      default:
        errorDetail.message = err.message
        break;
    }
  }
  return errorDetail
}

module.exports = errHadnler