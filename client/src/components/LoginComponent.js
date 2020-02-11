import React from 'react';
import {Link} from 'react-router-dom';
import {styleFormPosition} from './styles/formstyle';
import {useFormik} from 'formik';
import {loginValidation as validate} from './formValidation/loginRegisterValidation';

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }
  })
  
  return (
    <div id="login-page">
    <h1 className="display-4 text-center"> Welcome To Contact App </h1>
    <div style={styleFormPosition()}>
      <div className="shadow p-3 bg-white rounded" style={{ height: '50%', width: '40%' }}>
        <h4 className="text-center"> Please Login </h4>
         
        <form onSubmit= {formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail"> Email </label>
            <input
            name="email" 
            value={formik.values.email} 
            onChange={formik.handleChange} 
            type="text" 
            id="inputEmail" 
            onBlur={formik.handleBlur}
            className="form-control" />
             {formik.touched.email && formik.errors.email ? <p className="text-danger" role="alert">{formik.errors.email}</p>: ''}
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword"> Password </label>
            <input
            name="password" 
            value={formik.values.password} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            type="password" 
            id="inputPassword" 
            className="form-control" />
            {formik.touched.password && formik.errors.password ? <p className="text-danger" role="alert">{formik.errors.password}</p>: ''}
          </div>
          <div id="button-submit-login" className="text-center">
          <button type="submit" className="btn btn-primary"> Submit </button>
            <Link className="p-1" to="/signup">Not have any account yet?</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
export default Login