import React, { Component } from "react";
import "./essayMain.less";
import { Typography, Button, Divider, Tag, Tabs, Card } from "antd";
import { Comment, Tooltip, List } from "antd";
import { Avatar, Form, Input } from "antd";
import { HeartOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import moment from "moment";

const { TabPane } = Tabs;
const { Text, Title, Link } = Typography;
const { TextArea } = Input;

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const operations = <Button type="primary">查看更多商品</Button>;

const rightEssay = (
  <div style={{marginBottom:"10px"}}>
    <Link>题目：发表观点是绿色办公的人那天</Link>
    <Text style={{fontSize:"10px"}}>时间</Text>
  </div>
);

export default class EssayMain extends Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <div className="essay-main">
        <div className="em-container">
          <div className="em-header">
            <div className="em-title">
              <Title level={2}>
                社区生鲜品牌「康品汇」完成近亿元B+轮融资，差异化选品发力小程序及抖音渠道
              </Title>
            </div>
            <div className="em-sub">
              <Link style={{ marginRight: "10px" }}>作者</Link>
              <Text style={{ marginRight: "10px" }}>时间</Text>
              <Button type="primary">关注</Button>
            </div>
          </div>
          <div className="em-intro">
            <Text type="secondary">社区生鲜能否乘上电商直播新风？</Text>
            <Divider />
          </div>
          <div className="em-content">
            36氪获悉，社区生鲜品牌「康品汇」已完成近1亿元B+轮融资。本轮由香港SBI集团领投，棋盘资本、严明、陶云等老股东跟投。
            康品汇2010年成立于上海，旗下主力店型为300㎡社区生鲜店，此外还探索生鲜盒子、康品汇集市等多种店型，目前在运营50余家门店。除线下生鲜门店外，康品汇还发力“康品优选”微信小程序，通过差异化选品销售生鲜食材。
            本轮融资是继高榕资本投资之后，康品汇收获的新一轮融资，此外老股东还包括龙珠资本、竞技创投等。康品汇管理团队去年有过调整，彼时36氪曾报道，原相宜本草总裁严明加盟康品汇任职董事长。
            对于康品汇接下来的发展思路，严明告诉36氪，2021年康品汇品牌定位正式升级为“您身边的食材专家”，将聚焦于差异化好食材的开发和会员的服务体验升级。在严明看来，生鲜并不仅仅是靠低价取胜，还有效率、体验等综合维度，康品汇一方面希望弱化原有开店模式，探索微信生态、抖音直播等线上新流量开发，同时在保证新鲜品质基础上，加强生鲜产品的营养和交付体验。
            据悉，通过线上渠道的探索投入，康品汇已经在上海社区生鲜店的基础上，扩宽生鲜服务半径至江浙沪地区。今年春节期间，康品汇还尝试推出年夜饭服务。据严明介绍，康品汇接下来将采用”线上微信生态/抖音电商+线下社区生鲜店”并行发展路线。
          </div>
          <div className="em-tags">
            <Tag color="blue">blue</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="blue">blue</Tag>
          </div>
          <div className="em-operate">
            <Button
              style={{ marginRight: "10px" }}
              size="large"
              shape="circle"
              type="primary"
              icon={<HeartOutlined />}
            ></Button>
            <Button
              size="large"
              shape="circle"
              type="primary"
              icon={<StarOutlined />}
            ></Button>
          </div>
          <div className="em-rela-goods">
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="相关商品" key="1">
                Content of tab 1
              </TabPane>
            </Tabs>
          </div>
          <div className="em-comments">
            <div className="em-coms">
              <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <li>
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
            </div>
            <div className="em-add-com">
              <>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
              </>
            </div>
          </div>
        </div>
        <div className="em-author">
          <div className="ema-header">
            <div className="ema-header-top">
              <div className="ema-avatar">
                <Avatar shape="square" size={72} icon={<UserOutlined />} />
              </div>
              <div className="ema-name">
                <Title level={4} style={{ margin: 0 }}>
                  小明
                </Title>
                <div>
                  <Tag color="blue">养生专家</Tag>
                </div>
                <Text>文章数：80</Text>
              </div>
            </div>
            <div className="ema-intro">
              <Text>简介：西奥菲啊的撒范德萨发上的是法国达改变你对给</Text>
            </div>
            <div className="ema-sub">
              <Button type="primary" block>
                关注
              </Button>
            </div>
          </div>
          <Divider />
          <div className="ema-lately">
            <Card type="inner" title="最近文章" extra={<a href="#">更多</a>}>
              <div className="ema-lately-essay">
                  {rightEssay}
                  {rightEssay}
                  {rightEssay}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
