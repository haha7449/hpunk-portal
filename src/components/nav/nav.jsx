import React from "react";
import { Menu, Typography } from "antd";
import "./nav.less";
import NavRoutes from "../../routes/navRoutes";
import { Link } from "react-router-dom";
import _ from "loadsh";

const { SubMenu } = Menu;
const routes = _.clone(NavRoutes);

export default class Nav extends React.Component {
  state = {
    current: "home",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  //渲染有子菜单的item
  renderSubMenu = ({ key, path, text, icon, subs }) => {
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
  renderMenuItem = ({ key, path, text, icon }) => {
    return (
      <Menu.Item key={key} icon={icon}>
        <Link to={path}>{text}</Link>
      </Menu.Item>
    );
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        defaultSelectedKeys={["1"]}
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {routes.map((route) => {
          return route.subs && route.subs.length > 0
            ? this.renderSubMenu(route)
            : this.renderMenuItem(route);
        })}
      </Menu>
    );
  }
}
