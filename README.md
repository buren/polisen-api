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

Get latest events

```javascript
const api = new PolisenAPI()

api.getEvents()
  .then((events) => {
    console.log(events.map(e => e.name))
  })
```

Get police stations

```javascript
api.getPoliceStations()
  .then((stations) => {
    console.log(stations.map(s => s.name))
  })
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
