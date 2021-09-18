
import store from '@/store'
/**
 * Dom节点级别的权限控制组件
 * Create by longwang, 2018.07.06
 *
 * 根据当前登录用户的权限，动态控制按钮展示
 * used by add attribute `v-permission="['MENU:SYSTEM:01','MENU:SYSTEM:02']"`
 */
export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    // console.log('[v-permission] ', value)
    const permissionCodeList = store.getters && store.getters.permissionCodeList ? store.getters.permissionCodeList : []
    if (permissionCodeList instanceof Array && permissionCodeList.length > 0) {
      if (value && value instanceof Array && value.length > 0) {
        const node_v_permission_list = value
        const tempCodeList = node_v_permission_list.filter(vp => {
          return permissionCodeList.includes(vp)
        })
        if (tempCodeList.length !== node_v_permission_list.length) {
          el.parentNode && el.parentNode.removeChild(el) // node配置的所有权限，用户权限列表不全有
        } else {
          // node配置的所有权限，用户权限列表都有
        }
      } else {
        // throw new Error(`v-permission is null,but should be like ['code__1', 'code__2', 'code__3']`)
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el) // 当前角色无任何权限
    }
  }
}
