import React, { Component } from "react";
import "./author.less";
import HomeEssay from "../../components/essay/homeEssay";
import { Typography, Button, Divider, Tag, Tabs, Card } from "antd";
import { Comment, Tooltip, List } from "antd";
import { Avatar, Form, Input } from "antd";

import { HeartOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const { TabPane } = Tabs;
const operations = <Text>TA一共发表了86篇文章</Text>;

export default class Author extends Component {
  render() {
    return (
      <div className="author">
        <div className="a-essays">
          <div style={{ padding: "0 10px" }}>
            <Tabs tabBarExtraContent={operations} size="large">
              <TabPane tab="全部文章" key="1"></TabPane>
            </Tabs>
          </div>
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
        </div>
        <div className="a-info">
          <div className="a-header">
            <div className="a-header-top">
              <div className="a-avatar">
                <Avatar shape="square" size={72} icon={<UserOutlined />} />
              </div>
              <div className="a-name">
                <Title level={4} style={{ margin: 0 }}>
                  小明
                </Title>
                <div>
                  <Tag color="blue">养生专家</Tag>
                </div>
                <Text>文章数：80</Text>
              </div>
            </div>
            <div className="a-intro">
              <Text>简介：西奥菲啊的撒范德萨发上的是法国达改变你对给</Text>
            </div>
            <div className="a-sub">
              <Button type="primary" block>
                关注
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
