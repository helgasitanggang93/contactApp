import React from 'react';
import FormRoot from './FormRoot';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateContactApi} from '../store/actions';

const UpdateContactForm = (props) => {
  const onSubmit = (formValues, idContact) => {
    formValues.phoneNumber = `+${formValues.phoneNumber}`
    props.updateContactApi(formValues, idContact)

  }
  return (
    <div>
      <FormRoot titleForm={'Update Contact'} bindSubmit={onSubmit} />
    </div>
  );
}

const mapStore = state => {
  return state
}


export default withRouter(connect(mapStore, {updateContactApi})(UpdateContactForm));