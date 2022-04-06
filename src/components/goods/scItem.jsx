import React, { Component } from "react";
import "./scItem.less";
import { Popover, Button, InputNumber } from "antd";
import { Checkbox, Typography } from "antd";
import { Popconfirm, message } from "antd";

const { Text, Title } = Typography;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function onChangeNumber(value) {
  console.log("changed", value);
}

export default class ScItem extends Component {
  render() {
    return (
      <div className="sc-item">
        <div className="sci-info">
          <div className="sci-check">
            <Checkbox onChange={onChange}></Checkbox>
          </div>
          <div className="sci-content">
            <div className="sci-img">
              <img />
            </div>
            <div className="sci-name">
              <Text>
                大砍刀大砍发生的官方电话给还没见十分感动和附件价格的方式的官方风格和
              </Text>
            </div>
            <div className="sci-size">
              <Text>颜色分类</Text>
              <Popover content={content} title="Title" trigger="click">
                <Button size="small" type="primary">
                  修改
                </Button>
              </Popover>
            </div>
          </div>
        </div>
        <div className="sci-detail">
          <div className="sci-price">
            <Text>单价</Text>
          </div>
          <div className="sci-number">
            <InputNumber
            style={{width:"100%"}}
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChangeNumber}
            />
          </div>
          <div className="sci-prices">
            <Text>金额</Text>
          </div>
          <div className="sci-operate">
            <Popconfirm
              title="你确定删除商品吗？"
              onConfirm={confirm}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  }
}
