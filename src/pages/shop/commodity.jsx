import React, { Component } from "react";
import {
  InputNumber,
  Button,
  Typography,
  Comment,
  List,
  Radio,
  Form,
  message,
  Image,
  Descriptions,
  Statistic,
  Rate,
  Space,
  Result,
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getProductDetail,
  addToCart,
  getCurrentUser,
} from "../../redux/actions";
import storageUtils from "../../utils/storageUtils";
import ProCard from "@ant-design/pro-card";
import moment from "moment";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Divider } = ProCard;
const user = storageUtils.getUser();

const radioStyle = {
  display: "block",
  marginBottom: "10px",
};

function callback(key) {
  console.log(key);
}

function onChange(value) {
  console.log("changed", value);
}

class commodity extends Component {
  formRef = React.createRef();

  state = {
    item: {}, //选中的属性item
  };

  componentDidMount() {
    console.log("props", this.props);
    const { match } = this.props;
    const productId = match.params.id;
    console.log("productId", productId);
    const { getProductDetail } = this.props; //非常重要！！！！
    //搜索商品
    getProductDetail({
      productId,
    });
  }

  onChangeAttr = (e) => {
    console.log("attr radio checked", e.target.value);
    this.setState({
      item: e.target.value,
    });
  };

  renderSku = (item) => {
    return (
      <Radio.Button
        style={radioStyle}
        value={item}
        disabled={item.stock ? false : true}
      >
        {item.spData}
      </Radio.Button>
    );
  };

  /**
   * 加入购物车
   */
  handleAddToCart = async (values) => {
    console.log("user", user);
    if (user && Object.keys(user).length && user.id) {
      const { product, addToCart } = this.props;
      console.log("handleAddToCart-values", values);
      const {
        quantity,
        skuItem: {
          id: productSkuId,
          spData: productAttr,
          skuCode: productSkuCode,
          price,
        },
      } = values;
      const {
        id: productId,
        pic: productPic,
        name: productName,
        subTitle: productSubTitle,
        productCategoryId,
        brandName: productBrand,
        productSn,
      } = product;
      const { id: memberId } = user;
      const cartItem = {
        productId,
        productSkuId,
        price,
        productPic,
        productName,
        quantity,
        productAttr,
        memberId,
        productSubTitle,
        productSkuCode,
        productCategoryId,
        productBrand,
        productSn,
      };

      const res = await addToCart(cartItem);
      console.log("handleAddToCart-res", res);
      if (res) {
        message.success("添加成功");
      } else {
        message.error("添加失败");
      }
    } else {
      message.error("请先登录！");
    }
  };

  render() {
    const { product, skuStockList, commentList } = this.props;
    const { item } = this.state;

    //评论数据
    let data = [];
    if (commentList && Object.keys(commentList).length) {
      data = commentList.map((item) => {
        return {
          author: (
            <Space>
              <Text>{item.memberNickName}</Text>
              <Text>[属性:{item.productAttribute}]</Text>
              <Rate disabled defaultValue={item.star} />
            </Space>
          ),
          avatar: `${item.memberIcon}`,
          content: <p>{item.content}</p>,
          actions: [
            <span>
              {moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}
            </span>,
          ],
        };
      });
    }

    return (
      <ProCard direction="column" gutter={[0, 8]} ghost>
        <ProCard split="vertical" style={{ backgroundColor: "#f0f2f5" }}>
          <ProCard split="horizontal" ghost style={{ padding: 10 }}>
            <ProCard layout="center" style={{ marginBottom: 10 }}>
              <Image width={250} src={product.pic} />
            </ProCard>
            <ProCard title="商品详情" headerBordered>
              <Descriptions>
                <Descriptions.Item label="详细" span={3}>
                  {product.subTitle}
                </Descriptions.Item>
                <Descriptions.Item label="描述" span={3}>
                  {product.description}
                </Descriptions.Item>
                <Descriptions.Item label="分类" span={3}>
                  <Link to={"/search/" + product.productCategoryName}>
                    {product.productCategoryName}
                  </Link>
                </Descriptions.Item>
              </Descriptions>
            </ProCard>
          </ProCard>
          <ProCard ghost style={{ padding: 10 }}>
            <Form
              ref={this.formRef}
              name="formAddToCart"
              onFinish={this.handleAddToCart}
              initialValue={{ quantity: 1 }}
              hideRequiredMark
            >
              <ProCard.Group
                title={product.name}
                direction="row"
                style={{ marginBottom: 10 }}
              >
                <ProCard colSpan="70%">
                  <Statistic
                    title="价格"
                    value={(item && item.price) || product.price}
                    precision={2}
                    valueStyle={{ fontSize: 36, fontWeight: "bold" }}
                    prefix="￥"
                  />
                </ProCard>
                <Divider type="vertical" />
                <ProCard>
                  <Statistic title="销量" value={product.sale} precision={0} />
                </ProCard>
              </ProCard.Group>
              <ProCard headerBordered>
                <Form.Item
                  name="skuItem"
                  rules={[
                    {
                      required: true,
                      message: "请选择属性!",
                    },
                  ]}
                  label="属性"
                >
                  <Radio.Group
                    options={null}
                    onChange={this.onChangeAttr}
                    value={item}
                    buttonStyle="solid"
                  >
                    {skuStockList.map((item) => {
                      return this.renderSku(item);
                    })}
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="数量"
                  rules={[
                    {
                      required: true,
                      message: "请输入数量!",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    onChange={onChange}
                    max={item && item.stock}
                  />
                </Form.Item>
                <Form.Item label="库存">
                  <Text>{(item && item.stock) || product.stock}</Text>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block size="large" htmlType="submit">
                    加入购物车
                  </Button>
                </Form.Item>
              </ProCard>
            </Form>
          </ProCard>
        </ProCard>
        <ProCard>
          {data && Object.keys(data).length ? (
            <List
              className="comment-list"
              header={`累计评价${data.length}`}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          ) : (
            <Result
              status="404"
              title="暂无评价"
              subTitle="去购买商品，成为第一个评价的人吧!"
            />
          )}
        </ProCard>
      </ProCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.getProductDetailReducer.product,
    brand: state.getProductDetailReducer.brand,
    skuStockList: state.getProductDetailReducer.skuStockList,
    commentList: state.getProductDetailReducer.commentList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getProductDetail, addToCart, getCurrentUser },
    dispatch
  );
}

const Commodity = connect(mapStateToProps, mapDispatchToProps)(commodity);
export default Commodity;
