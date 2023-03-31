import React from "react";
import { Link } from "react-router-dom";

import { LoadEntity } from "types";
import { Button } from "../common/Button/Button";

interface Props {
  load: LoadEntity;
  onLoadChange: () => void;
  onDelete: (id: string | undefined) => Promise<void>;
}

export const LoadTableRow = (props: Props) => {
  return (
    <>
      <tr>
        <td>
          <Link to={`/load/${props.load.id}`}>{props.load.loadName}</Link>
        </td>
        <td>{props.load.referenceNumber}</td>
        <td>{props.load.sender}</td>
        <td>{props.load.recipient}</td>
        <td>{props.load.units}</td>
        <td>{props.load.quantity}</td>
        <td>{props.load.weight}</td>
        <td>
          <Button handleClick={() => props.onDelete(props.load.id)}></Button>
        </td>
      </tr>
    </>
  );
};
