import React, { Component } from "react";
import "./authorResultItem.less";
import { Avatar, Button, Typography } from "antd";

import { UserOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

export default class AuthorResultItem extends Component {
  render() {
    return (
      <Link>
        <div className="ar-item">
          <div className="ari-left">
            <div className="ari-avatar">
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </div>
            <div className="ari-content">
              <div className="ari-name">
                <Text>姓名</Text>
              </div>
              <div className="ari-essayNum">
                <Text>文章数</Text>
              </div>
            </div>
          </div>
          <div className="ari-right">
            <Button type="primary">+ 关注</Button>
          </div>
        </div>
      </Link>
    );
  }
}
