import { GET_STATICS_BEGIN, GET_STATICS_SUCCESS, GET_STATICS_FAIL } from "../constants";
import request from "umi-request";
import initialState from "../initialState";

export function getStatics(params) {
  console.log("getStatics-params",params);
  const {id} = params;
  return (dispatch) => {
    dispatch({
      type: GET_STATICS_BEGIN,
    });

    request(`/api/ums_member/memberStatics/${id}`, {
      method: "GET",
    })
      .then(function (response) {
        console.log(response);
        const memberStatics = response.data;

        dispatch({
          type: GET_STATICS_SUCCESS,
          data: { memberStatics },
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_STATICS_FAIL,
          data: { error },
        });
      });
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATICS_BEGIN:
      return {
        ...state,
        getStaticsPending: true,
        getStaticsError: null,
      };

    case GET_STATICS_SUCCESS:
      return {
        ...state,
        getStaticsPending: false,
        getStaticsError: null,
        memberStatics: action.data.memberStatics,
      };

    case GET_STATICS_FAIL:
      return {
        ...state,
        getStaticsPending: false,
        getStaticsError: action.data.error,
      };

    default:
      return state;
  }
}
