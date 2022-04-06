import React from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin, message } from "antd";
import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import styles from "./user.less";
import "antd/dist/antd.less";
import storageUtils from "../../utils/storageUtils";
import store from "../../redux/store";

export default class User extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === "logout") {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: "login/logout",
        });
      }

      return;
    }

    // history.push(`/account/${key}`);
  };

  handleLogOut() {
    storageUtils.removeUser();
    message.success("退出登录");
    window.location.reload();
  }

  render() {
    const state = store.getState();
    const { user } = state.getCurrentUserReducer;
    const currentUser = user;

    const menuHeaderDropdown = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        <Menu.Item key="userCenter">
          <Link to="/userCenter">
            <UserOutlined />
            个人中心
          </Link>
        </Menu.Item>
        <Menu.Item key="shopCart">
          <Link to="/shopCart">
            <SettingOutlined />
            购物车
          </Link>
        </Menu.Item>
        <Menu.Item key="orderCenter">
          <Link to="/orderCenter">
            <SettingOutlined />
            订单中心
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.handleLogOut}>
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.nickname ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="middle"
            className={styles.avatar}
            src={currentUser.icon}
            alt="avatar"
            style={{ marginRight: 10 }}
          />
          <span className={`${styles.name} anticon`}>
            {currentUser.nickname}
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}
