import auth from '@/utils/auth'
import tripleDES from '@/utils/cryptoJS'

const user = {
  state: {
    currentUser: {
      accountNo: '',
      jsToken: ''
    }
  },

  mutations: {
    SET_CURRENT_USER: (state, currentUser) => {
      state.currentUser = currentUser
      auth.set('currentUser', currentUser)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit, state }, userInfo) {
      const params = Object.assign({}, userInfo, {
        accountNo: userInfo.accountNo.trim(),
        password: tripleDES(userInfo.password)
      })
      return new Promise((resolve, reject) => {
        const currentUser = state.currentUser
        const respData = {
          ...currentUser,
          accountNo: params.accountNo
        }
        commit('SET_CURRENT_USER', respData)
        resolve(respData)
      })
    },

    LoadUserInfo({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_USER', userInfo) // 缓存用户信息
        resolve()
      })
    },

    // 退出登录
    LogOut({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_USER', {}) // 缓存用户信息
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_CURRENT_USER', {}) // 缓存用户信息
        resolve()
      })
    }
  }
}

export default user
