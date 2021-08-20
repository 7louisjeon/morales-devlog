import React from "react";
import { NavLink } from "react-router-dom";
import images from "../images/images";

function LeftBarItem({ imageName, text }) {
  return (
    <NavLink to={"/" + imageName}>
      <div className="left-bar-item">
        <div className="left-bar-item-inner">
          <img src={images[imageName]} alt={text} />
          <h4>{text}</h4>
        </div>
      </div>
    </NavLink>
  );
}

export default LeftBarItem;
