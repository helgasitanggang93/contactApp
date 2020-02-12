import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../helpers/checkAuth';

export function PrivateRoute({ comp: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? 
          <Component {...props}/>
         : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}