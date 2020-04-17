import React from "react";
import CodeSandboxLogo from "../static/CodeSandboxLogo@4.png";
import TwitterLogo from "../static/TwitterLogo@4.png";
import GitHubLogo from "../static/GitHubLogo@4.png";

const BottomIcons = (props) => (
  <div className="social-icons-wrapper">
    <a href="https://twitter.com/guandjoy">
      <div className="social-icon-wrapper">
        <img
          className="social-icon"
          src={TwitterLogo}
          alt="Twitter logo"
          width="20px"
        />
      </div>
    </a>
    <a href="https://codesandbox.io/s/github/guandjoy/neumorphic-player">
      <div className="social-icon-wrapper">
        <img
          className="social-icon"
          src={CodeSandboxLogo}
          alt="CodeSandbox logo"
          width="20px"
        />
      </div>
    </a>
    <a href="https://github.com/guandjoy/neumorphic-player">
      <div className="social-icon-wrapper">
        <img
          className="social-icon"
          src={GitHubLogo}
          alt="GitHub logo"
          width="20px"
        />
      </div>
    </a>
  </div>
);

export default BottomIcons;
