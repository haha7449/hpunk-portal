import { GET_COMMENT_BEGIN, GET_COMMENT_SUCCESS, GET_COMMENT_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function getComment(params) {
  console.log("getComment-params",params);
  const {orderItemId} = params;
  return (dispatch) => {
    dispatch({
      type: GET_COMMENT_BEGIN,
    });

    request(`/api/commentPortal/getComment/${orderItemId}`, {
      method: "GET",
    })
      .then(function (response) {
        console.log(response);
        const comment = response.data;

        dispatch({
          type: GET_COMMENT_SUCCESS,
          data: { comment },
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_COMMENT_FAIL,
          data: { error },
        });
      });
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT_BEGIN:
      return {
        ...state,
        getCommentPending: true,
        getCommentError: null,
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        getCommentPending: false,
        getCommentError: null,
        comment: action.data.comment,
      };

    case GET_COMMENT_FAIL:
      return {
        ...state,
        getCommentPending: false,
        getCommentError: action.data.error,
      };

    default:
      return state;
  }
}
