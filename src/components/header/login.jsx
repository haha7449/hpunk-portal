import React from "react";
import { Modal, Form, Input, Checkbox, Button,message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

const LoginForm = (props) => {
  const { modalVisible, onCancel,login } = props;

  const handleLogin = async (values) => {
    console.log("values", values);    
    const res = await login(values);
    console.log("login-res", res);

    if (res) {
      onCancel();
      //这里很奇怪，当登录之后如果不刷新，点击主页中的快捷入口则无法打开
      //所以这里登录之后自动刷新
      window.location.reload();
    } else {
      message.error("用户名或密码错误");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      onCancel={() => onCancel()}
      title="登录"
      destroyOnClose
      footer={null}
      width="400px"
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名/手机号",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名/手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default Login;
