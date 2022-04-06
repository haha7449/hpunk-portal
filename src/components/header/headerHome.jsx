import React from "react";
import "./headerHome.less";
import { Button, Menu, Image } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import User from "./user";
import routes from "../../routes/routes";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import store from "../../redux/store";
import logo from "../../assets/logo.svg";
import Login from "./login";
import Register from "./register";

const { SubMenu } = Menu;
// const routes = _.clone(NavRoutes);

const buttonStyle = {
  marginRight: "20px",
};

class headerHome extends React.Component {
  state = {
    visibleLogin: false, //默认不显示登录框
    visibleRegister: false, //默认不显示注册框
    currentNav: "home",
  };

  componentDidMount() {}

  handleLoginModalVisible = (visible) => {
    this.setState({ visibleLogin: visible });
  };
  handleRegisterModalVisible = (visible) => {
    this.setState({ visibleRegister: visible });
  };

  handleMenuClick = (e) => {
    console.log("click ", e);
    this.setState({ currentNav: e.key });
  };

  //渲染有子菜单的item
  renderSubMenu = ({ key, text, icon, subs }) => {
    return (
      <SubMenu key={key} icon={icon} title={text}>
        {subs &&
          subs.map((route) => {
            return route.subs && route.subs.length > 0
              ? this.renderSubMenu(route)
              : this.renderMenuItem(route);
          })}
      </SubMenu>
    );
  };

  //渲染菜单item
  renderMenuItem = ({ path, text, icon }, key) => {
    return (
      <Menu.Item key={key} icon={icon}>
        <Link to={path}>{text}</Link>
      </Menu.Item>
    );
  };

  renderBtn() {
    const state = store.getState();
    const { user } = state.getCurrentUserReducer;

    //判断是否已经登录
    if (user && user.id) {
      return (
        <div>
          <Link to="/shopCart">
            <Button
              type="primary"
              shape="round"
              icon={<ShoppingCartOutlined />}
              style={buttonStyle}
            >
              购物车
            </Button>
          </Link>
          <Link to="/orderCenter">
            <Button
              type="primary"
              shape="round"
              icon={<ShoppingCartOutlined />}
              style={buttonStyle}
            >
              订单中心
            </Button>
          </Link>
          <User />
        </div>
      );
    } else {
      return (
        <div>
          <Button
            type="default"
            shape="round"
            onClick={() => this.handleLoginModalVisible(true)}
            style={{ marginRight: 10 }}
          >
            马上登录
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => this.handleRegisterModalVisible(true)}
          >
            立即注册
          </Button>
        </div>
      );
    }
  }

  test = () => {
    console.log("this.props", this.props);
  };

  render() {
    const { currentNav } = this.state;

    return (
      <div className="header-home">
        <div className="header-home-container">
          <Image height={25} width={150} src={logo} preview={false} />
          <Menu
            defaultSelectedKeys={["1"]}
            onClick={this.handleMenuClick}
            selectedKeys={[currentNav]}
            mode="horizontal"
          >
            {/* {routes.map((route) => {
                return route.subs && route.subs.length > 0
                  ? this.renderSubMenu(route)
                  : this.renderMenuItem(route);
              })} */}
            {/* {navRoutes.map((route, key) => {
                return (
                  <Menu.Item key={key} icon={route.icon}>
                    <Link to={route.path}>{route.text}</Link>
                  </Menu.Item>
                );
              })} */}
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="food" icon={<BookOutlined />}>
              <Link to="/food">食补潮流</Link>
            </Menu.Item>
            <Menu.Item key="sport" icon={<BookOutlined />}>
              <Link to="/sport">运动食尚</Link>
            </Menu.Item>
            <Menu.Item key="makeup" icon={<BookOutlined />}>
              <Link to="/makeup">妆食同源</Link>
            </Menu.Item>
          </Menu>
          <div className="right-content">{this.renderBtn()}</div>
        </div>
        <Login
          onCancel={() => this.handleLoginModalVisible(false)}
          modalVisible={this.state.visibleLogin}
        />
        <Register
          onCancel={() => this.handleRegisterModalVisible(false)}
          modalVisible={this.state.visibleRegister}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

const HeaderHome = connect(mapStateToProps, mapDispatchToProps)(headerHome);
export default HeaderHome;
