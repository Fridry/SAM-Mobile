const axios = require('axios');

const api = axios.create({
  baseURL: 'http:10.0.3.2:3000',
});

module.exports = api;
