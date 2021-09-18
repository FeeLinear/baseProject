const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  currentUser: state => state.user.currentUser,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissionCodeList: state => state.permission.permissionCodeList,
}
export default getters
