import ztRequest from './index.js'

export const getHomeMutidata = () => ztRequest.get('/home/multidata')

export const getHomeGoodsData = (type, page) =>
  ztRequest.get('/home/data', {
    type,
    page
  })
