import React from "react";

export default function Box(props) {
  const { position, value } = props;
  return (
    <div
      className="box"
      onClick={() => props.onBoxClick(position, value)}
      style={{ color: value === "X" ? "red" : "green" }}
    >
      {value || ""}
      <span
        style={{
          top: "5px",
          left: "5px",
          fontSize: "5px"
        }}
      >
        {position}
      </span>
    </div>
  );
}
//this component renders the small boxes.
// 9 boxes iteratively and stores the value and throws out position,value upon mouse click
