import React from "react";
import "./Button.css";

interface Props {
  buttonValue: string;
  handleClick: () => Promise<void>;
  onClick?: () => void;
}

export const Button = (props: Props) => {
  return (
    <button className="BtnDelete" onClick={props.handleClick}>
      {props.buttonValue}
    </button>
  );
};
