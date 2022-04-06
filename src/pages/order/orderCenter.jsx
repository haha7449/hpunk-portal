import "./orderCenter.less";
import React, { useState, useRef, useEffect } from "react";
import { Button, Space, message, Input, Tag, Modal, Form } from "antd";
import ProTable from "@ant-design/pro-table";
import initialState from "../../redux/initialState";
import CommentForm from "./components/CommentForm";
import {
  getOrderByUid,
  getOrderItemByOid,
  confirmOrder,
  addComment,
} from "../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProCard from "@ant-design/pro-card";
import storageUtils from "../../utils/storageUtils";

const user = storageUtils.getUser();

const OrderCenterContent = (props) => {
  const {
    getOrderByUid,
    getOrderItemByOid,
    confirmOrder,
    orderList,
    orderPagination,
    orderItemList,
    addComment,
    history,
  } = props;

  if (!(user && Object.keys(user).length)) {
    history.replace("/");
  }

  const [commentFormVisible, handleCommentFormVisible] = useState(false);
  const [enable, setEnable] = useState(false); //是否能够展开订单
  const [orderItemForm, setOrderItemForm] = useState({}); //是否能够评价
  const actionRef = useRef();
  const currentUser = initialState.user;
  const dataColumns = [
    {
      title: "下单时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
    },
    {
      title: "单号",
      dataIndex: "orderSn",
      valueType: "textarea",
      hideInSearch: true,
    },
    {
      title: "付款金额",
      dataIndex: "payAmount",
      valueType: "money",
      hideInSearch: true,
    },
    {
      title: "订单状态",
      dataIndex: "status",
      render: (_, record) => {
        let color = "";
        let name = "";
        if (record.status === 0) {
          color = "orange";
          name = "待付款";
        } else if (record.status === 1) {
          color = "green";
          name = "待发货";
        } else if (record.status === 2) {
          color = "cyan";
          name = "已发货";
        } else if (record.status === 3) {
          color = "blue";
          name = "待评价";
        } else if (record.status === 4) {
          color = "geekblue";
          name = "已评价";
        } else if (record.status === 5) {
          color = "red";
          name = "无效订单";
        }
        return (
          <Space>
            <Tag color={color} key={record.id} value={record.status}>
              {name}
            </Tag>
          </Space>
        );
      },
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 100,
      render: (_, record) => {
        if (record.status === 2) {
          return [
            <Button
              type="primary"
              onClick={() => {
                const { id } = record;
                Modal.confirm({
                  title: "确认收货",
                  content: "确认收货？",
                  okText: "确认",
                  cancelText: "取消",
                  onOk: async () => {
                    const res = await confirmOrder({ id });
                    if (res) {
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    }
                  },
                });
              }}
            >
              确认收货
            </Button>,
          ];
        } else if (record.status > 2) {
          return [
            <Button type="primary" disabled>
              已收货
            </Button>,
          ];
        }
        return;
      },
    },
  ];

  useEffect(() => {
    setEnable(true);
    console.log("orderItemList", orderItemList);
  }, [orderItemList]);

  /**
   * 获取订单列表
   *
   */
  const getOrderList = async (params) => {
    console.log("params", params);
    const { current: pageNum } = params;
    const res = await getOrderByUid({
      uid: currentUser.id,
      pageNum,
      pageSize: 10,
    });
    console.log("getOrderList-res", res);
  };

  /**
   * 获取订单单元列表By OrderId
   *
   */
  const getOrderItemListByOid = async ({ oid }) => {
    console.log("oid", oid);
    const res = await getOrderItemByOid({
      oid,
    });
    console.log("getOrderItemListByOid-res", res);
    return res;
  };

  /**
   * 添加评论
   */
  const submitComment = async (newComment) => {
    const res = await addComment(newComment);
    console.log("onFinish-res", res);
    if (res) {
      handleCommentFormVisible(false);
      setOrderItemForm({});
      // //不管用
      // if (actionRef.current) {
      //   actionRef.current.reload();
      // }
      window.location.reload();
    }
  };

  /**
   * 嵌套订单单元表格
   */
  const expandedRowRender = (values) => {
    console.log("values", values);
    const { status } = values;
    const orderItemColumns = [
      {
        title: "商品图",
        dataIndex: "productPic",
        valueType: "image",
        width: 70,
      },
      {
        title: "名称",
        dataIndex: "productName",
        valueType: "textarea",
        width: 250,
      },
      {
        title: "属性",
        dataIndex: "productAttr",
        valueType: "textarea",
      },
      {
        title: "单价",
        dataIndex: "productPrice",
        valueType: "money",
        width: 100,
      },
      {
        title: "数量",
        dataIndex: "productQuantity",
        valueType: "digit",
        width: 100,
      },
      {
        title: "金额",
        dataIndex: "productTotalPrice",
        valueType: "money",
        width: 100,
      },
      {
        title: "操作",
        dataIndex: "option",
        valueType: "option",
        width: 100,
        render: (_, record) => {
          if (status > 2 && status < 5) {
            let operation = "";
            let buttonType = "";
            if (record.isComment === 0) {
              operation = "评价";
              buttonType = "primary";
            }
            if (record.isComment === 1) {
              operation = "查看评价";
              buttonType = "default";
            }
            return [
              <Button
                type={buttonType}
                onClick={() => {
                  console.log("record", record);
                  setOrderItemForm(record);
                  handleCommentFormVisible(true);
                }}
              >
                {operation}
              </Button>,
            ];
          }
          return;
        },
      },
    ];
    return (
      <ProTable
        columns={orderItemColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={orderItemList}
        pagination={false}
        rowKey="id"
      />
    );
  };

  /**
   *
   * @param {*} expanded
   * @param {*} record
   * 点击调用getOrderItemListByOid
   */
  const onExpand = async (expanded, record) => {
    if (expanded) {
      setEnable(true);
      console.log("record", record);
      const { id: oid } = record;
      getOrderItemListByOid({ oid });
    }
  };

  return (
    <>
      <ProCard ghost>
        <ProTable
          headerTitle="全部订单"
          actionRef={actionRef}
          rowKey="id"
          search={false}
          request={async (params) => {
            getOrderList({ ...params });
          }}
          dataSource={orderList}
          columns={dataColumns}
          pagination={orderPagination}
          expandable={{
            expandedRowRender: enable ? expandedRowRender : undefined,
            onExpand,
          }}
        />
        <div style={{ height: "400px" }}></div>
        {orderItemForm && Object.keys(orderItemForm).length ? (
          <CommentForm
            onCancel={() => {
              handleCommentFormVisible(false);
              setOrderItemForm({});
            }}
            modalVisible={commentFormVisible}
            orderItem={orderItemForm}
            submitComment={submitComment}
          />
        ) : null}
      </ProCard>
    </>
  );
};

function mapStateToProps(state) {
  return {
    orderList: state.getOrderByUidReducer.orderList,
    orderPagination: state.getOrderByUidReducer.orderPagination,
    orderStatus: state.getOrderByUidReducer.orderStatus,
    orderItemList: state.getOrderItemByOidReducer.orderItemList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getOrderByUid, getOrderItemByOid, confirmOrder, addComment },
    dispatch
  );
}

const OrderCenter = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderCenterContent);
export default OrderCenter;
