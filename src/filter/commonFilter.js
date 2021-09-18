import Vue from 'vue'
import { ORDER_STATUS, ACTUAL_STATUS } from "@/utils/Enum";

/**
 * 支付方式(1:全款 , 2:分期后付费 , 3:分期先付费)
 */
const paymentTypeObj = {
  '1': '全款',
  '2': '分期后付费',
  '3': '分期先付费'
}
Vue.filter('paymentTypeFilter', (val) => {
  return paymentTypeObj[val + '']
})

/**
 * 商品规格
 * @demo 1年/项目，3年/项目，5年/项目
 * @properties
 *    scaleNum 规格数量
 *    timeUnit 时间单位(1:年, 2:月, 3:日)
 *    scaleUnit 规模单位(1:项目, 2:车道)
 */
const timeUnitObj = {
  '1': '年',
  '2': '月',
  '3': '日'
}
const scaleUnitObj = {
  '1': '项目',
  '2': '车道'
}
Vue.filter('scalePriceListFilter', val => {
  let rs = [];
  if (Array.isArray(val)) {
    rs = val.map(item => {
      return item.scaleNum + timeUnitObj[item.timeUnit + ''] + '/' + scaleUnitObj[item.scaleUnit + '']
    })
  }
  return rs.join(',')
})
Vue.filter('timeUnitFilter', val => {
  return timeUnitObj[val + '']
})
Vue.filter('scaleUnitFilter', val => {
  return scaleUnitObj[val + '']
})

/**
 * 营业执照类型:1 普通营业执照 ，2 多证合一营业执照
 */
const licenseTypeObj = {
  '1': '普通营业执照',
  '2': '多证合一营业执照'
}
Vue.filter('licenseTypeFilter', val => {
  return licenseTypeObj[val + '']
})

/**
 * 订单来源
 */
const orderSourceObj = {
  '1': '线下',
  '2': '线上'
}
Vue.filter('orderSourceFilter', val => {
  return orderSourceObj[val + '']
})

/**
 * 订单类型
 */
const orderTypeObj = {
  '1': '试用',
  '2': '延期',
  '3': '新购'
}
Vue.filter('orderTypeFilter', val => {
  return orderTypeObj[val + '']
})

/**
 * 订单状态
 */
const orderStatusObj = ORDER_STATUS || {}
Vue.filter('orderStatusFilter', val => {
  return orderStatusObj[val + '']
})

/**
 * 认证状态
 */
const auditStatusObj = {
  '0': '全部',
  '1': '未审核',
  '2': '审核通过',
  '3': '待审核',
  '4': '驳回'
}
Vue.filter('auditStatusFilter', val => {
  return auditStatusObj[val + '']
})

/**
 * 发布状态
 */
const pubStatusObj = {
  '1': '未上架',
  '2': '已上架'
}
Vue.filter('pubStatusFilter', val => {
  return pubStatusObj[val + '']
})

/**
 * 销售状态
 */
const saleStatusObj = {
  '1': '停售',
  '2': '在售'
}
Vue.filter('saleStatusFilter', val => {
  return saleStatusObj[val + '']
})

/**
 * 合同状态（0:待签署,1:签署中,2:已生效,3:已作废,4:已拒签）
 */
const contractStatusObj = {
  '0': '待签署',
  '1': '签署中',
  '2': '已生效',
  '3': '已作废',
  '4': '已拒签'
}
Vue.filter('contractStatusFilter', val => {
  return contractStatusObj[val + '']
})

/**
 * 实施状态
 */
Vue.filter('actualStatusFilter', val => {
  return ACTUAL_STATUS[val + '']
})
