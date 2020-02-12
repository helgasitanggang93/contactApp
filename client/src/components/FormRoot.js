import React from 'react';
import { useFormik } from 'formik'
import { contactValidation as validate } from './formValidation/contactValidation'

const FormRoot = (props) => {

  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      image: '',
      phoneNumber: ''
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      props.onSubmit(values)
      setSubmitting(false)
      resetForm()
    }
  })

  const lengthValue = (limit, lengthValue = 0) => {
    return limit -= lengthValue
  }

  return (
    <div className="shadow p-3 bg-white rounded">
      <form onSubmit={formik.handleSubmit}>
        <div id="form-root-title">
          <h4 className="text-center"> Create Data </h4>
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
              <div className="input-group-text">+62</div>
            </div>
            <input
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="form-phonenumber-input"
              className="form-control" />
               {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="text-danger" role="alert">{formik.errors.phoneNumber}</p>: ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="customFile"> Image </label>
          <input
            type="file"
            className="form-control-file border"
            id="customFile"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.image && formik.errors.image ? <p className="text-danger" role="alert">{formik.errors.image}</p>: ''}
        </div>

        <button type="submit" className="btn btn-primary text-center"> Submit </button>
      </form>
    </div>
  );
}

export default FormRoot