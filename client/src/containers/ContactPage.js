import React, {useEffect} from 'react';
import auth from '../helpers/checkAuth';
import {useHistory} from 'react-router-dom';
import CreateContact from '../components/CreateContact';
const ContactPage = (props) => {
  let history = useHistory()
  useEffect(() => {
    if(localStorage.token){
      auth.login(() => {
        history.push('/');
      })
    }
  },[history])
  return(
    <div>
      <header>
      <nav className="navbar navbar-dark justify-content-between" style={{backgroundColor: '#57007e'}}>
        <h3 className="text-light">CA</h3>
        <button className="btn btn-outline-light" onClick={() => auth.logout(() => {props.history.push('/login')})}>Log Out</button>
      </nav>
      <h2 className="text-center pt-2">CONTACT APP</h2>
      </header>
     <section className="container">
       <div className="row">
         <div className="col-4">
           <CreateContact/>
         </div>
         <div className="col-8">
         </div>
       </div>
     </section>
     <footer className="fixed-bottom" style={{backgroundColor: '#57007e'}}>
        <div className="footer-copyright text-center p-2">
          <p className="text-light"> <span>© 2020 Copyright:</span> WH </p> 
        </div>
     </footer>
    </div>
  );
}

export default ContactPage