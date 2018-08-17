const PolisenAPI = require('./lib/client')
const eventTypes = require('./lib/event_types_data')

const api = new PolisenAPI()

const printNames = (data) => console.log(data.map(d => d.name))

api.fetchEvents({
  date: { year: 2018 },
  locations: ['Järfälla'],
  types: ['Djur skadat/omhändertaget'],
}).then(printNames)

api.fetchEvents({ date: { year: 2018 } }).then(printNames)
api.fetchEvents({ date: { year: 2018, month: 8 } }).then(printNames)
api.fetchEvents({ date: { year: 2018, month: 8, day: 16 } }).then(printNames)
api.fetchEvents({ date: { year: 2018, month: 8, day: 16, hour: 8 } }).then(printNames)
api.fetchEvents().then(printNames)
api.fetchPoliceStations().then(printNames)

console.log(`eventTypes (${eventTypes.length})`, eventTypes)
