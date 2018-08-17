// API documentation
// https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/

const fetch = require('cross-fetch')

class PolisenAPI {
  constructor(opts) {
    const defaultOptions = { baseURL: 'https://polisen.se/api' }
    const options = Object.assign(defaultOptions, opts || {})
    this.baseURL = options.baseURL
  }

  getEvents() {
    return fetch(`${this.baseURL}/events`)
      .then((response) => response.json())
  }
}

module.exports = PolisenAPI
