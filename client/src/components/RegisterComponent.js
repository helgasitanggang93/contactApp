import React from 'react';
import { Link , withRouter, Redirect} from 'react-router-dom';
import { styleFormPosition } from './styles/formstyle';
import {useFormik} from 'formik';
import {registerValidation as validate} from './formValidation/loginRegisterValidation'
import {connect} from 'react-redux';
import {registerSubmit, clearErrMessage} from '../store/actions'

const Register = (props) => {

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rePassword: ''
    },
    validate,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      props.registerSubmit(values)
        setSubmitting(false)
        resetForm()  
    }
  })

  const clearError = () => {
    props.clearErrMessage()
  }

  if(props.reducer.isRegister === true){
    props.clearErrMessage()
    return <Redirect to="/login" />
  }

  return (
    <div id="register-page">
      <header>
        <h1 className="display-4 text-center"> Welcome To Contact App </h1>
      </header>
      <section style={styleFormPosition()}>
        <div className="shadow p-3 bg-white rounded" style={{ height: '65%', width: '40%' }}>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <div id="back-to-login">
                  <Link onClick={clearError} to="/login">Back to Login</Link> 
                <h4 className="text-center"> Please Register </h4>
                {props.reducer.isError ? <p className="text-danger" role="alert">{props.reducer.errMessage}</p>: ''}
              </div>
              <label htmlFor="register-email-input"> Email </label>
              <input
              name="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text" 
              id="register-email-input" 
              className="form-control" />
              {formik.touched.email && formik.errors.email ? <p className="text-danger" role="alert">{formik.errors.email}</p>: ''}
            </div>
            <div className="form-group">
              <label htmlFor="register-password-input"> Password </label>
              <input 
              name="password"
              value={formik.values.password} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              type="password" 
              id="register-password-input" 
              className="form-control" />
              {formik.touched.password && formik.errors.password ? <p className="text-danger" role="alert">{formik.errors.password}</p>: ''}
            </div>
            <div className="form-group">
              <label htmlFor="register-repassword-input"> Re-type Password </label>
              <input 
              name="rePassword"
              value={formik.values.rePassword} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              type="password" 
              id="register-repassword-input" 
              className="form-control" />
              {formik.touched.rePassword && formik.errors.rePassword ? <p className="text-danger" role="alert">{formik.errors.rePassword}</p>: ''}
            </div>
            <button type="submit" className="btn btn-primary text-center"> Submit </button>
          </form>
        </div>
      </section>
    </div>
  );
}

const mapStore = state => {
  return state
}

export default withRouter(connect(mapStore, {registerSubmit, clearErrMessage})(Register));