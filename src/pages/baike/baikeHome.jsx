import React, { Component } from "react";
import "./baikeHome.less";
import {
  Button,
  Divider,
  Space,
  Typography,
} from "antd";
import X from "./x";

const { Title } = Typography;

export default class BaikeHome extends Component {
  render() {
    return (
      <div className="baike-home">
        <div className="baike-home-nav">
          <Title level={4} style={{margin:"0 20px 0 15px"}}>养生百科</Title>
          <Space split={<Divider type="vertical" style={{backgroundColor:"#00000050"}}/>}>
            <Button type="text">食补潮流</Button>
            <Button type="text">运动食尚</Button>
            <Button type="text">妆食同源</Button>
          </Space>
        </div>
        <div className="baike-container">
          <X />
        </div>
      </div>
    );
  }
}
