'use strict'
import GlobalStoreService from '@/utils/auth'
/**
 * 通用工具类
 * @attr <Object> CommonUtil, used like `import CommonUtil from '@/utils/commonUtil'`
 * Create by longwang, 2018.07.05
 */
const CommonUtil = {
  /**
     * 筛选树的叶子节点
     * @attr <Array> isLeafs 叶子节点id列表
     * @attr <Function> filter 递归tree
     *      @param <Array> leafList 节点id列表
     *      @param <Array> treeData 树形结构
     *      @param <String> leafIdName 叶子id字段名称
     *      @param <String> treeIdName 树id字段名称
     *      @param <String> treeChildName 数child字段名称
     * @attr <Function> getLeafs 获取结果
     */
  dynamicTreeLeafsFilter: {
    isLeafs: [],
    filter: (leafList, treeData, leafIdName, treeIdName, treeChildName) => {
      if (!!leafList && leafList.length > 0 && !!treeData && treeData.length > 0) {
        treeData.map(treeVO => {
          if (!!treeVO[treeChildName] && treeVO[treeChildName].length > 0) {
            CommonUtil.dynamicTreeLeafsFilter.filter(leafList, treeVO[treeChildName], leafIdName, treeIdName, treeChildName)
          } else {
            leafList.map(leaf => {
              if (leaf[leafIdName] === treeVO[treeIdName]) {
                CommonUtil.dynamicTreeLeafsFilter.isLeafs.push(leaf[leafIdName])
              }
            })
          }
        })
      }
    },
    getLeafs: (leafList, treeData, leafIdName, treeIdName, treeChildName) => {
      CommonUtil.dynamicTreeLeafsFilter.isLeafs = []
      CommonUtil.dynamicTreeLeafsFilter.filter(leafList, treeData, leafIdName, treeIdName, treeChildName)
      return CommonUtil.dynamicTreeLeafsFilter.isLeafs
    }
  },
  IEVersion: () => {
    const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
      const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(userAgent)
      const fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return 7
      } else if (fIEVersion === 8) {
        return 8
      } else if (fIEVersion === 9) {
        return 9
      } else if (fIEVersion === 10) {
        return 10
      } else {
        return 6 // IE版本<=7
      }
    } else if (isEdge) {
      return 'edge' // edge
    } else if (isIE11) {
      return 11 // IE11
    } else {
      return -1 // 不是ie浏览器
    }
  },
  placeholderSupport: () => {
    return {
      ifSpt: ('placeholder' in document.createElement('input')),
      click: (e) => {
        const prefix = e.target
        const parentNode = prefix.parentNode.parentNode // span > .el-input__prefix > .el-input el-input--prefix
        const childNodes = parentNode.childNodes
        if (childNodes && childNodes.length > 0) {
          let i = 0
          let input
          let child
          for (; i < childNodes.length; i++) {
            child = childNodes[i]
            if (child.nodeName.toUpperCase() === 'INPUT') {
              input = child
              break
            }
          }
          if (input) {
            input.focus()
          }
        }
      }
    }
  },
  /**
     * 将tArray合到oriArray，返回超集
     * oriArray - 全数据列表
     * oriAttrName - 外键属性名
     * tArray - 自定义列表
     * tAttrName - 外键属性名
     */
  concatArrayByParams: (oriArray, oriAttrName, tArray, tAttrName) => {
    let fullArray = JSON.parse(JSON.stringify(oriArray))
    if (oriArray instanceof Array && oriArray.length > 0 &&
      typeof oriAttrName === 'string' && oriAttrName.length > 0 &&
      tArray instanceof Array && tArray.length > 0 &&
      typeof tAttrName === 'string' && tAttrName.length > 0) {
      const _list = JSON.parse(JSON.stringify(oriArray))
      let _tArray = []
      fullArray = _list.map(obj => {
        _tArray = tArray.filter(items => {
          return (obj[oriAttrName] + '') === (items[tAttrName] + '')
        })
        if (_tArray instanceof Array && _tArray.length > 0) {
          return Object.assign({}, obj, _tArray[0])
        } else {
          return obj
        }
      })
    }
    // console.log('[CommonUtil concatArrayByParams] oriArray ', oriArray)
    // console.log('[CommonUtil concatArrayByParams] tArray ', tArray)
    // console.log('[CommonUtil concatArrayByParams] oriArray + tArray = fullArray ', fullArray)
    return fullArray
  },
  getRqHeader: () => {
    const currentUser = GlobalStoreService.get('currentUser')
    const _obj = {
      // 'Content-Type': 'multipart/form-data', // no need to set, see `https://blog.csdn.net/sanjay_f/article/details/47407063`
      'bsType': navigator.userAgent,
      'bsVersion': navigator.appVersion,
      'jsToken': !!currentUser && !!currentUser.jsToken ? currentUser.jsToken : '',
      'jsCurAccNo': !!currentUser && !!currentUser.accountNo ? currentUser.accountNo : ''
    }
    return _obj
  },
  fwLogout: () => { // 主框架注销登录，跳转登录页
    const winParent = window.parent
    const _msg = {
      source: 'baseProject',
      command: 'JPC.cmd.logout'
    }
    const _origin = '*'
    winParent.postMessage(_msg, _origin)
  }
}
export default CommonUtil

/**
 * picker-options.disabledDate function for date picker
 * @param {*} time
 * @param {*} plusOrMinus
 * @param {*} targetTime
 */
export function commonDisabledDate(time, plusOrMinus, targetTime) {
  const _targetTime = targetTime
  if (typeof _targetTime === 'string' && _targetTime.length > 0) {
    if (plusOrMinus === 'plus') {
      return time.getTime() > new Date(_targetTime).getTime()
    } else if (plusOrMinus === 'minus') {
      return time.getTime() < new Date(_targetTime).getTime()
    } else {
      return false // 不禁用
    }
  } else {
    return false // 不禁用
  }
}
