// 基于 sessionStorage 实现全局缓存

const prefix = 'baseProject-'

export default {
  get: (key) => {
    // console.log('[auth] get key ', prefix + key)
    return JSON.parse(sessionStorage.getItem(prefix + key))
  },
  set: (key, value) => {
    console.log('[auth] set key ', prefix + key)
    sessionStorage.setItem(prefix + key, JSON.stringify(value))
  },
  remove: (key) => {
    // console.log('[auth] remove key ', prefix + key)
    sessionStorage.removeItem(prefix + key)
  }
}
