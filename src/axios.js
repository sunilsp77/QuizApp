import axios from 'axios';

// instance of axios library to send requests to server, with base url set
const instance = axios.create({
  baseURL: 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
});

export default instance;
