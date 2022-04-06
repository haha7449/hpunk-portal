import React, { useState, useEffect } from "react";
import { Form, Button, Input, Radio, Select, Drawer, InputNumber } from "antd";
import { getSkuByPid, updateAttr } from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const radioStyle = {
  display: "block",
  marginBottom: "10px",
};

const UpdateFormContent = (props) => {
  const [formVals, setFormVals] = useState({
    name: props.values.productName,
    quantity: props.values.quantity,
  });
  const [form] = Form.useForm();
  const [skuItem, setItem] = useState({});
  const [status, setStatus] = useState(false);
  const {
    updateModalVisible,
    values,
    skuList,
    getSkuByPid,
    updateAttr,
    onCancel,
    onReload,
  } = props;

  useEffect(async () => {
    if (!status) {
      setStatus(true);
      const { productId: pid } = values;
      const res = await getSkuByPid({ pid });
    } else {
      const skuItem = skuList.find((item) => item.id === values.productSkuId);
      console.log("skuItem", skuItem);
      setItem(skuItem);
      form.setFieldsValue({skuItem:skuItem});
    }
  }, [skuList]);

  const onChangeAttr = (e) => {
    console.log("attr radio checked", e.target.value);
    setItem(e.target.value);
  };

  const onChangeQuan = (value) => {
    console.log("quantity change", value);
  };

  const onFinish = async (value) => {
    console.log(value);
    const {
      quantity,
      skuItem: {
        id: productSkuId,
        price,
        skuCode: productSkuCode,
        spData: productAttr,
      },
    } = value;
    const { id } = values;
    const newCartItem = {
      id,
      quantity,
      productSkuId,
      price,
      productSkuCode,
      productAttr,
    };
    console.log("newCartItem", newCartItem);
    const res = await updateAttr(newCartItem);
    console.log("onFinish-res", res);
    if (res) {
      onReload();
    }
  };

  return (
    <Drawer
      title={formVals.name}
      width={500}
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
      {Object.keys(skuItem).length ? (
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          initialValues={{
            quantity: formVals.quantity,
          }}
          onFinish={onFinish}
          footer
        >
          <Form.Item
            name="skuItem"
            label="商品属性"
            rules={[{ required: true, message: "请选择属性" }]}
          >
            <Radio.Group
              options={null}
              onChange={onChangeAttr}
              value={skuItem}
              buttonStyle="solid"
            >
              {skuList.map((item) => {
                return (
                  <Radio.Button style={radioStyle} value={item} disabled={item.stock ? false : true}>
                    {item.spData}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="库存">{(skuItem && skuItem.stock)}</Form.Item>
          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: "数量不能为空" }]}
          >
            <InputNumber min={1} onChange={onChangeQuan} max={skuItem && skuItem.stock}/>
          </Form.Item>
        </Form>
      ) : null}
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
