import React from "react";
import "./Button.css";

interface Props {
  handleClick: () => Promise<void>;
}

export const Button = (props: Props) => {
  return (
    <button className="BtnDelete" onClick={props.handleClick}>
      ❌
    </button>
  );
};
