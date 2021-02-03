import React from "react";
import { NavLink } from "react-router-dom";
import { linkMaintain, linkMasterSKU } from "../routes";
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">
        <NavLink to={linkMaintain} className="nav-link">
          Maintain
        </NavLink>
        <NavLink to={linkMasterSKU} className="nav-link">
          Master SKU
        </NavLink>
      </nav>
    );
  }
}

export default Header;
