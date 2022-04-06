import React, { useState } from "react";
import { message, Form, Input, Avatar, Button, Typography } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import storageUtils from "../../../utils/storageUtils";
import AliyunOssUpload from "../AliyunOssUpload";
import ProCard from "@ant-design/pro-card";
import { updateInfo } from "../../../redux/actions";
import moment from "moment";

const { Text } = Typography;

const UserInfoContent = (props) => {
  const { updateInfo } = props;
  const user = storageUtils.getUser();
  const { icon, ...rest } = user;
  const createTime = moment(user.createTime).format("YYYY-MM-DD HH:mm:ss");
  const currentUser = { ...rest, createTime };

  const [userIcon, setUserIcon] = useState(icon);

  const handleUpdate = async (values) => {
    const { icon } = values;
    values.icon = icon[0].url;
    console.log("values", values);
    const res = await updateInfo({ ...values });
    if (res) {
      message.success("更新成功");
      window.location.reload();
    } else {
      message.error("更新失败");
    }
  };

  const changeUserIcon = (values) => {
    setUserIcon(values);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleUpdate}
      initialValues={currentUser}
      hideRequiredMark
    >
      <ProCard direction="row">
        <ProCard ghost>
          <Form.Item name="username" label="用户名">
            <Input disabled />
          </Form.Item>
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
            label="手机号"
          >
            <Input />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item label="注册时间">
            <Input value={currentUser.createTime} disabled />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              更新
            </Button>
          </Form.Item>
        </ProCard>
        <ProCard style={{ height: 200 }} direction="column">
          <ProCard layout="center">
            <Avatar size={150} src={userIcon} />
          </ProCard>
          <ProCard layout="center">
            <Form.Item name="icon">
              <AliyunOssUpload changeUserIcon={changeUserIcon} />
            </Form.Item>
          </ProCard>
          <ProCard layout="center" ghost>
            <Text type="secondary">
                图片格式为jpg/png，且上传图片必须小于 5MB!
              </Text>
          </ProCard>
        </ProCard>
      </ProCard>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateInfo }, dispatch);
}

const UserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfoContent);
export default UserInfo;
