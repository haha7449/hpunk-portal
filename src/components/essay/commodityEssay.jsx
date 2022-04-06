import React, { Component } from "react";
import "./commodityEssay.less";
import { Image, Avatar, Tag } from "antd";
import { Typography,Tabs  } from "antd";

const { Title, Text, Link } = Typography;

export default class CommodityEssay extends Component {
  render() {
    return (
      <div className="c-essay">
        <div className="c-essay-img">
          <Image
            width={116}
            height={87}
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="c-essay-right">
          <div className="c-essay-title">
            <Link>
              <Title level={3} style={{width:"100%"}} ellipsis={{ rows: 1 }}>
                TitleTitleTitleTitleTiTiTitleTittlesdfsadf
              </Title>
            </Link>
          </div>
          <div className="c-essay-author">
            <Link>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Text>name</Text>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
