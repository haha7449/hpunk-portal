import React from "react";
import "./little.less";
import { Typography } from "antd";
import { Image } from "antd";
import {Link} from "react-router-dom";

const { Text } = Typography;

export default class Little extends React.Component {

  render() {

    const {id,src,title,price} = this.props;
    const to = "/shopDetail/"+id;

    return (
      <div className="little">
        <Link to={to}>
          <div>
            <Image
              width={"100%"}
              preview={false}
              src={src}
              style={{padding:10}}
            />
          </div>
          <div className="title">
            <Text
              ellipsis={{
                rows: 2,
                tooltip: "显示完整标题",
              }}
            >
              {title}
            </Text>
          </div>
          <div className="money">
            <Text strong>￥{price}</Text>
          </div>
        </Link>
      </div>
    );
  }
}
