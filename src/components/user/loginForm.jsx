import React, { Component } from "react";
import "./loginForm.less";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import changeAction from "../../redux/actions/login/change";
import { reqTest } from "../../api";
import {message} from "antd";

// Map Redux State to component props
// const mapStateToProps = (state) => {
//   // console.log(state, 123)
//   return {};
// };
// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: () => {
      //请求测试
      reqTest("testing").then(response => {
        message.success(response.data);
      }).catch(error => {
        message.error(error);
      });
      dispatch(changeAction);
    },
  };
};

class Login extends Component {
  formRef = React.createRef();
  render() {
    const { handleLogin } = this.props;
    return (
      <div className="user-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
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
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// Connect component
const LoginForm = connect(null, mapDispatchToProps)(Login);

export default LoginForm;
