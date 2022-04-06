import React from "react";
import "./main.less";
import HeaderHome from "../components/header/headerHome";
import { BackTop } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "../routes/routes";
import NavRoutes from "../routes/navRoutes";
import ShopRoutes from "../routes/shopRoutes";
import SearchRoutes from "../routes/searchRoutes";
import _ from "loadsh";
import "antd/dist/antd.less";

import Home from "./home/home";
import ShopHome from "./shop/shopHome";
import Commodity from "./shop/commodity";
import Food from "./shop/food";
import Makeup from "./shop/makeup";
import Sport from "./shop/sport";
import BaikeHome from "./baike/baikeHome";
import SearchResult from "./search/searchResult";
import ShopCart from "./shop/shopCart";
import OrderCenter from "./order/orderCenter";
import UserCenter from "./user/userCenter";

const navRoutes = _.clone(NavRoutes);
const shopRoutes = _.clone(ShopRoutes);

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  //渲染路由
  renderRoute = ({ exact, key, path, component, subs }) => {
    return [
      <Route exact={exact} key={key} path={path} component={component} />,
      // subs &&
      //   subs.map((route) => {
      //     return this.renderRoute(route);
      //   }),
    ];
  };

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <BackTop />
          <HeaderHome />
          <div className="main-container">
            <Switch>
              <Route key="home" exact path="/" component={Home} />
              <Route key="food" path="/food" component={Food} />
              <Route key="makeup" path="/makeup" component={Makeup} />
              <Route key="sport" path="/sport" component={Sport} />
              {/* <Route key="shop" path="/shop">
                <ShopHome />
              </Route>
              <Route key="baike" path="/baike">
                <BaikeHome />
              </Route> */}
              <Route
                key="search"
                path="/search/:keyword"
                component={SearchResult}
              />
              <Route key="shopCart" path="/shopCart" component={ShopCart} />
              <Route
                key="shopDetail"
                path="/shopDetail/:id"
                component={Commodity}
              />
              <Route
                key="orderCenter"
                path="/orderCenter"
                component={OrderCenter}
              />
              <Route
                key="userCenter"
                path="/userCenter"
                component={UserCenter}
              />
              {/* {routes.map((route, key) => (
                <RouteWithSubRoutes key={key} {...route} />
              ))}
              {shopRoutes.map((route) => {
                return this.renderRoute(route);
              })}
              {SearchRoutes.map((route) => {
                return this.renderRoute(route);
              })} */}
            </Switch>
          </div>
          <div className="footer"></div>
        </div>
      </BrowserRouter>
    );
  }
}

function RouteWithSubRoutes(route) {
  const { path, component, exact = true, routes = [] } = route;
  return (
    <Route
      exact={routes.length !== 0 && exact}
      path={path}
      component={component}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
