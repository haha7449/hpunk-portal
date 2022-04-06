import { combineReducers } from "redux";
import { reducer as loginReducer } from "./user/login";
import { reducer as registerReducer } from "./user/register";
import { reducer as getCurrentUserReducer } from "./user/getCurrentUser";
import { reducer as updateInfoReducer } from "./user/updateInfo";
import { reducer as updatePwdReducer } from "./user/updatePwd";
import { reducer as getStaticsReducer } from "./user/getStatics";
import { reducer as getProductDetailReducer } from "./product/getProductDetail";
import { reducer as addToCartReducer } from "./product/addToCart";
import { reducer as generateOrderReducer } from "./product/generateOrder";
import { reducer as updateAttrReducer } from "./product/updateAttr";
import { reducer as getSkuByPidReducer } from "./product/getSkuByPid";
import { reducer as getCommentReducer } from "./product/getComment";
import { reducer as addCommentReducer } from "./product/addComment";
import { reducer as getProductSimpleListReducer } from "./product/getProductSimpleList";
import { reducer as removeCartItemReducer } from "./shop/removeCartItem";
import { reducer as getOrderByUidReducer } from "./order/getOrderByUid";
import { reducer as getOrderItemByOidReducer } from "./order/getOrderItemByOid";
import { reducer as confirmOrderReducer } from "./order/confirmOrder";
import { reducer as getOrderCountReducer } from "./order/getOrderCount";

const reducer = combineReducers({
  loginReducer,
  registerReducer,
  getCurrentUserReducer,
  updateInfoReducer,
  updatePwdReducer,
  getStaticsReducer,
  getProductDetailReducer,
  addToCartReducer,
  generateOrderReducer,
  updateAttrReducer,
  getSkuByPidReducer,
  getCommentReducer,
  addCommentReducer,
  removeCartItemReducer,
  getProductSimpleListReducer,
  getOrderByUidReducer,
  getOrderItemByOidReducer,
  confirmOrderReducer,
  getOrderCountReducer,
});

export default reducer;
