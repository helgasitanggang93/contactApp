import React from 'react';
import {Route, Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
const PrivateRoute = ({ comp: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => 
       localStorage.token ? 
        <Component {...props}/> 
        : (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>)}
    />
  );
}

const mapToStore = state => {
  return state
}

export default withRouter(connect(mapToStore, {})(PrivateRoute))