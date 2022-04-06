import React, { useState } from "react";
import ProCard from "@ant-design/pro-card";
import { Space, Select } from "antd";
import UserInfo from "./components/userInfo";
import UpdatePwd from "./components/updatePwd";
import storageUtils from "../../utils/storageUtils";

const user= storageUtils.getUser();

export default (props) => {
  const {history} = props;

  if(!(user && Object.keys(user).length)){
    history.replace('/');
  }

  const [tab, setTab] = useState("tab1");
  const [tabPosition, setTabPosition] = useState("top");
  return (
    <ProCard
    title="个人中心"
    headerBordered
      tabs={{
        tabPosition,
        activeKey: tab,
        onChange: (key) => {
          setTab(key);
        },
      }}
    >
      <ProCard.TabPane key="tab1" tab="基本信息">
        <UserInfo />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="修改密码">
        <UpdatePwd />
      </ProCard.TabPane>
    </ProCard>
  );
};
