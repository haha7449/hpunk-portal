const initialState = {
  //登录
  user: {},
  loginPending: false,
  loginError: null,
  visibleLogin: false, //默认不显示登录框
  //注册
  registerPending: false,
  registerError: null,
  visibleRegister: false, //默认不显示注册框
  //更新用户信息
  userInfo:{},
  updateInfoPending: false,
  updateInfoError: null,
  //更新密码
  updatePwdPending: false,
  updatePwdError: null,
  //获取购物数据
  memberStatics:{},
  getStaticsPending: false,
  getStaticsError: null,

  /**
   * 商品
   */
   //获取商品详情
  product: {},
  brand:{},
  skuStockList:[],
  commentList:[],
  productDetailPending: false,
  productDetailError: null,
  //当前添加到购物车的item
  addToCartPending: false,
  addToCartError: null,
  //根据购物车信息生成订单
  generateOrderPending: false,
  generateOrderError: null,
  //更新购物车信息
  updateAttrPending: false,
  updateAttrError: null,
  //获取SKU通过pid
  skuList: [],
  getSkuByPidPending: false,
  getSkuByPidError: null,
  //模糊查询商品
  searchProductList: [],
  searchListPagination:{},//搜索结果页分页信息
  productSearchPending: false,
  productSearchError: null,

   /**
   * 订单
   */
  //删除购物车单元
  removeCartItemPending: false,
  removeCartItemError: null,

  /**
   * 订单
   */
  //获取订单通过uid
  orderist: [],
  orderPagination:{},
  orderStatus:[],
  getOrderByUidPending: false,
  getOrderByUidError: null,
  //获取订单单元通过oid
  orderItemList:[],
  getOrderItemByOidPending: false,
  getOrderItemByOidError: null,
  //添加评价
  addCommentPending: false,
  addCommentError: null,
  //获取评价通过orderItemId
  comment:[],
  getCommentPending: false,
  getCommentError: null,
  //确认收货
  confirmOrderPending: false,
  confirmOrderError: null,
  //获取首页订单数据
  orderCount:{},
  getOrderCountPending: false,
  getOrderCountError: null,
};

export default initialState;
