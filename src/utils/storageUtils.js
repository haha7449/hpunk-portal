/**
 * local数据存储管理
 */
import store from 'store';
const USER_KEY = "user_key";
export default {
  /**
   * 保存User
   */
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY,user);
  },
  /**
   * 读取User
   */
  getUser() {
    return store.get(USER_KEY) || {};
  },
  /**
   * 删除User
   */
  removeUser() {
    store.remove(USER_KEY);
  },
};
