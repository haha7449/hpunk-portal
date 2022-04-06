import React, { Component } from "react";
import "./shopHome.less";
import { Button, Divider, Space, Typography } from "antd";
import Food from "./food";
import Sport from "./sport";
import Makeup from "./makeup";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const { Title } = Typography;

export default function ShopHome() {
  let { path, url } = useRouteMatch();
  console.log("path",path);
  console.log("url",url);
  return (
    <div className="shop-home">
      <div className="shop-home-nav">
        <Title level={4} style={{ margin: "0 20px 0 15px" }}>
          购物
        </Title>
        <Space
          split={
            <Divider type="vertical" style={{ backgroundColor: "#00000050" }} />
          }
        >
          <Link to={`${url}/food`}>
            <Button type="text">食补潮流</Button>
          </Link>
          <Link to={`${url}/sport`}>
            <Button type="text">运动食尚</Button>
          </Link>
          <Link to={`${url}/makeup`}>
            <Button type="text">妆食同源</Button>
          </Link>
        </Space>
      </div>
      <div className="shop-container">
        <Switch>
          <Route exact path={path}>
            {/* <Redirect path={`${path}/food`} /> */}
            <Food />
          </Route>
          <Route path={`${path}/food`}>
            <Food />
          </Route>
          <Route path={`${path}/sport`}>
            <Sport />
          </Route>
          <Route path={`${path}/makeup`}>
            <Makeup />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
