import React, { Component } from "react";
import LeftNav from "./components/leftNav";
import Little from "../../components/goods/little";
import { List, Carousel, Typography, Spin, Space, Input, message } from "antd";
import { getProductList } from "../../services/product";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProCard from "@ant-design/pro-card";
import RightContent from "./components/rightContent";
import storageUtils from "../../utils/storageUtils";
import InfiniteScroll from "react-infinite-scroller";
const { Search } = Input;
const { Text } = Typography;
const localUser = storageUtils.getUser() || {};

class HomeContent extends Component {
  state = {
    shopList: [],
    loading: false,
    hasMore: true,
    shopPageNum: 1,
    shopPageSize: 12,
    total: 0,
    currentUser: undefined, //注意这种用法
  };

  componentDidMount() {
    this.fetchData((res) => {
      console.log("componentDidMount-res", res);
      this.setState({
        shopList: res.data.list,
        total: res.data.total,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.setState({ currentUser: this.props.user });
    }
  }

  fetchData = async (callback) => {
    const res = await getProductList({
      pageSize: this.state.shopPageSize,
      pageNum: this.state.shopPageNum,
    });
    console.log("fetchData-res", res);
    callback(res);
  };

  handleInfiniteOnLoad = () => {
    let { shopList, shopPageNum, total } = this.state;
    this.setState({
      loading: true,
      shopPageNum: shopPageNum + 1,
    });
    if (shopList.length >= total) {
      message.success("全部商品加载完毕");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      shopList = shopList.concat(res.data.list);
      console.log("new-shopList", shopList);
      this.setState({
        shopList,
        loading: false,
      });
    });
  };

  onSearch = (value) => {
    console.log(value);
    this.props.history.push("/search/" + value);
  };

  render() {
    console.log("home-props", this.props);
    const { currentUser } = this.state;
    const user = currentUser || localUser;
    return (
      <div className="home">
        <ProCard direction="column" ghost gutter={[0, 8]}>
          <ProCard split="horizontal">
            <ProCard layout="center">
              <Space direction="vertical">
                <Search
                  placeholder="搜索商品名称/分类/货号"
                  allowClear
                  enterButton="搜索"
                  size="middle"
                  onSearch={this.onSearch}
                  defaultValue=""
                  style={{ width: "400px" }}
                />
              </Space>
            </ProCard>
            <ProCard layout="center" split="vertical">
              <ProCard ghost headerBordered colSpan="20%">
                <LeftNav onSearch={this.onSearch} />
              </ProCard>
              <ProCard colSpan="50%" ghost>
                <Carousel autoplay style={{ height: "100%" }}>
                  <div>
                    <img src="https://gitee.com/hah7449/pic-bed/raw/master/img/606e623b0db962023.png" />
                  </div>
                  <div>
                    <img src="https://gitee.com/hah7449/pic-bed/raw/master/img/606e61d6111181172.png" />
                  </div>
                  <div>
                    <img src="https://gitee.com/hah7449/pic-bed/raw/master/img/606e60cb4ca7c977.png" />
                  </div>
                  <div>
                    <img src="https://gitee.com/hah7449/pic-bed/raw/master/img/606d708a2651b2364.png" />
                  </div>
                </Carousel>
              </ProCard>
              {/* <ProCard
                layout="center"
                style={{
                  height: 353,
                  backgroundImage: `url('https://gitee.com/hah7449/pic-bed/raw/master/img/share-bg1.png')`,
                }}
              >
                Hi！登录查看更多精彩！
              </ProCard> */}
              <ProCard
                layout="center"
                style={{
                  height: 353,
                  backgroundImage: `url('https://gitee.com/hah7449/pic-bed/raw/master/img/share-bg1.png')`,
                }}
              >
                {user && user.nickname ? (
                  <RightContent currentUser={user} />
                ) : (
                  <Text>Hi！登录查看更多精彩！</Text>
                )}
              </ProCard>
            </ProCard>
          </ProCard>
          <ProCard layout="center" ghost style={{ backgroundColor: "#ffffff" }}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={true}
            >
              <List
                dataSource={this.state.shopList}
                grid={{ gutter: 0, column: 6 }}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <Little
                      id={item.id}
                      src={item.pic}
                      title={item.name}
                      price={item.price}
                    />
                  </List.Item>
                )}
              >
                {this.state.loading && this.state.hasMore && (
                  <div className="demo-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </ProCard>
        </ProCard>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ login }, dispatch);
// }

const Home = connect(mapStateToProps, null)(HomeContent);
export default Home;
