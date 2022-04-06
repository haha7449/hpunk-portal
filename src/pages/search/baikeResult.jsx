import React, { Component } from "react";
import "./baikeResult.less";
import HomeEssay from "../../components/essay/homeEssay"

export default class BaikeResult extends Component {
  render() {
    return (
      <div className="baike-result">
        <div className="br-select"></div>
        <div className="br-biake">
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
          <HomeEssay />
        </div>
      </div>
    );
  }
}
