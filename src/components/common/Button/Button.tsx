import React from "react";

interface Props {
  handleClick: () => void;
}

export const Button = (props: Props) => {
  return <button onClick={props.handleClick}>❌</button>;
};
