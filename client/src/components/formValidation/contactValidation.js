const checkFormatNumber = (values) => {
  let phoneNumber = String(values)
  for (let i = 0; i < phoneNumber.length; i++) {
    if (phoneNumber[i] === 'e' || phoneNumber[i] === '-' || phoneNumber[i] === '+' || phoneNumber[i] === ',' || phoneNumber[i] === '.') {
      return false
    }
  }

  return true
}

export const contactValidation = (values) => {
  let errors = {}
  let emailRegex = /^[a-zA-Z ]*$/
  let phoneRegex = /^[0-9]*$/

 

  if (!values.fullName) {
    errors.fullName = 'Full name required'
  } else if (!emailRegex.test(values.fullName)) {
    errors.fullName = 'Full name only contain alphabetic'
  }

  if (!values.address) {
    errors.address = 'Address required'
  } else if (values.address.length < 3 || values.address.length > 100) {
    errors.address = 'Length of Address should be greater then 3 and less then 101'
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number required'
  } else if (!phoneRegex.test(values.phoneNumber) || !checkFormatNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number should contain number'
  }

  if (typeof values.image === 'object') {
    if (values.image[0]) {
      if (values.image[0].size > 5242880) {
        errors.image = 'maximum file size is 5 MB'
      } else if (values.image[0].type !== 'image/png' && values.image[0].type !== 'image/jpg' && values.image[0].type !== 'image/jpeg') {
        errors.image = 'should upload jpg, png or jpeg'
      }

    }

  }
  return errors
}