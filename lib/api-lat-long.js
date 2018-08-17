// { gps: '63.176683,14.636068' }
// => { latitude 63.176683, longitude: 14.636068, gps: '63.176683,14.636068' }
const apiLatLong = (data) => {
  const latLong = data.gps.split(',')
  return {
    ...data,
    latitude: parseFloat(latLong[0]),
    longitude: parseFloat(latLong[1]),
  }
}

module.exports = apiLatLong
