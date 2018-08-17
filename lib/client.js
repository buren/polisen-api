// API documentation
//
// Events
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/
//
// Police Stations
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisstationer/

const toDateNumberString = require('./to-date-number-string')
const fetch = require('cross-fetch')
const fetchJSON = (url) => fetch(url).then((response) => response.json())

const buildDateQuery = (date) => {
  let dateValue = [
    date.year,
    toDateNumberString(date.month, true),
    toDateNumberString(date.day, true)
  ].filter(e => e).join('-')

  if (date.hour) {
    dateValue = `${dateValue} ${date.hour}`
  }
  return encodeURI(dateValue)
}

const buildListQuery = (array) => array.map(encodeURI).join(';')

class PolisenAPI {
  constructor(opts) {
    const defaultOptions = { baseURL: 'https://polisen.se/api' }
    const options = Object.assign(defaultOptions, opts || {})
    this.baseURL = options.baseURL
  }

  // Documentation
  //  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/
  //
  // Filter on event date/time (example month/day/hour):
  //  /api/events?DateTime=2018-03
  //  /api/events?DateTime=2018-03-05
  //  /api/events?DateTime=2018-03-05%2021
  //
  // Filter on location (multiple places can be separated with semicolon):
  //  /api/events?locationname=Stockholm;Järfälla
  //
  // Filter on event type (multiple event types can be separated with semicolon):
  //  /api/events?type=Misshandel;R%C3%A5n
  fetchEvents(params) {
    return fetchJSON(this.getEventsURL(params))
  }

  // Documentation
  //  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisstationer/
  fetchPoliceStations() {
    return fetchJSON(this.getPoliceStationsURL())
  }

  getPoliceStationsURL() {
    return `${this.baseURL}/policestations`
  }

  getEventsURL(params) {
    params = params || {}

    let queryParts = []
    if (params.date)      queryParts.push('DateTime='     + buildDateQuery(params.date))
    if (params.locations) queryParts.push('locationname=' + buildListQuery(params.locations))
    if (params.types)     queryParts.push('type='         + buildListQuery(params.types))

    return `${this.baseURL}/events?${queryParts.join('&')}`
  }
}

module.exports = PolisenAPI
