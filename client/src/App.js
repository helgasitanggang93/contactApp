import React from 'react';
import ContactPage from './containers/ContactPage';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import {connect} from 'react-redux';
import {
  Route, 
  withRouter, 
  Switch} from 'react-router-dom';

function App(props) {
  return (
   
    <div className="App">
      <header>
      </header>
      <section>
        <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        </Switch>
      </section>
    </div>
  );
}

// const fakeAuth = {
//   isAuthenticated: false,
//   isAuthenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100)
//   },
//   signOut(cb){
//     fakeAuth.isAuthenticate = false;
//     setTimeout(cb, 100)
//   }
// }

// function PrivateRoute({children, ...rest}) {
//   return(
//     <Route
//       {...rest}
//       render={({location}) => {
//         fakeAuth
//       }} 
//     />
//   );
// }

const mapStore = state => {
  return state
}

export default withRouter(connect(mapStore, {})(App));
