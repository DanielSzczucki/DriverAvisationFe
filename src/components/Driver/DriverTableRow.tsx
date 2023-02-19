import React from "react";
import { Link } from "react-router-dom";
import { DriverEntity, LoadEntity } from "types";

import "./Table.css";

interface Props {
  driver: DriverEntity;
  loadsList: LoadEntity[];
}

export const DriverTableRow = (props: Props) => {
  return (
    <>
      <tr>
        <td>
          <Link to={`/driver/${props.driver.id}`}>{props.driver.name}</Link>
        </td>
        <td>{props.driver.referenceNumber}</td>
        <td>Company</td>
        <td>{props.driver.name}</td>
        <td>{props.driver.lastName}</td>
        <td>{props.driver.truckNumber}</td>
        <td>{props.driver.trailerNumber}</td>
        <td>{props.driver.loadingUnloading}</td>
        <td>{props.driver.loadId}</td>
      </tr>
    </>
  );
};
