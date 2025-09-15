import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";


const Deznav = ({ user }) => {
  const location = useLocation();
  const isActivePath = (path) => location.pathname === path;

 
  return (
    <div className="deznav">
      <div className="deznav-scroll">
        <div className="main-profile">
          <div className="image-bx">
            <img src={user?.image}  alt="profile" />
            <a href="#!">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </a>
          </div>
          <h5 className="name">
            <span className="font-w400">Hello,</span> {user?.givenName}
          </h5>
          <p className="email">
          <span>
              {user?.email || "User"}
            </span>
          </p>
        </div>

        <ul className="metismenu" id="menu">
          <li className="nav-label first">Main Menu</li>
          <li className={isActivePath("/dashboard") ? "mm-active" : ""}>
            <NavLink
              to="/dashboard"
              className="ai-icon"
            >
              <i className="flaticon-144-layout"></i>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>
          <li className={isActivePath("/cameraStream") ? "mm-active" : ""}>
            <NavLink
              to="/cameraStream"
              className="ai-icon"
            >
              <i className="flaticon-381-photo-camera-1"></i>
              <span className="nav-text">Camera Stream</span>
            </NavLink>
          </li>
          <li className={isActivePath("/reports") ? "mm-active" : ""}>
            <NavLink
              to="/reports"
              className="ai-icon"
            >
              <i className="flaticon-061-puzzle"></i>
              <span className="nav-text">Reports</span>
            </NavLink>
          </li>
          <li className={isActivePath("/profile") ? "mm-active" : ""}>
            <NavLink
              to="/profile"
              className="ai-icon"
            >
              <i className="flaticon-028-user-1"></i>
              <span className="nav-text">Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Deznav;
