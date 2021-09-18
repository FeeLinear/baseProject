import { /* asyncRouterMap, */ constantRouterMap } from '@/router'
import auth from '@/utils/auth'
// import test_data_dynamicRouterData from '@/store/test/dynamicRouterData' // 动态菜单测试数据

/**
 * transfer api data to vue-router constructor
 * @param {*} params api data
 */

const permission = {
  state: {
    routers: constantRouterMap, // 静态路由
    addRouters: [], // 动态添加的路由
    permissionCodeList: [] // 当前用户权限集合
  },
  mutations: {
    SET_PERMISSION_CODE_LIST: (state, permissionCodeList) => {
      state.permissionCodeList = permissionCodeList
      auth.set('permissionCodeList', permissionCodeList)
    },
    RESET_PERMISSION: (state) => {
      state.routers = constantRouterMap
      state.addRouters = []
      state.permissionCodeList = []
      auth.remove('permissionCodeList')
    }
  },
  actions: {
    InitPermissionCodeList({ commit }, pList) {
      // console.log('[初始化用户权限列表 InitPermissionCodeList] pList |', pList)
      return new Promise((resolve, reject) => {
        commit('SET_PERMISSION_CODE_LIST', pList)
        resolve()
      })
    },
    ResetPermission({ commit }) {
      return new Promise(resolve => {
        commit('RESET_PERMISSION')
        resolve()
      })
    }
  }
}

export default permission
