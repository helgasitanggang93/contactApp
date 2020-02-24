import React from 'react';
import ContactPage from './containers/ContactPage';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import {connect} from 'react-redux';
import {checkAuthenticated, fetchAllContact, clearContacts, changeLoginStatus} from './store/actions'
import PrivateRoute from './helpers/PrivateRoute';

import {
  Route, 
  withRouter,
  Switch} from 'react-router-dom';

class App extends React.Component {
  componentDidMount(){
    if(localStorage.token){ 
      this.props.fetchAllContact()
      this.props.changeLoginStatus(true)
      this.props.history.push('/')
    }else {
      this.props.changeLoginStatus(false)
    }
  }
  render() {
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
          <PrivateRoute path="/" exact comp={ContactPage} />
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStore = state => {
  return state
}

export default withRouter(connect(mapStore, {checkAuthenticated, fetchAllContact, clearContacts, changeLoginStatus})(App));
