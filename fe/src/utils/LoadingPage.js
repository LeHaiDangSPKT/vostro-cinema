import React from "react";
import "../styles/index.scss";

export default function LoadingPage(props) {
  return (
    <div
      className="spinner-box"
      style={{ backgroundColor: "#1d2630", opacity: `${props.opacity || 1}` }}
    >
      <div className="blue-orbit leo"></div>

      <div className="green-orbit leo"></div>

      <div className="red-orbit leo"></div>

      <div className="white-orbit w1 leo"></div>
      <div className="white-orbit w2 leo"></div>
      <div className="white-orbit w3 leo"></div>
    </div>
  );
}
