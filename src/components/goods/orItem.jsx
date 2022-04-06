import React, { Component } from "react";
import "./orItem.less";
import { Popover, Button, InputNumber } from "antd";
import { Checkbox, Typography } from "antd";
import { Popconfirm, message, Input } from "antd";

const { Text, Title } = Typography;
const { TextArea } = Input;

export default class OrItem extends Component {
  render() {
    return (
      <div className="or-item">
        <div className="ori-top">
          <div className="ori-info">
            <div className="ori-content">
              <div className="ori-img">
                <img />
              </div>
              <div className="ori-name">
                <Text>
                  大砍刀大砍发生的官方电话给还没见十分感动和附件价格的方式的官方风格和
                </Text>
              </div>
              <div className="ori-size">
                <Text>颜色分类</Text>
              </div>
            </div>
          </div>
          <div className="ori-detail">
            <div className="ori-price">
              <Text>单价</Text>
            </div>
            <div className="ori-number">
              <Text>2</Text>
            </div>
            <div className="ori-prices">
              <Text>金额</Text>
            </div>
            <div className="ori-count">
              <Text>小计</Text>
            </div>
          </div>
        </div>
        <div className="ori-bottom">
          <div className="ori-msg">
            <div className="ori-msg-title">
              <Text>留言</Text>
            </div>
            <div className="ori-msg-content">
              <TextArea showCount maxLength={100} />
            </div>
          </div>
          <div className="ori-all-money">
            <div className="ori-post">
                <Text>运费：￥10.00</Text>
            </div>
            <div className="ori-all">
            <Text>商品合计（含运费）：￥110.00</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
