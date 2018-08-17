# PolisenAPI

Simple JavaScript API client for [Polisen API](https://polisen.se/om-polisen/om-webbplatsen/oppna-data/api-over-polisens-handelser/).

## Getting started

Requires `node` >= 8.9.0

```
npm install --save polisen-api
```

# Usage

Initialize

```javascript
const PolisenAPI = require('polisen-api')
```

Get police stations

```javascript
api.fetchPoliceStations()
  .then((stations) => {
    console.log(stations.map(s => s.name))
  })
```

Get latest events

```javascript
const api = new PolisenAPI()

api.fetchEvents()
  .then((events) => {
    console.log(events.map(e => e.name))
  })
```

Filter events on location
```javascript
api.fetchEvents({ locations: ['Stockholm', 'Järfälla'] })
```

Filter events on type

```javascript
api.fetchEvents({ types: ['Djur skadat/omhändertaget', 'Trafikbrott'] })
```

Filter on year/month/day/hour
```javascript
api.fetchEvents({ date: { year: 2018 } })
api.fetchEvents({ date: { year: 2018, month: 8 } })
api.fetchEvents({ date: { year: 2018, month: 8, day: 16 } })
api.fetchEvents({ date: { year: 2018, month: 8, day: 16, hour: 8 } })
```

Multiple filters
```javascript
api.fetchEvents({
  date: { year: 2018 },
  locations: ['Järfälla'],
  types: ['Djur skadat/omhändertaget'],
})
```

Throws errors for invalid arguments

```javascript
api.fetchEvents({ date: { year: 2018, month: '-1' } })
//
```

If you only want to get build the URL
```javascript
api.getEventsURL({ locations: ['Stockholm'], date: { year: 2018, month: '3' } })
// supports the same params as fetchEvents

api.getPoliceStationsURL()
```

You can require all available event types
```javascript
const policeEventTypes = require('polisen-api/event_types_data')
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/buren/polisen-api.

## Development

Setup
```
$ git clone https://github.com/buren/polisen-api
$ cd polisen-api
$ npm install
```

Run the example
```
$ node example.js
```

## License

The library is available as open source under the terms of the [MIT License](LICENSE).
