import React from "react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(255,255,255,0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const Preloader = () => {
  return (
    <div id="preloader" style={overlayStyle}>
      <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    </div>
  );
};

export default Preloader;
