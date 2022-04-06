import React, { Component } from "react";
import Little from "../../components/goods/little";
import { Carousel, Spin, List, message, Statistic } from "antd";
import ProCard from "@ant-design/pro-card";
import InfiniteScroll from "react-infinite-scroller";
import { getProductListByCate } from "../../services/product";
import LeftNav from "./components/leftNav";

export default class Sport extends Component {
  state = {
    shopList: [],
    loading: false,
    hasMore: true,
    shopPageNum: 1,
    shopPageSize: 12,
    total: 0,
    ids: [74, 85], //一级分类编号
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

  fetchData = async (callback) => {
    const res = await getProductListByCate({
      ids: this.state.ids,
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
    return (
      <>
        <ProCard direction="column" ghost gutter={[0, 8]}>
          <ProCard layout="center" split="vertical">
            <ProCard ghost style={{
                height: 353,
                backgroundImage: `url('https://gitee.com/hah7449/pic-bed/raw/master/img/share-bg1.png')`,
              }}>
              <LeftNav ids={this.state.ids} onSearch={this.onSearch}/>
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
            <ProCard
              split="horizontal"
              layout="center"
              style={{
                height: 353,
                backgroundImage: `url('https://gitee.com/hah7449/pic-bed/raw/master/img/share-bg1.png')`,
              }}
            >
              <ProCard
                layout="center"
                ghost
                style={{
                  height: 125,
                }}
              >
                <Statistic title="-已有商品数量-" value={this.state.total} />
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
      </>
    );
  }
}
