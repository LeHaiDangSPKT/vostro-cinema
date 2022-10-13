import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader(props) {
  const override = {
    margin: "auto",
  };
  const styleLoader = {
    zIndex: 5,
    width: "100%",
    height: "100%",
    background: "white",
  };
  return (
    <div style={styleLoader} className="text-center">
      <ClipLoader loading={props.state} cssOverride={override} size={150} />
      <div>Bạn chờ chút nhé...</div>
    </div>
  );
}
