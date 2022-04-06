import React, { Component } from "react";
import "./homeEssay.less";
import { Image, Avatar, Tag } from "antd";
import { Typography } from "antd";

const { Title, Text, Link } = Typography;
export default class HomeEssay extends Component {
  render() {
    return (
      <div className="home-essay">
        <div className="home-essay-img">
          <Image
            width={200}
            height={150}
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="home-essay-right">
          <div className="home-essay-title">
            <Link>
              <Title level={3}>
                TitleTitleTitleTitleTiTiTitleTittlesdfsadf
              </Title>
            </Link>
          </div>
          <div className="home-essay-intro">
            IntroductionIntroductionIntroductionIntroductionIntroductionIntroductionIntroduction
          </div>
          <div className="home-essay-tags">
            <Tag color="blue">
              <a href="java">养生</a>
            </Tag>
            <Tag color="blue">
              <a href="java">养生</a>
            </Tag>
            <Tag color="blue">
              <a href="java">养生</a>
            </Tag>
          </div>
          <div className="home-essay-author">
            <Link>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Text>name</Text>
            </Link>
            <Text className="home-essay-time">29分钟前</Text>
          </div>
        </div>
      </div>
    );
  }
}
