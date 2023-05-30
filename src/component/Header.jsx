import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FeedIcon from "@mui/icons-material/Feed";
import "./style.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="header">
      <div className="logo-container">
        <a href="#">
          Educator
          <ArrowDropDownIcon className="iconStyle" />
        </a>
      </div>
      <div className="logo-nav">
        <div>
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="hover-underline-animation">
                <GridViewIcon className="iconStyle1" />
                Planning{" "}
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="hover-underline-animation">
                <NoteAltIcon className="iconStyle1" /> Documentation
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="hover-underline-animation">
                <FeedIcon className="iconStyle1" />
                Housekeeping
              </a>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <div className="search-box">
                <input
                  className="search-txt"
                  type="text"
                  name=""
                  placeholder="Type to Search"
                />
                <a className="search-btn" href="#">
                  <SearchIcon />
                </a>
              </div>
              <div>
                {" "}
                <NotificationsIcon />
              </div>
              <div>
                <Stack direction="row" spacing={2}>
                  <Avatar src="/broken-image.jpg" />
                </Stack>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ul className="signin-up">
        <li className="sign-in rightNav" onClick={closeMobileMenu}>
          <div className="search-box">
            <input
              className="search-txt"
              type="text"
              name=""
              placeholder="Type to Search"
            />
            <a className="search-btn" href="#">
              <SearchIcon />
            </a>
          </div>
          <div style={{ margin: "5px 9px" }}>
            {" "}
            <NotificationsIcon />
          </div>
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar src="/broken-image.jpg" />
            </Stack>
          </div>
        </li>
      </ul>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Header;