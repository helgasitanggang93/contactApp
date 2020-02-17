import React from 'react';
import FormRoot from './FormRoot';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {CreateContactApi} from '../store/actions'
const CreateContact = (props) => {
  const onSubmit = (formValues) => {
    formValues.phoneNumber = `+${formValues.phoneNumber}`
    props.CreateContactApi(formValues)
  }
  return (
    <div>
      <FormRoot titleForm={'Create Contact'} bindSubmit={onSubmit} />
    </div>
  );
}

const mapStore = state => {
  return state
}


export default withRouter(connect(mapStore, {CreateContactApi})(CreateContact));