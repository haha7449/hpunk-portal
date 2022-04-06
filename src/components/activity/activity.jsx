import React, { Component } from "react";
import "./activity.less";
import { Button, Tabs, Divider, Space, Typography } from "antd";
import { BulbOutlined, DownOutlined } from "@ant-design/icons";
import IconFont from "../../assets/icon";

const { Text, Link, Title } = Typography;

export default class Activity extends Component {
  render() {
    return (
      <div className="acv">
        <div className="acv-img">
          <img />
        </div>
        <div className="acv-detail">
          <div className="acv-title">
            <Title level={5}>2021世界开发者打个比方阿萨大大十分宝贵大会</Title>
          </div>
          <div className="acv-others">
            <div className="acv-date">
              <Text>
                <IconFont type="icon-date" />
                01-25 周日
              </Text>
            </div>
            <div className="acv-location">
              <Text>
                <IconFont type="icon-location" />
                北京
              </Text>
              <Button type="primary" shape="round" className="acv-btn">
                活动详情
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
