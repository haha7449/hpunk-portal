import React, { useState, useEffect } from "react";
import { Form, Button, Input, Radio, Select, Drawer, InputNumber } from "antd";
import { getSkuByPid, updateAttr } from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
  marginBottom: "10px",
};

const UpdateFormContent = (props) => {
  useEffect(async () => {
    console.log("props", props);
    const { productId: pid } = values;
    const res = await getSkuByPid({ pid });
  }, [0]);

  const [formVals, setFormVals] = useState({
    name: props.values.productName,
    quantity: props.values.quantity,
  });
  const [form] = Form.useForm();
  const [item, setItem] = useState({});
  const {
    updateModalVisible,
    values,
    skuList,
    getSkuByPid,
    updateAttr,
    onCancel,
    onReload,
  } = props;

  const onChangeAttr = (e) => {
    console.log("attr radio checked", e.target.value);
    setItem(e.target.value);
  };

  const onChangeQuan = (value) => {
    console.log("quantity change", value);
  };

  const onFinish = async (value) => {
    console.log(value);
    const {quantity,skuItem:{id:productSkuId,price,skuCode:productSkuCode,spData:productAttr}} = value;
    const {id} = values;
    const newCartItem = {id,quantity,productSkuId,price,productSkuCode,productAttr};
    console.log("newCartItem",newCartItem);
    const res = await updateAttr(newCartItem);
    console.log("onFinish-res",res);
    if (res) {
      onReload();
    }
  };

  return (
    <Drawer
      title={formVals.name}
      width={720}
      onClose={() => onCancel()}
      visible={updateModalVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={() => form?.submit()}
            type="primary"
            style={{ marginRight: 8 }}
          >
            保存
          </Button>
          <Button onClick={() => onCancel()}>取消</Button>
        </div>
      }
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        initialValues={{
          // skuItem: { skuList.find(item => item.id === values.productSkuId)},
          quantity: formVals.quantity,
        }}
        onFinish={onFinish}
        footer
      >
        <Form.Item
          name="skuItem"
          label="商品属性"
          rules={[{ required: true, message: "Please enter user name" }]}
        >
          <Radio.Group
            options={null}
            onChange={onChangeAttr}
            value={item}
            buttonStyle="solid"
          >
            {skuList.map((item) => {
              return (
                <Radio.Button style={radioStyle} value={item}>
                  {item.spData}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="数量"
          rules={[{ required: true, message: "Please select an owner" }]}
        >
          <InputNumber min={1} onChange={onChangeQuan} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

function mapStateToProps(state) {
  return {
    skuList: state.getSkuByPidReducer.skuList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSkuByPid, updateAttr }, dispatch);
}

const UpdateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateFormContent);
export default UpdateForm;
