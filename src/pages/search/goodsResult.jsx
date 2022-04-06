import React, { Component } from "react";
import "./goodsResult.less";

import Large from "../../components/goods/large";

export default class GoodsResult extends Component {
  render() {
    return (
      <div className="goods-result">
        <div className="gr-select"></div>
        <div className="gr-goods">
          <Large />
          <Large />
          <Large />
          <Large />
          <Large />
          <Large />
          <Large />
          <Large />
          <Large />
        </div>
      </div>
    );
  }
}
