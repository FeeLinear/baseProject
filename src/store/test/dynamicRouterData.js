/**
 * 用户动态权限 测试数据
 */
const dynamicRouterData = {
  'respCode': 'JPF0001',
  'respMsg': '成功',
  'respData': [{
    'funcNo': '1',
    'funcName': '系统管理',
    'funcRoute': '/sysManage',
    'funcComponent': 'layoutCP',
    'funcIcon': 'menu-sysManage',
    'redirect': 'noredirect',
    'funcType': 'MENU',
    'children': [{
      'funcNo': '11',
      'funcName': '账号管理',
      'funcRoute': 'accountManage/index',
      'funcComponent': 'accountManageCP',
      'funcIcon': 'menu-accountManage',
      'redirect': null,
      'funcType': 'MENU',
      'children': null
    }, {
      'funcNo': '12',
      'funcName': '角色管理',
      'funcRoute': 'roleManage/index',
      'funcComponent': 'roleManageCP',
      'funcIcon': 'menu-roleManage',
      'redirect': null,
      'funcType': 'MENU',
      'children': null
    }]
  },
  {
    'funcNo': '2',
    'funcName': '项目实施',
    'funcRoute': '/projImpl/index',
    'funcComponent': 'projImplCP',
    'funcIcon': 'star',
    'funcType': 'MENU',
    'redirect': null,
    'children': null
  }],
  'success': true
}
export default dynamicRouterData
