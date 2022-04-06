import React from "react";
import { Typography, Space } from "antd";
import "./homeLogistics.less"

const { Text, Link } = Typography;

export default class HomeLogistics extends React.Component {
  render() {
    return (
      <ul className="homeLogistics">
        <li>
          <Text strong>2</Text>
          <Link href="javscript:" target="_blank">
            待收货
          </Link>
        </li>
        <li>
          <Text strong>1</Text>
          <Link href="javscript:" target="_blank">
            待发货
          </Link>
        </li>
        <li>
          <Text strong>1</Text>
          <Link href="javscript:" target="_blank">
            待付款
          </Link>
        </li>
        <li>
          <Text strong>1</Text>
          <Link href="javscript:" target="_blank">
            待评价
          </Link>
        </li>
      </ul>
    );
  }
}
