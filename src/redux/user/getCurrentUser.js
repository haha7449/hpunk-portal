import { GET_CURRENT_USER } from "../constants";
import initialState from "../initialState";
import storageUtils from "../../utils/storageUtils";

//存储当前用户
export function getCurrentUser(params) {
  const user = storageUtils.getUser(); //从内存中取出
  console.log("user", user);
  console.log("saveCurrentUser");
  return {
    type: GET_CURRENT_USER,
    user: user,
  };
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      console.log("action.user",action.user);
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
