import React, { Component } from "react";
import "./activityHome.less";
import { Button, Tabs, Divider, Space, Typography } from "antd";
import { BulbOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { Calendar } from "antd";
import Activity from "../../components/activity/activity";

const { Title } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        南京
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        成都
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        重庆
      </a>
    </Menu.Item>
  </Menu>
);

function onPanelChange(value, mode) {
  console.log(value, mode);
}

export default class ActivityHome extends Component {
  render() {
    return (
      <div className="acv-home">
        <div className="acv-home-nav">
          <div className="left">
            <Title level={4} style={{ margin: "0 20px 0 0" }}>
              热门活动
            </Title>
            <Space
              split={
                <Divider
                  type="vertical"
                  style={{ backgroundColor: "#00000050" }}
                />
              }
            >
              <Button type="text">北京</Button>
              <Button type="text">上海</Button>
              <Button type="text">广州</Button>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  其他城市 <DownOutlined />
                </a>
              </Dropdown>
            </Space>
          </div>
          <div className="right">
            <Button
              type="primary"
              shape="round"
              icon={<BulbOutlined />}
              size="middle"
              className="coporate"
            >
              活动合作
            </Button>
          </div>
        </div>
        <div className="acv-container">
          <div className="acv-top">
            <div className="acv-top-left">
              <img />
            </div>
            <div className="acv-calendar">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
          </div>
          <div className="acv-down">
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
          </div>
        </div>
      </div>
    );
  }
}
