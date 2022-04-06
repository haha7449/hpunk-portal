import {
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from "../constants";
import request from "umi-request";
import initialState from "../initialState";

//获取商品详情ById
export function addComment(params) {
  console.log("addComment-params", params);
  return async (dispatch) => {
    dispatch({
      type: ADD_COMMENT_BEGIN,
    });

    const resq = request("/api/commentPortal/add", {
      method: "POST",
      data: {
        ...params,
      },
    })
    const res = await resq.then(function (response) {
        console.log(response);
        const success = response.code === 200 ? true : false;
        console.log("addComment-success", success);
        if (success) {
          dispatch({
            type: ADD_COMMENT_SUCCESS,
          });
        }
        return success;
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: ADD_COMMENT_FAIL,
          data: { error },
        });
      });
    console.log("res",res);
    return res;    
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_BEGIN:
      return {
        ...state,
        addCommentPending: true,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentPending: false,
        addCommentError: null,
      };

    case ADD_COMMENT_FAIL:
      return {
        ...state,
        addCommentPending: false,
        addCommentError: action.data.error,
      };

    default:
      return state;
  }
}
