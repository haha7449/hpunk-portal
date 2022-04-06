import "./shopCart.less";
import React, { useState, useRef } from "react";
import { Button, Typography, message, Input, Drawer, Modal } from "antd";
import { FooterToolbar } from "@ant-design/pro-layout";
import { queryShopCartList } from "../../services/shopCart";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import UpdateForm from "./components/UpdateForm";
import initialState from "../../redux/initialState";
import {
  generateOrder,
  getSkuByPid,
  removeCartItem,
} from "../../redux/actions";
import storageUtils from "../../utils/storageUtils";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProCard from "@ant-design/pro-card";
import { Link } from "react-router-dom";

const { Text } = Typography;

const user = storageUtils.getUser();

const ShopCartContent = (props) => {
  const { removeCartItem,history } = props;

  console.log("ShopCartContent-user",user);

  if(!(user && Object.keys(user).length)){
    history.replace('/');
  }

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [cartItemValues, setCartItemValues] = useState({});
  const [shopCartList, setShopCartList] = useState([]);
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const currentUser = initialState.user;
  const dataColumns = [
    {
      title: "商品图",
      dataIndex: "productPic",
      valueType: "image",
      width: 70,
      height: 200,
      hideInSearch: true,
    },
    {
      title: "名称",
      dataIndex: "productName",
      valueType: "textarea",
      width: 250,
      render: (_, record) => [
        <Link to={"/shopDetail/" + record.productId}>
          {record.productName}
        </Link>,
      ],
    },
    {
      title: "属性",
      dataIndex: "productAttr",
      valueType: "textarea",
      hideInSearch: true,
    },
    {
      title: "单价",
      dataIndex: "price",
      valueType: "money",
      hideInSearch: true,
      width: 100,
    },
    {
      title: "数量",
      dataIndex: "quantity",
      valueType: "digit",
      hideInSearch: true,
      width: 100,
    },
    {
      title: "金额",
      dataIndex: "totalPrice",
      valueType: "money",
      hideInSearch: true,
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 100,
      render: (_, record) => [
        <Button
          type="primary"
          onClick={() => {
            console.log("record", record);
            handleUpdateModalVisible(true);
            setCartItemValues(record);
          }}
        >
          编辑
        </Button>,
        <Button
          type="link"
          onClick={() => {
            Modal.confirm({
              title: "删除商品",
              content: "确定删除该商品吗？",
              okText: "确认",
              cancelText: "取消",
              onOk: () => handleRemove(record.id, "remove"),
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  /**
   * 获取购物车列表
   *
   */
  const getShopCartList = async (params) => {
    const { productName } = params;
    const res = await queryShopCartList({
      memberId: currentUser.id,
      productName,
    });
    console.log("getShopCartList-res", res);
    const { data } = res;
    setShopCartList(data);
  };

  /**
   * 删除节点:
   *
   * @param id
   */
  const handleRemove = async (deleteId, type) => {
    let ids = [];
    if (type === "remove") {
      ids.push(deleteId);
    } else if (type === "removeBatch") {
      for (let i = 0; i < deleteId.length; i++) {
        ids.push(deleteId[i].id);
      }
    }

    const res = await removeCartItem({ ids, deleteStatus: 1 });
    if (res) {
      message.success("删除成功");
      //重新刷新
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      message.fail("删除失败");
    }
  };

  /**
   *
   * @param {生成订单} selectedRows
   */
  const generateOrder = async (selectedRows) => {
    message.success("正在结算...");
    const { id: uid } = user;
    console.log("props", props);
    const { generateOrder, history } = props;

    if (!selectedRows) return true;
    //console.log("index-selectedRows",selectedRows)

    let cartIds = [];
    for (let i = 0; i < selectedRows.length; i++) {
      cartIds.push(selectedRows[i].id);
    }
    //console.log("index-ids",ids);
    const res = await generateOrder({ cartIds, uid });
    if (res) {
      message.success("下单成功");
      //重新刷新
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <>
      <ProCard ghost>
        <ProTable
          headerTitle="购物车（勾选结算）"
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 40,
          }}
          request={async (params) => {
            getShopCartList({ ...params });
          }}
          dataSource={shopCartList}
          columns={dataColumns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
          pagination={false}
        />
        <div style={{ height: "400px" }}></div>
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                <Text>已选商品：</Text>{" "}
                <Text
                  strong
                  style={{
                    fontSize: "20px",
                    color: "#0f2ed3",
                  }}
                >
                  {selectedRowsState.length}
                </Text>{" "}
                <Text style={{ marginRight: "10px" }}>件</Text>
                <Text>合计金额：</Text>{" "}
                <Text
                  strong
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    color: "#0f2ed3",
                  }}
                >
                  ￥
                  {selectedRowsState.reduce(
                    (pre, item) => pre + item.totalPrice,
                    0
                  )}
                </Text>
              </div>
            }
          >
            <Button
              type="text"
              onClick={async () => {
                await handleRemove(selectedRowsState, "removeBatch");
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button
              type="primary"
              style={{ width: 150, height: 80 }}
              onClick={async () => {
                await generateOrder(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              结算
            </Button>
          </FooterToolbar>
        )}
        {cartItemValues && Object.keys(cartItemValues).length ? (
          <UpdateForm
            onReload={() => {
              handleUpdateModalVisible(false);
              setCartItemValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setCartItemValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={cartItemValues}
          />
        ) : null}
        <Drawer
          width={600}
          visible={!!row}
          onClose={() => {
            setRow(undefined);
          }}
          closable={false}
        >
          {row?.name && (
            <ProDescriptions
              column={2}
              title={row?.name}
              request={async () => ({
                data: row || {},
              })}
              params={{
                id: row?.name,
              }}
              columns={dataColumns}
            />
          )}
        </Drawer>
      </ProCard>
    </>
  );
};

function mapStateToProps(state) {
  return {
    skuList: state.getSkuByPidReducer.skuList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { generateOrder, getSkuByPid, removeCartItem },
    dispatch
  );
}

const ShopCart = connect(mapStateToProps, mapDispatchToProps)(ShopCartContent);
export default ShopCart;
