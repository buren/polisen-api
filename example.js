const PolisenAPI = require('./lib/client')

const api = new PolisenAPI()

api.getEvents()
  .then((events) => {
    console.log(events.map(e => e.name))
  })

api.getPoliceStations()
  .then((stations) => {
    console.log(stations.map(s => s.name))
  })
