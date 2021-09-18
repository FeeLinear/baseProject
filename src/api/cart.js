import server from '@/utils/server'
import jsonServer from '@/utils/jsonServer'
//import server from '@/api/mock'
//import jsonServer from '@/api/mock'

export function getGoodsList(params) {
  return server({
    url: '/commodity/queryCommodityInfos',
    method: 'post',
    params
  })
}
export function getNavList(params) {
  return server({
    url: '/classify/tree',
    method: 'post',
    params
  })
}
export function getGoodsDetails(params) {
  return server({
    url: '/commodity/queryCommodityInfo',
    method: 'post',
    params
  })
}
export function queryTryDetail(params) {
  return server({
    url: '/commodity/queryTrial',
    method: 'post',
    params
  })
}
export function applyToServer(params) {
  return server({
    url: '/commodity/submitTrial',
    method: 'post',
    params
  })
}
export function addGoodsToCart(params) {
  return server({
    url: '/shopCart/save',
    method: 'post',
    params
  })
}
export function getCartData(params) {
  return server({
    url: '/shopCart/queryMyShopCart',
    method: 'post',
    params
  })
}
export function submitToCart(params) {
  return jsonServer({
    url: '/shopCart/submit',
    method: 'post',
    params
  })
}
export function deleteGoods(params) {
  return server({
    url: '/shopCart/delete',
    method: 'post',
    params
  })
}
export function createOrderOnline(params) {
  return jsonServer({
    url: '/commodityOrder/createOrder',
    method: 'post',
    params
  })
}
export function queryContractData(params) {
  return server({
    url: '/commodityOrder/queryOrderContractInfo',
    method: 'post',
    params
  })
}
export function getPayDetails(params) {
  return server({
    url: '/commodityOrder/queryCheckoutCounterInfo',
    method: 'post',
    params
  })
}
export function signContract(params) {
  return server({
    url: '/commodityOrder/signContract',
    method: 'post',
    params
  })
}
export function previewContract(params) {
  return server({
    url: '/commodityOrder/previewContract',
    method: 'post',
    params
  })
}
export function queryIsSign(params) {
  return jsonServer({
    url: '/commodityOrder/isSign',
    method: 'post',
    params
  })
}
export function viewContract(params) {
  return server({
    url: '/commodityOrder/viewContract',
    method: 'post',
    params
  })
}
export function queryPayment(params) {
  return server({
    url: '/commodity/queryCommodityScalePrice',
    method: 'post',
    params
  })
}
export function queryPayTypeData(params) {
  return server({
    url: '/commodityOrder/getPay',
    method: 'post',
    params
  })
}
export function queryPayStatus(params) {
  return server({
    url: '/commodityOrder/queryPayStatus',
    method: 'post',
    params
  })
}
export function setOrderPayed(params) {
  return server({
    url: '/commodityOrder/setOrderPayed',
    method: 'post',
    params
  })
}

