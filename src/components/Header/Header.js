import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { useAuth } from "../Login/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  // console.log(auth.user);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link style={{ textDecoration: "none", color: "white" }} to="/shop">
          Shop
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to="/review">
          Order Review
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to="/manage">
          Manage Inventory
        </Link>
        {auth.user && (
          <span style={{ color: "yellow" }}>Welcome {auth.user.name}</span>
        )}
        {auth.user ? (
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            Sign Out
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            Sign In
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
