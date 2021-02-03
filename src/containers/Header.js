import React from "react";
import { NavLink } from "react-router-dom";
import { linkMaintain, linkMasterSKU } from "../routes";
class Header extends React.Component {
  render() {
    console.log("router", this.props.location);
    return (
      <nav className="navbar">
        <NavLink
          to={linkMaintain}
          className={
            this.props.location.pathname === linkMaintain
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          Maintain
        </NavLink>
        <NavLink
          to={linkMasterSKU}
          className={
            this.props.location.pathname === linkMasterSKU
              ? "nav-link make-active"
              : "nav-link"
          }
        >
          MasterSKU
        </NavLink>
      </nav>
    );
  }
}

export default Header;
