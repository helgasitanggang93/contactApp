import axios from "../../apis/contactApi";
import Swal from "sweetalert2";

export const FETCH_CONTACTS = "fetch_contacts";
export const FETCH_DETAILS_CONTACT = "fetch_detail_contact";
export const IS_LOGIN = "is_login";
export const ERROR_MESSAGE = "error_message";
export const IS_LOADING = "is_LOADING";
export const IS_ERROR = "is_error";
export const IS_REGISTER = "is_register";
export const IS_UPDATE = "is_update";
export const CREATE_DATA = "create_data";

export const clearErrMessage = () => dispatch => {
  dispatch({
    type: ERROR_MESSAGE,
    payload: ""
  });

  dispatch({
    type: IS_ERROR,
    payload: false
  });

  dispatch({
    type: IS_REGISTER,
    payload: false
  });
};

export const ascendingSort = values => (dispatch, getState) => {
  if (values === "name") {
    let sortedName = getState().reducer.contacts.sort(function(a, b) {
      if (a.fullName < b.fullName) {
        return -1;
      }
      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: FETCH_CONTACTS,
      payload: sortedName
    });
  } else if (values === "address") {
    let sortedAddress = getState().reducer.contacts.sort(function(a, b) {
      if (a.address < b.address) {
        return -1;
      }
      if (a.address > b.address) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: FETCH_CONTACTS,
      payload: sortedAddress
    });
  }
};

export const descendingSort = values => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });
  if (values === "name") {
    let sortedName = getState().reducer.contacts.sort(function(a, b) {
      if (a.fullName > b.fullName) {
        return -1;
      }
      if (a.fullName < b.fullName) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: FETCH_CONTACTS,
      payload: sortedName
    });
    dispatch({
      type: IS_LOADING,
      payload: false
    });
  } else if (values === "address") {
    let sortedAddress = getState().reducer.contacts.sort(function(a, b) {
      if (a.address > b.address) {
        return -1;
      }
      if (a.address < b.address) {
        return 1;
      }
      return 0;
    });
    dispatch({
      type: FETCH_CONTACTS,
      payload: sortedAddress
    });
    dispatch({
      type: IS_LOADING,
      payload: false
    });
  }
};

export const changeLoginStatus = value => dispatch => {
  dispatch({
    type: IS_LOGIN,
    payload: value
  });
};

export const cancelSubmit = () => dispatch => {
  dispatch({
    type: FETCH_DETAILS_CONTACT,
    payload: {}
  });

  dispatch({
    type: IS_UPDATE,
    payload: false
  });
};

export const clearContacts = () => dispatch => {
  dispatch({
    type: FETCH_CONTACTS,
    payload: []
  });
};

export const checkAuthenticated = value => dispatch => {
  dispatch({
    type: IS_LOGIN,
    payload: value
  });
};

export const registerSubmit = values => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });

  const { email, password } = values;
  axios
    .post("users/signup", {
      email: email,
      password: password
    })
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: IS_REGISTER,
          payload: true
        });
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        Swal.fire({
          icon: "success",
          title: "Register Success",
          text: "Please Login"
        });
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 400) {
          dispatch({
            type: IS_ERROR,
            payload: true
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: error.response.data
          });
          setTimeout(() => {
            dispatch({
              type: IS_ERROR,
              payload: false
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload: ""
            });
          }, 3000);
        }
      } else {
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    });
};

export const loginSubmit = (values, history) => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });
  const { email, password } = values;
  axios
    .post("/users/login", {
      email: email,
      password: password
    })
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: IS_LOGIN,
          payload: true
        });
      }
      localStorage.setItem("token", data.token);
      history.push("/");
      dispatch({
        type: IS_LOADING,
        payload: false
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    });
};

export const CreateContactApi = values => async dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });

  try {
    const { fullName, address, phoneNumber, image } = values;
    axios.defaults.headers.common["token"] = localStorage.token;
    if (!image || image.length === 0) {
      let createContactWithoutImage = await axios.post(`/contacts`, {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber
      });
      dispatch({
        type: CREATE_DATA,
        payload: createContactWithoutImage.data
      });
      dispatch({
        type: IS_LOADING,
        paylaod: false
      });
    } else {
      let formdata = new FormData();
      formdata.append("image", image[0]);
      let imageLink = await axios.post("/upload", formdata);
      let createContact = await axios.post(`/contacts`, {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        image: imageLink.data.link
      });
      dispatch({
        type: CREATE_DATA,
        payload: createContact.data
      });
      dispatch({
        type: IS_LOADING,
        paylaod: false
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_ERROR,
        payload: true
      });
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data
      });
      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: ""
        });
      }, 3000);
    } else {
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_ERROR,
        payload: true
      });
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Network Error/Server Error"
      });

      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: ""
        });
      }, 3000);
    }
  }
};

export const fetchAllContact = () => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });

  axios.defaults.headers.common["token"] = localStorage.token;
  axios
    .get("/contacts")
    .then(({ data }) => {
      dispatch({
        type: FETCH_CONTACTS,
        payload: data
      });
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_LOGIN,
        payload: false
      });
    })
    .catch(error => {
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      if (error.response) {
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    });
};

export const fetchOneContact = id => dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });

  axios.defaults.headers.common["token"] = localStorage.token;
  axios
    .get(`/contacts/${id}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_DETAILS_CONTACT,
        payload: data
      });
      dispatch({
        type: IS_UPDATE,
        payload: true
      });
      dispatch({
        type: IS_LOADING,
        payload: false
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    });
};

export const updateContactApi = (values, id) => async (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });
  axios.defaults.headers.common["token"] = localStorage.token;
  let newContacts = getState().reducer.contacts.filter(element => {
    return element._id !== id;
  });
  const { fullName, address, phoneNumber, image } = values;
  if (typeof image === "object") {
    try {
      let formdata = new FormData();
      formdata.append("image", image[0]);
      let imageLink = await axios.post("/upload", formdata);
      let { data } = await axios.patch(`/contacts/${id}`, {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        image: imageLink.data.link
      });
      dispatch({
        type: FETCH_CONTACTS,
        payload: [data, ...newContacts]
      });
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_UPDATE,
        payload: false
      });

      dispatch({
        type: FETCH_DETAILS_CONTACT,
        payload: {}
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    }
  } else if (typeof image === "string") {
    try {
      dispatch({
        type: FETCH_DETAILS_CONTACT,
        payload: {}
      });
      let { data } = await axios.patch(`/contacts/${id}`, {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber
      });
      dispatch({
        type: FETCH_CONTACTS,
        payload: [data, ...newContacts]
      });
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_UPDATE,
        payload: false
      });
      dispatch({
        type: FETCH_DETAILS_CONTACT,
        payload: {}
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    }
  }
};

export const deleteContactApi = id => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    paylaod: true
  });
  axios.defaults.headers.common["token"] = localStorage.token;
  axios
    .delete(`/contacts/${id}`)
    .then(({ data }) => {
      let newContacts = getState().reducer.contacts.filter(
        element => element._id !== data._id
      );
      dispatch({
        type: FETCH_CONTACTS,
        payload: newContacts
      });
      dispatch({
        type: IS_LOADING,
        paylaod: false
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: error.response.data
        });
        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      } else {
        dispatch({
          type: IS_LOADING,
          payload: false
        });
        dispatch({
          type: IS_ERROR,
          payload: true
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Network Error/Server Error"
        });

        setTimeout(() => {
          dispatch({
            type: IS_ERROR,
            payload: false
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: ""
          });
        }, 3000);
      }
    });
};

export const uploadCsvApi = values => async dispatch => {
  dispatch({
    type: IS_LOADING,
    payload: true
  });
  try {
    let formdata = new FormData();
    formdata.append("csv", values[0]);
    axios.defaults.headers.common["token"] = localStorage.token;
    let contactCsv = await axios.post("/upload/csv", formdata);
    dispatch({
      type: FETCH_CONTACTS,
      payload: contactCsv.data
    });
    dispatch({
      type: IS_LOADING,
      payload: false
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_ERROR,
        payload: true
      });
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data
      });
      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: ""
        });
      }, 3000);
    } else {
      dispatch({
        type: IS_LOADING,
        payload: false
      });
      dispatch({
        type: IS_ERROR,
        payload: true
      });
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Network Error/Server Error"
      });

      setTimeout(() => {
        dispatch({
          type: IS_ERROR,
          payload: false
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: ""
        });
      }, 3000);
    }
  }
};
