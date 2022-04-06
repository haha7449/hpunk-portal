import React, { Component } from "react";
import "./x.less";
import HomeEssay from "../../components/essay/homeEssay";
import { Card, Tabs, Divider, Carousel, Typography } from "antd";
import { Menu } from "antd";

const { SubMenu } = Menu;

function handleClick(e) {
  console.log("click", e);
}

const MenuStyle = {
  width: "256px",
  height: "100%",
};

const { Link } = Typography;

const xcardLinkStyle = {
  width: "33.33%",
  height: "50%",
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
};

export default class X extends Component {
  render() {
    return (
      <div className="x">
        <div className="top">
          {/* Nav */}
          <div className="left">
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            <Menu onClick={handleClick} style={MenuStyle} mode="vertical">
              <SubMenu key="sub4" title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="middle">
            <div className="banner">
              <img />
            </div>
            <div className="xcard">
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
              <Link style={xcardLinkStyle} hoverable>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </Link>
            </div>
          </div>
          <div className="right"></div>
        </div>
        {/* down */}
        <div className="down">
          <div className="baike">
            <HomeEssay />
            <HomeEssay />
            <HomeEssay />
            <HomeEssay />
            <HomeEssay />
            <HomeEssay />
            <HomeEssay />
          </div>
          <div className="right"></div>
        </div>
      </div>
    );
  }
}
