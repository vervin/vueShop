const BASEURL = "https://www.easy-mock.com/mock/5b85fab5b6eb682fc7f9f006/vueShop/"
const LOCALURL = "http://localhost:3000/"

const URL= {
    index:  BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL+'user/register',
    loginUser: LOCALURL+'user/login',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
    getCategoryList:LOCALURL + 'goods/getCategoryList',
    getCategorySubList:LOCALURL + 'goods/getCategorySubList',
    getGoodsListByCategorySubID:LOCALURL + 'goods/getGoodsListByCategorySubID'
}

module.exports = URL
