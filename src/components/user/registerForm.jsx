import React, { Component } from "react";
import "./registerForm.less";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const RegisterForm = () => {
  const [form] = Form.useForm(); // 数据绑定用的form

  //验证码
  const sendVCode = () => {
    //获取电话号码
    const tel = form.getFieldValue('telephone');//注意这里不能用双引号，只能单引号
    //发送验证码

    //调用API验证
    console.log(tel);
    //返回验证结果
  };

  //注册：注册成功之后直接登录
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="user-register">
      <Form
        name="normal_login"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="telephone"
          rules={[
            {
              required: true,
              message: "手机号格式不正确!",
            },
          ]}
        >
          <Input placeholder="手机号" />
        </Form.Item>
        {/* 验证码 */}
        <div className="v-code">
          <Form.Item
            name="vcode"
            rules={[
              {
                required: true,
                message: "验证码错误",
              },
            ]}
          >
            <Input placeholder="验证码" />
          </Form.Item>
          <Button type="primary" onClick={()=>sendVCode()}>
            发送短信验证码
          </Button>
        </div>
        {/* 输入密码 */}
        <Form.Item
          name="password"
          label=""
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
        >
          <Checkbox>
            我同意<a href="">用户协议</a>
          </Checkbox>
        </Form.Item>
        {/* 注册 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
