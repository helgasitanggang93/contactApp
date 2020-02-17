import {combineReducers} from 'redux';
import {FETCH_CONTACTS, 
  FETCH_DETAILS_CONTACT, 
  IS_LOGIN, 
  ERROR_MESSAGE, 
  IS_LOADING, IS_ERROR, IS_REGISTER, CREATE_DATA, IS_UPDATE} from '../actions'

const initialState = {
  contacts: [],
  detailContact : {},
  isLogin: false,
  errMessage: '',
  isLoading: false,
  isError: false,
  isRegister: false,
  isUpdate: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DATA: {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    }
    case FETCH_CONTACTS: {
        return {
          ...state,
          contacts: [...action.payload]
        }
      }
    case FETCH_DETAILS_CONTACT: {
      return {
        ...state,
        detailContact: action.payload
      }
    }
    case IS_LOGIN: {
      return {
        ...state,
        isLogin: action.payload
      }
    }
    case ERROR_MESSAGE: {
      return {
        ...state,
        errMessage: action.payload
      }
    }
    case IS_ERROR: {
      return {
        ...state,
        isError: action.payload
      }
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case IS_REGISTER: {
      return {
        ...state,
        isRegister: action.payload
      }
    }
    case IS_UPDATE: {
      return {
        ...state,
        isUpdate: action.payload
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  reducer: reducer
})