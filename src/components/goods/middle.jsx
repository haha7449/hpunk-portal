import React, { Component } from "react";
import "./middle.less";
import { Tag } from "antd";
import { Typography } from "antd";
import { Image } from "antd";
import IconFont from "../../assets/icon";

const { Text, Link, Paragraph } = Typography;

export default class Middle extends Component {
  render() {
    return (
      <div className="middle">
        <Link href="https://ant.design" target="_blank">
          <div>
            <Image
              width={"100%"}
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
        </Link>
        <div className="money">
          <Text strong>￥169</Text>
          <span>月销量：100</span>
        </div>
        <Link href="https://ant.design" target="_blank">
          <div className="title">
            <Text
              ellipsis={{
                rows: 2,
                tooltip: "显示完整标题",
              }}
            >
              大砍刀大砍刀大砍刀大砍刀大砍刀大砍刀大砍刀大砍刀大砍刀大砍刀
            </Text>
          </div>
        </Link>
        <div className="comment-number">
          <span>评论数：100</span>
        </div>
        <div className="tags">
          <Tag color="blue">
            <a href="java">养生</a>
          </Tag>
          <Tag color="blue">
            <a href="java">养生</a>
          </Tag>
          <Tag color="blue">
            <a href="java">养生</a>
          </Tag>
        </div>
      </div>
    );
  }
}
