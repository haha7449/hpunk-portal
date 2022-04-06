import { Form, Upload, message, Button, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { policy } from "../../../services/oss";
import ProCard from "@ant-design/pro-card";
import React from "react";

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    const { OSSData } = this.state;
    console.log("Aliyun OSS:", fileList);
    if (onChange) {
      if (fileList[0].status === "done") {
        fileList[0].thumbUrl = OSSData.host + "/" + fileList[0].url;
        fileList[0].url = OSSData.host + "/" + fileList[0].url;
        message.success("上传成功");
        const {changeUserIcon} = this.props;
        changeUserIcon(fileList[0].thumbUrl);
      }
      if (fileList[0].status === "error") {
        message.success("上传失败");
      }
      onChange([...fileList]);
    }
  };

  //目前还不知道如何从OSS删除
  onRemove = (file) => {
    const { value, onChange } = this.props;

    const files = value.filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  getExtraData = (file) => {
    const { OSSData } = this.state;
    //重新命名上传文件，防止文件命名冲突
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    console.log("suffix", suffix);
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + "/" + filename;

    console.log("file", file);
    return {
      key: file.url,
      dir: OSSData.dir,
      OSSAccessKeyId: OSSData.accessKeyId,
      host: OSSData.host,
      policy: OSSData.policy,
      Signature: OSSData.signature,
      success_action_status: "200", //必须这么写 不要问为什么
      // callback: OSSData.callback, 私有地址不允许callback
    };
  };

  beforeUpload = async (file) => {
    // 检查图片类型
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    const isPic = isJPG || isPNG;
    if (!isPic) {
      message.error("请上传图片");
      return;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("上传图片必须小于 5MB!");
      return;
    }
    if (isPic && isLt5M) {
      const response = await policy();
      console.log("response", response);

      this.setState({
        OSSData: {
          accessKeyId: response.data.accessKeyId,
          callback: response.data.callback,
          dir: response.data.dir,
          host: response.data.host,
          policy: response.data.policy,
          signature: response.data.signature,
        },
      });
    }
  };

  render() {
    const { value,changeUserIcon } = this.props;
    const propsUpload = {
      name: "file",
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      showUploadList: false,
    };
    return (
      <Upload {...propsUpload} listType="picture" maxCount={1}>
        <Button type="primary" icon={<UploadOutlined />}>
          上传头像
        </Button>
      </Upload>
    );
  }
}
