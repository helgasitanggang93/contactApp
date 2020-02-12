import axios from '../../apis/contactApi';
import Swal from 'sweetalert2';

export const FETCH_CONTACTS = 'fetch_contacts'
export const FETCH_DETAILS_CONTACT = 'fetch_detail_contact'
export const IS_LOGIN = 'is_login'
export const ERROR_MESSAGE = 'error_message'
export const IS_LOADING = 'is_LOADING'
export const IS_ERROR = 'is_error'
export const IS_REGISTER = 'is_register'

export const clearErrMessage = () => dispatch => {
  dispatch({
    type: ERROR_MESSAGE,
    payload: ''
  })

  dispatch({
    type: IS_ERROR,
    payload: false
  })

  dispatch({
    type: IS_REGISTER,
    payload: false
  })
}

export const checkAuthenticated = (value) => dispatch => {
  dispatch({
    type: IS_LOGIN,
    payload: value
  })
}

export const registerSubmit = (values) => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  })

  const {email, password} = values
  axios.post('users/signup', {
    email: email,
    password: password
  })
  .then(({data})=>{
   if(data){
    dispatch({
      type: IS_REGISTER,
      payload: true
    })
    dispatch({
      type: IS_LOADING,
      payload: false
    })
    Swal.fire({
      icon: 'success',
      title: 'Register Success',
      text: 'Please Login'
    })
   }
  })
  .catch(error => {
    if(error.response){
      if(error.response.status === 400){
        dispatch({
          type: IS_ERROR,
          payload: true
        })
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        })
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          })
          dispatch({
            type: ERROR_MESSAGE,
            payload: ''
          })
        }, 3000)
      }
    }else {
      dispatch({
        type: IS_ERROR,
        payload: true
      })
      dispatch({
        type: ERROR_MESSAGE,
        payload: 'Network Error/Server Error'
      })

      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        })
        dispatch({
          type: ERROR_MESSAGE,
          payload: ''
        })
      }, 3000)
      
    }
  })
}

export const loginSubmit = (values) => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  })
  const {email, password} = values
  axios.post('/users/login', {
    email: email,
    password: password
  })
  .then(({data})=> {
    localStorage.setItem('token', data.token)
    dispatch({
      type: IS_LOGIN,
      payload: true
    })
    dispatch({
      type: IS_LOADING,
      payload: false
    })
  })
  .catch(error => {
    if(error.response){
      dispatch({
        type: IS_ERROR,
        payload: true
      })
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data
      })
      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        })
        dispatch({
          type: ERROR_MESSAGE,
          payload: ''
        })
      }, 3000)
    }else {
      dispatch({
        type: IS_ERROR,
        payload: true
      })
      dispatch({
        type: ERROR_MESSAGE,
        payload: 'Network Error/Server Error'
      })

      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        })
        dispatch({
          type: ERROR_MESSAGE,
          payload: ''
        })
      }, 3000)

    }
  })

}

export const CreateContactApi = (values) => dispatch => {
  const {fullName, address, phoneNumber, image} = values
  axios.defaults.headers.common["token"] = localStorage.token;
  if(!image || image.length === 0){
    axios.post('/contacts', {
      fullName,
      phoneNumber,
      address
    }).then(({data}) => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  }else {
    let formdata = new FormData()
    let imageLink = ''
    formdata.append('image', image[0])
    axios.post('/upload', formdata)
    .then(({data})=> {
      imageLink = data.link
      return axios.post({fullName,
        phoneNumber,
        address,
        image: imageLink})
    })
    .then(({data})=> {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  }

}