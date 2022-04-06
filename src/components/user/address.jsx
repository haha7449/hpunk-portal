import React, { Component } from "react";
import "./address.less";

import { Typography, Radio, Tabs, Button, Modal } from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;

const isModalVisible = false;

const showModal = () => {
  this.setState({
    isModalVisible: true,
  });
};

const handleOk = () => {
  this.setState({
    isModalVisible: false,
  });
};

const handleCancel = () => {
  this.setState({
    isModalVisible: false,
  });
};

const operations = (
  <div>
    <Button type="primary" style={{ marginRight: "10px" }}>
      新增地址
    </Button>
    <Modal title="Basic Modal" visible={false}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
    <Button>管理地址</Button>
  </div>
);

export default class Address extends Component {
  state = {
    value: 1,
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const { value } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    return (
      <div className="address">
        <Tabs defaultActiveKey="1" tabBarExtraContent={operations} size="large">
          <TabPane tab="收货地址" key="1">
            <div className="o-as">
              <Radio.Group onChange={this.onChange} value={value}>
                <Radio style={radioStyle} value={1}>
                  A
                </Radio>
                <Radio style={radioStyle} value={2}>
                  B
                </Radio>
                <Radio style={radioStyle} value={3}>
                  C
                </Radio>
                <Radio style={radioStyle} value={4}>
                  D
                </Radio>
              </Radio.Group>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
