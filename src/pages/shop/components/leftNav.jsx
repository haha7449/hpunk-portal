import { Menu, Button, Popover, Typography, List } from "antd";
import React from "react";
import { queryTwoLevel } from "../../../services/productCate";
import { Link } from "react-router-dom";
import "./leftNav.less";

const { Text } = Typography;

export default class LeftNav extends React.Component {
  constructor() {
    super();
    this.state = {
      cateList: [], //二级分类
    };
  }

  componentDidMount() {
    this.queryTwoLevel();
  }

  queryTwoLevel = async () => {
    let ids = this.props.ids;
    console.log("ids", ids);
    const response = await queryTwoLevel({ ids });
    console.log("response", response);
    const { data: cateList } = response;
    this.setState({ cateList });
  };

  render() {
    const { onSearch } = this.props;
    return (
      <div className="leftNav">
        {this.state.cateList.map((item) => (
          <Button
            type="primary"
            ghost
            onClick={() => onSearch(item.name)}
            style={{ margin: "3px 0px 3px 6px" }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    );
  }
}
