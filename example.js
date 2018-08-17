const PolisenAPI = require('./lib/client')

new PolisenAPI()
  .getEvents()
  .then((events) => {
    console.log(events.map(e => e.name))
  })
