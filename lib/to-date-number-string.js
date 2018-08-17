// examples
//   toDateNumberString(8) // => "08"
//   toDateNumberString('8') // => "08"
//   toDateNumberString('10') // => "10"
//   toDateNumberString('-10') // => "10"
//   toDateNumberString('asd') // => throws Error
// allow blank (empty string, null and undefined will return undefined)
//  toDateNumberString('', true) // => undefined
// don't allow blank (the default)
// toDateNumberString('', false) => throws Error
const toDateNumberString = (numberLike, allowBlank) => {
  if (allowBlank && !numberLike) return

  const number = parseInt(numberLike)
  if (isNaN(number) || number <= 0) {
    throw new Error(`invalid date number ${numberLike}`)
  }

  if (number < 10) return `0${number}`
  return `${number}`
}

module.exports = toDateNumberString
