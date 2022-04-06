import React, { Component } from "react";
import "./authorResult.less";
import { Button, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthorResultItem from "../../components/user/authorResultItem";



export default class AuthorResult extends Component {
  render() {
    return (
      <div className="author-result">
        <div className="ar-select"></div>
        <div className="ar-author">
          <AuthorResultItem />
          <AuthorResultItem />
          <AuthorResultItem />
          <AuthorResultItem />
        </div>
      </div>
    );
  }
}
