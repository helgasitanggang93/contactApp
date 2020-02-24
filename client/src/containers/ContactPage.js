import React from 'react';
import CreateContact from '../components/CreateContact';
import ListContact from '../components/ListContacts';
import UpdateContact from '../components/UpdateContact';
import LoadingPage from '../components/LoadingPage';
import {fetchAllContact, clearContacts, changeLoginStatus} from '../store/actions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ContactPage extends React.Component {
  componentDidMount(){
    if(localStorage.token){ 
      this.props.fetchAllContact()
      this.props.changeLoginStatus(true)
    }
  }

  componentWillUnmount(){
    this.props.clearContacts()

  }

  logOut = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }

  render(){
    return(
      <div>
        <header>
        <nav className="navbar navbar-dark justify-content-between" style={{backgroundColor: '#57007e'}}>
          <h3 className="text-light">CA</h3>
          <button className="btn btn-outline-light" onClick={() => this.logOut()}>Log Out</button>
        </nav>
        <h2 className="text-center pt-2">CONTACT APP</h2>
        {this.props.reducer.isError ? <p className="text-danger" role="alert">{this.props.reducer.errMessage}</p>: ''}
        </header>
       <section className="container-fluid">
         <div className="row">
           <div className="col-4">
             {this.props.reducer.isUpdate ? <UpdateContact/> : <CreateContact/>}
           </div>
           <div className="col-8">
            {this.props.reducer.isLoading ? <LoadingPage/> : <ListContact/>}
           </div>
         </div>
       </section>
       
      </div>
    );
  }
}

const mapStore = state => {
  return state
}

export default withRouter(connect(mapStore, {fetchAllContact, clearContacts, changeLoginStatus})(ContactPage)) 