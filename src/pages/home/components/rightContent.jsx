import React, { useState,useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Avatar,
  Divider,
  Typography,
  Statistic,
  Tag,
} from "antd";
import { getOrderCount } from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProCard from "@ant-design/pro-card";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const RightContent = (props) => {
  const [orderCountContent, setOrderCountContent] = useState({});
  const [status, setStatus] = useState(false); //是否已经请求过评论

  const { getOrderCount, currentUser, orderCount } = props;

  useEffect(async () => {
    if (!status) {
      const { id } = currentUser;
      await getOrderCount({ id });
      setStatus(true);
    } else {
      console.log();
      setOrderCountContent(orderCount);
    }
  }, [orderCount]);

  return (
    <ProCard split="horizontal" ghost>
      <ProCard
        ghost
        style={{
          height: 100,
        }}
        layout="center"
        bordered={false}
      >
        <div style={{textAlign:'center'}}>
          <Avatar size={64} src={currentUser.icon} />
          <div>
            <Text>Hi！{currentUser.nickname}</Text>
          </div>
        </div>
      </ProCard>
      <ProCard.Group
        direction="row"
        style={{ marginBottom: 10 }}
        ghost
        style={{
          height: 80,
        }}
        bordered={false}
      >
        <ProCard ghost>
          <div style={{ textAlign: "center" }}>
            <Tag color="purple">
              待发货<Title level={4}>{orderCountContent.waitCount}</Title>
            </Tag>
          </div>
        </ProCard>
        <ProCard ghost>
          <div style={{ textAlign: "center" }}>
            <Tag color="purple">
              待收货
              <Title level={4}>{orderCountContent.waitConfirmCount}</Title>
            </Tag>
          </div>
        </ProCard>
        <ProCard ghost>
          <div style={{ textAlign: "center" }}>
            <Tag color="purple">
              待评价<Title level={4}>{orderCountContent.waitCmmentCount}</Title>
            </Tag>
          </div>
        </ProCard>
        <ProCard ghost>
          <div style={{ textAlign: "center" }}>
            <Tag color="purple">
              已完成<Title level={4}>{orderCountContent.finishCount}</Title>
            </Tag>
          </div>
        </ProCard>
      </ProCard.Group>
      <ProCard direction="column" ghost>
        <Link to="/shopCart">
          <Button type="primary" icon={<ShoppingCartOutlined />} block style={{marginBottom:10}} ghost>
            购物车
          </Button>
        </Link>
        <Link to="/orderCenter">
          <Button type="primary" icon={<ShoppingCartOutlined />} block style={{marginBottom:10}} ghost>
            订单中心
          </Button>
        </Link>
        <Link to="/userCenter">
          <Button type="primary" icon={<ShoppingCartOutlined />} block style={{marginBottom:10}} ghost>
            个人中心
          </Button>
        </Link>
      </ProCard>
    </ProCard>
  );
};

function mapStateToProps(state) {
  return {
    orderCount: state.getOrderCountReducer.orderCount,
    user: state.loginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOrderCount }, dispatch);
}

const Right = connect(mapStateToProps, mapDispatchToProps)(RightContent);
export default Right;
