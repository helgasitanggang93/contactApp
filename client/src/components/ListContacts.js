import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { styleUploadFile } from "./styles/formstyle";
import { connect } from "react-redux";
import {
  deleteContactApi,
  fetchAllContact,
  clearContacts,
  fetchOneContact,
  ascendingSort,
  descendingSort,
  cancelSubmit,
  uploadCsvApi
} from "../store/actions";

const ListContacts = props => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const updateContact = contactId => {
    props.fetchOneContact(contactId);
  };

  const UploadCsv = () => {
    const onChangeHandler = event => {
      props.uploadCsvApi(event.target.files);
    };
    return (
      <div className="form-group p-2">
        <label
          htmlFor="csv-upload"
          className="custom-file-upload"
          style={styleUploadFile()}
        >
          <i className="fa fa-cloud-upload"></i> Upload Csv
        </label>
        <input
          style={{ display: "none" }}
          id="csv-upload"
          type="file"
          name="image"
          onChange={onChangeHandler}
        />
      </div>
    );
  };

  const Sort = () => {
    return (
      <div className="dropdown p-2">
        <button
          className="btn btn-info dropdown-toggle text-white"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <button
            onClick={() => props.ascendingSort("name")}
            type="button"
            className="btn btn-link text-dark"
            style={{ textDecoration: "none" }}
          >
            Sort Name A-Z
          </button>
          <br />
          <button
            onClick={() => props.descendingSort("name")}
            type="button"
            className="btn btn-link text-dark"
            style={{ textDecoration: "none" }}
          >
            Sort Name Z-A
          </button>
          <div className="dropdown-divider"></div>
          <button
            onClick={() => props.ascendingSort("address")}
            type="button"
            className="btn btn-link text-dark"
            style={{ textDecoration: "none" }}
          >
            Sort Address A-Z
          </button>
          <br />
          <button
            onClick={() => props.descendingSort("address")}
            type="button"
            className="btn btn-link text-dark"
            style={{ textDecoration: "none" }}
          >
            Sort Address Z-A
          </button>
        </div>
      </div>
    );
  };

  const triggerButton = (status, contactId, fullName) => {
    setShow(status);
    setId(contactId);
    setName(fullName);
    props.cancelSubmit();
  };

  const DeleteButton = () => {
    const handleClose = () => {
      setId("");
      setName("");
      setShow(false);
    };
    const deleteContact = () => {
      props.deleteContactApi(id);
      setShow(false);
      setId("");
      setName("");
    };

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>DELETE ALERT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>{name}</strong> contact?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button className="btn btn-danger" onClick={deleteContact}>
              Yes, Delete it!!
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className="shadow p-3 bg-white rounded" style={{ margin: "0" }}>
      {props.reducer.contacts.length !== 0 ? (
        <p className="h4 text-center">Contact List</p>
      ) : (
        <p className="h4 text-center">Create Your Contact</p>
      )}
      <div className="d-flex flex-row bd-highlight">
        {props.reducer.contacts.length !== 0 ? <Sort /> : ""}
        <UploadCsv />
      </div>
      <div className="row">
        {props.reducer.contacts.map(element => {
          return (
            <div key={element._id} className="text-center col-sm col-md-6 m-0 p-0">
              <div
                className="d-inline-flex shadow bg-white rounded mb-3"
                style={{ width: "400px", height: "200px", overflow: "auto" }}
              >
                <div className="d-flex align-items-center justify-content-center pl-1">
                  <img
                    src={element.image}
                    alt="profile"
                    style={{ borderRadius: "50%", width: "100px" }}
                  />
                </div>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    margin: "0",
                    lineHeight: "normal"
                  }}
                >
                  <h5> {element.fullName} </h5>
                  <p> Address: {element.address}</p>
                  <p>Phone Number:{element.phoneNumber}</p>
                  <div>
                    <button
                      onClick={() => updateContact(element._id)}
                      className="btn btn-warning btn-sm m-1"
                      type="button"
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() =>
                        triggerButton(true, element._id, element.fullName)
                      }
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <DeleteButton />
      </div>
    </div>
  );
};

const mapStore = state => {
  return state;
};
export default connect(mapStore, {
  deleteContactApi,
  fetchAllContact,
  clearContacts,
  fetchOneContact,
  ascendingSort,
  descendingSort,
  cancelSubmit,
  uploadCsvApi
})(ListContacts);
