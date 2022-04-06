import { Menu, Button, Popover, Typography,List } from "antd";
import React from "react";
import {
  queryCateOne,
  queryCateOneChildren,
} from "../../../services/productCate";
import { Link } from "react-router-dom";
import "./leftNav.less";
function handleClick(e) {
  console.log("click", e);
}

const { Text } = Typography;

const ButtonStyle = {
  textAlign: "left",
  height: "59px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default class LeftNav extends React.Component {
  constructor() {
    super();
    this.state = {
      cateOneList: [], //一级分类
      cateOneChildrenList: [], //子分类，与一级分类列表下标对应
    };
  }

  componentDidMount() {
    this.queryCateOne();
  }

  queryCateOne = async () => {
    const response = await queryCateOne();
    const { data: cateOneList } = response;
    console.log("cateOneList", cateOneList);
    this.queryCateOneChildren(cateOneList);
  };

  queryCateOneChildren = async (cateOneList) => {
    const cateOneChildrenList = await Promise.all(
      cateOneList.map(async (item) => {
        const response = await queryCateOneChildren(item.id);
        console.log("response" + item.id, response);
        const { data } = response;
        return data;
      })
    );
    console.log("cateOneChildrenList", cateOneChildrenList);
    this.setState({
      cateOneList: cateOneList,
      cateOneChildrenList: cateOneChildrenList,
    });
  };

  //渲染有子菜单的item
  renderPopover = ({ id, name }, index) => {
    const list = this.state.cateOneChildrenList;
    const listItem = list[index];
    const { onSearch } = this.props;
    console.log("listItem" + index, listItem);
    return (
      <Popover
        key={id}
        content={() => (
          <List
            dataSource={listItem}
            grid={{ gutter: 0, column: 3 }}
            renderItem={(item) => (
              <List.Item key={item.id} style={{width:40}}>
                <Button
                  key={item.id}
                  type="text"
                  onClick={() => onSearch(item.name)}
                >
                  {item.name}
                </Button>
              </List.Item>
            )}
            split
          />
        )}
        placement="right"
      >
        <Button type="text" block style={ButtonStyle}>
          <Text>{name}</Text>
          <Text>></Text>
        </Button>
      </Popover>
    );
  };

  render() {
    return (
      <div className="leftNav">
        {this.state.cateOneList.map((item, index) =>
          this.renderPopover(item, index)
        )}
      </div>
    );
  }
}
