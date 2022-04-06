import React, { Component } from "react";
import "./searchResult.less";
import { List, Space, Input, Result } from "antd";
import Large from "../../components/goods/large";
import ProCard from "@ant-design/pro-card";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProductSimpleList } from "../../redux/actions";

const { Search } = Input;

class SearchResultContent extends Component {
  state = {
    //商品
    pro: {
      list: [], //商品列表
      pageNum: 1,
      pageSize: 20,
      total: "",
    },
    //文章
    ess: {
      list: [], //文章列表
      pageNum: 1,
      pageSize: 12,
    },
    keyword: "", //搜索框内容
  };

  componentDidMount() {
    const { match } = this.props;
    const keyword = match.params.keyword;
    this.searchProduct({
      keyword,
      pageNum: this.state.pro.pageNum,
      pageSize: this.state.pro.pageSize,
    });
    this.setState({ keyword });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchProductList !== prevProps.searchProductList) {
      const { searchProductList, searchListPagination } = this.props;
      this.setState({
        pro: {
          list: searchProductList,
          total: searchListPagination.total,
          pageNum: searchListPagination.pageNum,
          pageSize: searchListPagination.pageSize,
        },
      });
    }   
  }

  /**
   * 搜索商品
   */
  searchProduct = async (params) => {
    const { getProductSimpleList } = this.props;
    getProductSimpleList(params);
    this.setState({ keyword: params.keyword });
  };

  render() {
    const { match } = this.props;
    return (
      <ProCard split="horizontal">
        <ProCard layout="center">
          <Space direction="vertical">
            <Search
              placeholder="搜索商品名称/分类/货号"
              allowClear
              enterButton="搜索"
              size="middle"
              onSearch={(value) => {
                console.log(value);
                this.props.history.push("/search/" + value);
                const params = {
                  keyword: value,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                };
                this.searchProduct(params);
              }}
              defaultValue={match.params.keyword}
              style={{ width: "400px" }}
            />
          </Space>
        </ProCard>
        <ProCard title={`搜索结果: ${this.state.pro.total} 条数据`}>
          {this.state.pro.list && Object.keys(this.state.pro.list).length ? (
            <List
              dataSource={this.state.pro.list}
              grid={{ gutter: 0, column: 5 }}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                  const keyword = this.state.keyword;
                  const pageNum = page;
                  const pageSize = this.state.pro.pageSize;
                  this.searchProduct({ keyword, pageNum, pageSize });
                },
                pageSize: this.state.pro.pageSize,
                current: this.state.pro.pageNum,
                total: this.state.pro.total,
                showTotal:total => `总共 ${total} 条数据`
              }}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Large
                    id={item.id}
                    src={item.pic}
                    name={item.name}
                    price={item.price}
                    sale={item.sale}
                    stock={item.stock}
                    productCategoryName={item.productCategoryName}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Result
              status="404"
              title="暂无结果"
              subTitle="换个关键词搜索试试吧!"
            />
          )}
        </ProCard>
      </ProCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProductList: state.getProductSimpleListReducer.searchProductList,
    searchListPagination:
      state.getProductSimpleListReducer.searchListPagination,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProductSimpleList }, dispatch);
}

const SearchResult = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultContent);
export default SearchResult;
