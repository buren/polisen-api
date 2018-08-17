// API documentation
//
// Events
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/
//
// Police Stations
//  https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisstationer/

const fetch = require('cross-fetch')

// examples
//   toDateNumber(8) // => "08"
//   toDateNumber('8') // => "08"
//   toDateNumber('10') // => "10"
//   toDateNumber('-10') // => "10"
//   toDateNumber('asd') // => throws Error
// allow blank (empty string, null and undefined will return undefined)
//  toDateNumber('', true) // => undefined
// don't allow blank (the default)
// toDateNumber('', false) => throws Error
const toDateNumber = (numberLike, allowBlank) => {
  if (allowBlank && !numberLike) return

  const number = parseInt(numberLike)
  if (isNaN(number) || number <= 0) {
    throw new Error(`invalid date number ${numberLike}`)
  }

  if (number < 10) return `0${number}`
  return `${number}`
}

const fetchJSON = (url) => fetch(url).then((response) => response.json())

const buildDateQuery = (date) => {
  let dateValue = [
    date.year,
    toDateNumber(date.month, true),
    toDateNumber(date.day, true)
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
