import React from "react";

import { LoadEntity } from "types";

interface Props {
  load: LoadEntity;
  onLoadChange: () => void;
}

export const LoadTableRow = (props: Props) => {
  return (
    <>
      <tr>
        <td>{props.load.loadName}</td>
        <td>{props.load.referenceNumber}</td>
        <td>{props.load.sender}</td>
        <td>{props.load.recipient}</td>
        <td>{props.load.units}</td>
        <td>{props.load.quantity}</td>
        <td>{props.load.weight}</td>
      </tr>
    </>
  );
};
