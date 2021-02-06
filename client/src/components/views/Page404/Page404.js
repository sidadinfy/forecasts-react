import React from "react";
import { Helmet } from "react-helmet";

class Page404 extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>404</title>
        </Helmet>
        <div>404 PAGE NOT FOUND</div>
      </>
    );
  }
}
export default Page404;
