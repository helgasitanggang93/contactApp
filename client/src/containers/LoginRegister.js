import React from 'react'
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent'
import {
  Route,
  Switch} from 'react-router-dom';
const LoginRegisterPage = () => {
  return (
    <div>
       
       <Switch>
         <Route path="/user/login">
          <LoginComponent/>
        </Route>
        <Route path="/user/signup">
          <RegisterComponent/>
        </Route>
      </Switch> 
    </div>
  );
}

export default LoginRegisterPage;