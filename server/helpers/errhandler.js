const errHadnler = (err) => {
  if(err.status === undefined || err.status == null){
    err.status = 400
  }
  let errorDetail = {status: err.status, message: err.message}
  if(err.message === undefined || err.message == null){
    switch (err.status) {
      case 401:
        errorDetail.message = 'Unauthorized Access'
        break;
      case 403:
        errorDetail.message = 'Forbidden Access'
        break;
      case 404: 
        errorDetail.message = 'Page Not Found'
        break;
      case 500:
        errorDetail.message = 'Internal Server Error'
        break
      default:
        errorDetail.message = err.message
        break;
    }
  }
  return errorDetail
}

module.exports = errHadnler