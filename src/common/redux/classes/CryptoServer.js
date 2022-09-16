const CryptoJS = require("crypto-js")
// const ROOT = "http://localhost:5001/windsor-trade/us-central1/app"
const ROOT = "https://us-central1-windsor-trade.cloudfunctions.net/app"
const DYC =
  'L)w@~Z!0@q#₽$tbG,₼₣|pA+₾#₹₠7$x(C5.y+₩€₵n4F1}₮₱₲&u=8MD₳◊₴"o6S₦₸₺₻*5₡₢K^ev%3J-₭₤₥rV{H9<tb'
const ENC =
  '◊₴"4F1}L)tbG,₼₣5₡₢K^ev%35.₮₱₲&u=8MD₳|pA+₾#y+₩€₵n₠7$x(Cw@~Z!0@q#₹o6S₦₸₺₻J-₭₤₥rV{H9<tb₽$*'

// console.log({ password: CryptoJS.AES.encrypt('super@windsortrad', 'WCSA000001').toString() })

/**
 * @param {string} text
 * @returns {string}
 */
export const encrypt = (text) => {
  try {
    return text ? CryptoJS.AES.encrypt(text, ENC).toString() : null
  } catch (ex) {
    return null
  }
}

/**
 * @param {string} text
 * @returns {string}
 */
export const decrypt = (cipher) => {
  try {
    return cipher
      ? CryptoJS.AES.decrypt(cipher, DYC).toString(CryptoJS.enc.Utf8)
      : null
  } catch (ex) {
    return null
  }
}

/**
 * @param {string} path
 * Every path must be started with a '/'.
 * @param {any} data
 * It takes an object as data which is to be posted on that path.
 * @returns {Promise<any>}
 * It returns expected object or null.
 */
export const api = async (path, data = null) => {
  const url = `${ROOT}${path}`
  // console.log(url)
  if (data) {
    //POST
    // console.log('post')
    // console.log(data)
    try {
      const response = await fetch(url, {
        method: "POST",
        body: encrypt(JSON.stringify(data)),
      })
      // console.log(response)
      const body = await response.json()
      // console.log(body)
      const dataCipher = body.data
      if (dataCipher) {
        // console.log(decrypt(dataCipher))
        return JSON.parse(decrypt(dataCipher))
      } else {
        // console.log('not-got dataCipher')
        return null
      }
    } catch (ex) {
      // console.log(ex)
      return null
    }
  } else {
    //GET
    try {
      const response = await fetch(url)
      const body = await response.json()
      const data = body.data
      if (data) {
        return JSON.parse(decrypt(data))
      } else {
        return null
      }
    } catch (ex) {
      return null
    }
  }
}
