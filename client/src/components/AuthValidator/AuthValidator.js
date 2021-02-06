import React, { Component } from "react";

class AuthValidator extends Component {
  render() {
    return <this.props.authorizedcomponent {...this.props} />;
  }
}

export default AuthValidator;
