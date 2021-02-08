import React from "react";

export default function CustomButton(props) {
  return (
    <div className="button-wrapper">
      <svg height="60" width="280" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="button-wrapper__shape"
          height="60"
          width="280"
          rx="0"
        />
      </svg>
      <div className="button-wrapper__text">{props.text}</div>
    </div>
  );
}
