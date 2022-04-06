import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { register } from "../../redux/actions";

const RegisterForm = (props) => {
  const { modalVisible, onCancel, register } = props;

  const onFinishRegister = async (values) => {
    console.log("register-values", values);
    const { phone } = values;
    values.username = phone;
    console.log("values", values);

    const res = await register(values);
    console.log("register-res", res);

    if (res) {
      message.success("注册成功");
      onCancel();
    } else {
      message.error("用户已存在");
    }
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
    <Modal
      visible={modalVisible}
      onCancel={() => onCancel()}
      title="注册"
      destroyOnClose
      footer={null}
      width="400px"
    >
      <Form name="normal_login" onFinish={onFinishRegister}>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "请输入手机号!",
            },
            {
              type: "string",
              required: true,
              pattern: /^1[3-9]\d{9}$/,
              transform(value) {
                return value.trim();
              },
              message: "手机号格式不正确",
            },
          ]}
        >
          <Input
            placeholder="手机号"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              validator: checkPassword,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="密码"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "请确认密码!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("两次密码不一致!"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="确认密码"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.loginReducer.user,
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch);
}

const Register = connect(null, mapDispatchToProps)(RegisterForm);
export default Register;
