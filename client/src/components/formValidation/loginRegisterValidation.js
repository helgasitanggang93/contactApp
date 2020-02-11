var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i


export const loginValidation = (values) => {
  let errors = {}
  var resultEmail = regex.test(values.email)
  
  if(!values.email){
   errors.email = 'Email required'
  }else if(!resultEmail){
    errors.email = 'Format email invalid'
  }

  if(!values.password){
    errors.password = 'Password required'
  }

  return errors
}

export const registerValidation = (values) => {
  let errors = {}
  var resultEmail = regex.test(values.email)

  if(!values.email){
   errors.email = 'Email required'
  }else if(!resultEmail){
    errors.email = 'Format email invalid'
  }

  if(!values.password){
    errors.password = 'Password required'
  }else if(values.password.length < 6){
    errors.password = 'Length of password must greater then 5'
  }

  if(!values.rePassword){
    errors.rePassword = 'Re Type password required'
  }else if(values.password !== values.rePassword){
    errors.rePassword = 'Password not same'
  }

  return errors
}