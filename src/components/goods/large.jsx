import React, { Component } from "react";
import "./large.less";
import { Tag } from "antd";
import { Typography } from "antd";
import { Image } from "antd";
import {Link} from "react-router-dom";

const { Text } = Typography;

export default class Large extends Component {
  render() {
    const {
      price,
      name,
      src,
      sale,
      id,
      stock,
      productCategoryName,
    } = this.props;
    const to = "/shopDetail/" + id;

    return (
      <div className="large" key={id}>
        <Link to={to}>
          <div>
            <Image width={"100%"} preview={false} src={src} />
          </div>
          <div className="money">
            <Text strong>￥{price}</Text>
            <span>月销量：{sale}</span>
          </div>
          <div className="title">
            <Text
              ellipsis={{
                rows: 2,
                tooltip: { name },
              }}
            >
              {name}
            </Text>
          </div>
          <div className="store">
            <Text>库存：{stock}</Text>
          </div>
          <div className="tags">
            <Tag color="geekblue">{productCategoryName}</Tag>
          </div>
        </Link>
      </div>
    );
  }
}
