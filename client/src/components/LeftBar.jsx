import React from "react";
import LeftBarItem from "./LeftBarItem";

function LeftBar({ chapters }) {
  return (
    <div className="left-bar">
      <div
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/");
        }}
      >
        <div className="left-bar-title">
          <h2>
            <img
              src="https://64.media.tumblr.com/8f30ec0fc528dc3232e0de3586845f40/d89f20310830b308-8b/s1280x1920/2e57d6f2f17aff8f80a37567fa5891b01ad576f3.png"
              alt="e"
            />
            <div className="titlePoint"></div>MORALES' DEV
            <div className="titlePoint">:</div>LOG
          </h2>
        </div>
      </div>
      {Object.entries(chapters).map((entry) => (
        <LeftBarItem key={entry[0]} imageName={entry[0]} text={entry[1]} />
      ))}
    </div>
  );
}

export default LeftBar;
