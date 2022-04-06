import { PRODUCT_DETAIL_BEGIN, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getProductDetail(params) {
  console.log("getProductDetail-params",params);
  const {productId} = params;
  return (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL_BEGIN,
    });

    request(`/api/productPortal/detail/${productId}`, {
      method: "GET",
    })
      .then(function (response) {
        console.log(response);
        const product = response.data.product;
        const skuStockList = response.data.skuStockList;
        const commentList = response.data.commentList;

        dispatch({
          type: PRODUCT_DETAIL_SUCCESS,
          data: { product,skuStockList,commentList },
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: PRODUCT_DETAIL_FAIL,
          data: { error },
        });
      });
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_BEGIN:
      return {
        ...state,
        productDetailPending: true,
        productDetailError: null,
      };

    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetailPending: false,
        productDetailError: null,
        product: action.data.product,
        skuStockList: action.data.skuStockList,
        commentList: action.data.commentList,
      };

    case PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        productDetailPending: false,
        productDetailError: action.data.error,
      };

    default:
      return state;
  }
}
