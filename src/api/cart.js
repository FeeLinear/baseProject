import server from '@/utils/request'

export function getGoodsList(params) {
  return server({
    url: '/commodity/queryCommodityInfos',
    method: 'post',
    params
  })
}
