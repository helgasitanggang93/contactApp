import axios from 'axios';

export default axios.create({
  baseURL: 'https://fierce-retreat-35743.herokuapp.com/api'
})