import React from 'react';
import { connect } from 'react-redux';
import {
  deleteContactApi, 
  fetchAllContact, 
  clearContacts, 
  fetchOneContact,
ascendingSort,
descendingSort} from '../store/actions';

const ListContacts = (props) => {
 
  const deleteContact = (contactId) => {
    props.deleteContactApi(contactId)
  }

  const updateContact = (contactId) => {
    props.fetchOneContact(contactId)
  }

  const Sort = () => {
    return (
      <div className="dropdown pb-1">
        <button className="btn btn-info dropdown-toggle text-white" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <button onClick={() => props.ascendingSort('name')} type="button" className="btn btn-link text-dark" style={{textDecoration: 'none'}}>Sort Name A-Z</button><br/>
        <button onClick={() => props.descendingSort('name')} type="button" className="btn btn-link text-dark" style={{textDecoration: 'none'}}>Sort Name Z-A</button>
        <div className="dropdown-divider"></div>
        <button onClick={() => props.ascendingSort('address')} type="button" className="btn btn-link text-dark" style={{textDecoration: 'none'}}>Sort Address A-Z</button><br/>
        <button onClick={() => props.descendingSort('address')} type="button" className="btn btn-link text-dark" style={{textDecoration: 'none'}}>Sort Address Z-A</button>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow p-3 bg-white rounded" style={{margin: '0'}}>
       {props.reducer.contacts.length !== 0 ? <p className="h4 text-center">Contact List</p> : <p className="h4 text-center">Create Your Contact</p>}
      {props.reducer.contacts.length !== 0 ? <Sort/> : ''}
      <div className="row">
        {props.reducer.contacts.map(element => {
          return (
            <div key={element._id} className="col-6">
            <div className="d-inline-flex shadow bg-white rounded mb-3" style={{ width: '400px', height: '200px', overflow: 'auto'}}>
              <div className="d-flex align-items-center justify-content-center pl-1">
              <img src={element.image} alt="profile" style={{borderRadius:'50%', width:'100px'}}/>
              </div>
              <div style={{paddingLeft: '10px',paddingTop:'10px', margin: '0', lineHeight: 'normal'}}>
                <h5> {element.fullName} </h5>
                <p> Address: {element.address}</p>
                <p>Phone Number:{element.phoneNumber}</p>
                <div>
                <button onClick={() => updateContact(element._id)} className="btn btn-warning btn-sm m-1" type="button">Update</button>
                <button onClick={() => deleteContact(element._id)} className="btn btn-danger btn-sm" type="button">Delete</button>
              </div>
              </div>
            </div>   
          </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStore = state => {
  return state
}
export default connect(mapStore, {
  deleteContactApi, 
  fetchAllContact, 
  clearContacts, 
  fetchOneContact,
ascendingSort, 
descendingSort})(ListContacts)