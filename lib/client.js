// API documentation
//
// Events
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/
//
// Police Stations
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisstationer/

const fetch = require('cross-fetch')

class PolisenAPI {
  constructor(opts) {
    const defaultOptions = { baseURL: 'https://polisen.se/api' }
    const options = Object.assign(defaultOptions, opts || {})
    this.baseURL = options.baseURL
  }

  // Documentation
  //  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/
  getEvents() {
    return fetch(`${this.baseURL}/events`)
      .then((response) => response.json())
  }

  // Documentation
  //  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisstationer/
  getPoliceStations() {
    return fetch(`${this.baseURL}/policestations`)
      .then((response) => response.json())
  }
}

module.exports = PolisenAPI
