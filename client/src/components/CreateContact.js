import React from 'react';
import FormRoot from './FormRoot';

const CreateContact = () => {
  const onSubmit = (formValues) => {
    console.log(formValues)
  }
  return (
    <div>
      <FormRoot onSubmit={onSubmit} />
    </div>
  );
}

export default CreateContact