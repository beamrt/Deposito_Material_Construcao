import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// BaseURL do axios definida
export default axios.create({
  baseURL,
});
