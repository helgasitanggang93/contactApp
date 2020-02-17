import React from 'react';
import { useFormik } from 'formik'
import { contactValidation as validate } from './formValidation/contactValidation'
import {connect} from 'react-redux';
import {cancelSubmit} from '../store/actions';

const FormRoot = (props) => {
  
  const formik = useFormik({
    initialValues: {
      fullName: props.reducer.detailContact.fullName || '',
      address: props.reducer.detailContact.address || '',
      image: props.reducer.detailContact.image || '',
      phoneNumber: Number(props.reducer.detailContact.phoneNumber) || ''
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm, setFieldValue , setValues}) => {
      props.bindSubmit(values, props.reducer.detailContact._id)
      setValues({fullName: '', address: '', image: '', phoneNumber: ''})
      resetForm({})
      setFieldValue('image', {})
      setSubmitting(false)
    }
  })

  const cancelInput = (event) => {
    event.preventDefault()
    formik.setValues({fullName: '', address: '', image: '', phoneNumber: ''})
    formik.setFieldValue('image', undefined)
    props.cancelSubmit()
  }

  const lengthValue = (limit, lengthValue = 0) => {
    return limit -= lengthValue
  }
  return (
    <div className="shadow p-3 bg-white rounded">
      <form onSubmit={formik.handleSubmit}>
        <div id="form-root-title">
          <h4 className="text-center"> {props.titleForm} </h4>
        </div>
        <div className="form-group">
          <label htmlFor="form-fullname-input"> Full Name </label>
          <input
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="form-fullname-input"
            className="form-control" />
             {formik.touched.fullName && formik.errors.fullName ? <p className="text-danger" role="alert">{formik.errors.fullName}</p>: ''}
        </div>
        <div className="form-group">
          <label htmlFor="form-address-input"> Address </label>
          <input
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength="100"
            minLength="5"
            type="text"
            id="form-address-input"
            className="form-control" />
          <p className="text-muted"> Maximum length of Addres: {lengthValue(100, formik.values.address.length)}</p>
          {formik.touched.address && formik.errors.address ? <p className="text-danger" role="alert">{formik.errors.address}</p>: ''}
        </div>
        <div className="form-group">
          <label htmlFor="form-phonenumber-input"> Phone Number </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">+</div>
            </div>
            <input
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="form-phonenumber-input"
              className="form-control" />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="text-danger" role="alert">{formik.errors.phoneNumber}</p>: ''}
        </div>
        <label> Image </label>
        <div className="form-group">
          <input
            type="file"  
            name="image"
            onChange={(event) => {formik.setFieldValue('image', event.currentTarget.files)}}
            onBlur={formik.handleBlur}
          /> 
           {formik.touched.image && formik.errors.image ? <p className="text-danger" role="alert">{formik.errors.image}</p>: ''}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary"> Submit </button>
          <button onClick={cancelInput} type="button" className="btn btn-secondary m-1"> cancel </button>
        </div>
      </form>
    </div>
  );
}

const MapToProps = state => {
  return state
}

export default connect(MapToProps, {cancelSubmit})(FormRoot)