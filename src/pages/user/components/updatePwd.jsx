import React from "react";
import { Button, Input, Select, Upload, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProCard from "@ant-design/pro-card";
import { updatePwd } from "../../../redux/actions";
import storageUtils from "../../../utils/storageUtils";

const UpdatePwdContent = (props) => {
  const { updatePwd } = props;
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    console.log("values", values);
    const user = storageUtils.getUser();
    const { username } = user;
    const res = await updatePwd({ ...values, username });
    res ? message.success("更新成功") : message.error("旧密码错误");
    form.resetFields();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      return promise.reject("请输入密码");
    } // 有值的情况

    if (value.length < 6) {
      return promise.reject("密码不小于6位");
    }

    return promise.resolve();
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        hideRequiredMark
        form={form}
      >
        <ProCard direction="row">
          <ProCard ghost>
            <Form.Item name="oldPassword" label="旧密码" hasFeedback>
              <Input type="password" placeholder="旧密码" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
              hasFeedback
            >
              <Input
                type="password"
                placeholder="新密码"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={["newPassword"]}
              placeholder="确认密码"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请输入确认密码!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("两次密码不一致!"));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="确认密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => form?.submit()}>
                更新密码
              </Button>
            </Form.Item>
          </ProCard>
          <ProCard style={{ height: 200 }} direction="column"></ProCard>
        </ProCard>
      </Form>
      <div style={{ height: "400px" }}></div>
    </>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.loginReducer.user,
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePwd }, dispatch);
}

const UpdatePwd = connect(null, mapDispatchToProps)(UpdatePwdContent);
export default UpdatePwd;
