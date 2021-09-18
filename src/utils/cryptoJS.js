import CryptoJS from 'crypto-js'

const tripleDES = (inputStr) => {
  if (typeof inputStr === 'undefined' || inputStr === '') {
    return ''
  }
  const srcs = inputStr
  const key = CryptoJS.enc.Utf8.parse('9012PinganVitality075522')
  const iv = CryptoJS.enc.Utf8.parse('01234567')
  const encrypted = CryptoJS.TripleDES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, /* default mode CBC, ECB mode can not use with [iv] */
    padding: CryptoJS.pad.Pkcs7
  })
  // console.log('CryptoJS.TripleDES', inputStr, encrypted.toString())
  return encrypted.toString()
}

export default tripleDES
