import { PRODUCT_SEARCH_BEGIN, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//模糊查询商品
export function getProductSimpleList(params) {
  console.log("getProductSimpleList-params",params);
  return (dispatch) => {
    dispatch({
      type: PRODUCT_SEARCH_BEGIN,
    });

    request('/api/productPortal/simpleList', {
      method: 'GET',
      params,
    })
      .then(function (response) {
        console.log(response);
        const searchProductList = response.data.list;
        const pageNum = response.data.pageNum;
        const pageSize = response.data.pageSize;
        const total = response.data.total;
        const searchListPagination = {pageSize,total,current:pageNum};

        dispatch({
          type: PRODUCT_SEARCH_SUCCESS,
          data: { searchProductList,searchListPagination },
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: PRODUCT_SEARCH_FAIL,
          data: { error },
        });
      });
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SEARCH_BEGIN:
      return {
        ...state,
        productSearchPending: true,
        productSearchError: null,
      };

    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        productSearchPending: false,
        productSearchError: null,
        searchProductList: action.data.searchProductList,
        searchListPagination: action.data.searchListPagination,
      };

    case PRODUCT_SEARCH_FAIL:
      return {
        ...state,
        productSearchPending: false,
        productSearchError: action.data.error,
      };

    default:
      return state;
  }
}
