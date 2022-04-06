import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Input, Modal, Rate, Typography } from "antd";
import { getComment, addComment } from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import storageUtils from "../../../utils/storageUtils";

const { Text } = Typography;
const CommentFormContent = (props) => {
  const [commentContent, setCommentContent] = useState({});
  const [form] = Form.useForm();
  const [status, setStatus] = useState(false); //是否已经请求过评论
  const actionRef = useRef();

  const {
    modalVisible,
    onCancel,
    orderItem,
    comment,
    getComment,
    submitComment,
  } = props;

  useEffect(async () => {
    if (!status) {
      if (orderItem.isComment === 1) {
        console.log("过来了");
        const { id: orderItemId } = orderItem;
        await getComment({ orderItemId });
        setStatus(true);
      }
    } else {
      setCommentContent(comment);
    }
  }, [comment]);

  const onFinish = async (value) => {
    const user = storageUtils.getUser();
    console.log(value);
    const { star, content } = value;
    const {
      id: orderItemId,
      productId,
      productName,
      productAttr: productAttribute,
    } = orderItem;
    const { id: memberId, nickName: memberNickName, icon: memberIcon } = user;
    const newComment = {
      productId,
      memberId,
      orderItemId,
      memberNickName,
      productName,
      star,
      productAttribute,
      content,
      memberIcon,
    };
    console.log("newComment", newComment);
    submitComment(newComment);
  };

  return (
    <Modal
      destroyOnClose
      title="商品评价"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          {orderItem.isComment === 1 ? null : (
            <Button
              onClick={() => form?.submit()}
              type="primary"
              style={{ marginRight: 8 }}
            >
              提交
            </Button>
          )}
          <Button onClick={() => onCancel()}>取消</Button>
        </div>
      }
    >
      {commentContent && Object.keys(commentContent).length ? (
        <>
          <Form.Item label="名称">
            <Text strong>{orderItem.productName}</Text>
          </Form.Item>
          <Form.Item name="star" label="评分">
            <Rate defaultValue={commentContent.star} disabled />
          </Form.Item>
          <Form.Item name="content" label="评价">
            <Text>{commentContent.content}</Text>
          </Form.Item>
          <Text>
            时间：
            {moment(commentContent.createTime).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </>
      ) : (
        <Form
          form={form}
          name="commentForm"
          onFinish={onFinish}
          hideRequiredMark
        >
          <Form.Item label="名称">
            <Text strong>{orderItem.productName}</Text>
          </Form.Item>
          <Form.Item name="star" label="评分" required>
            <Rate />
          </Form.Item>
          <Form.Item name="content" label="评价" required>
            <Input.TextArea />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    comment: state.getCommentReducer.comment,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getComment, addComment }, dispatch);
}

const CommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormContent);
export default CommentForm;
