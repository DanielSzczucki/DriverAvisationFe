import { Link } from "react-router-dom";
import { DriverEntity, LoadEntity } from "types";

import "./Table.css";
import { Button } from "../common/Button/Button";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";

interface Props {
  driver: DriverEntity;
  loadsList: LoadEntity[];
  onDelete: (id: string) => void;
}

export const DriverTableRow = (props: Props) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleDelete = async () => {
    if (selectedId !== undefined) {
      props.onDelete(selectedId);
      setSelectedId(undefined);
      const driverRes = await fetch(`${config.apiUrl}/driver/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedDriverRes = await driverRes.json();
      console.log(deletedDriverRes);
    }
  };

  console.log("SELECTEDID", selectedId);
  console.log("DRIVERID", props.driver.id);

  return (
    <>
      <tr>
        <td>
          <Link to={`/driver/${props.driver.id}`}>{props.driver.name}</Link>
        </td>
        {/* <td>{props.driver.lastName}</td> */}
        <td>{props.driver.referenceNumber}</td>
        {/* <td>{props.driver.companyName}</td> */}
        <td>{props.driver.truckNumber}</td>
        <td>{props.driver.trailerNumber}</td>
        {/* <td>{props.driver.loadingUnloading}</td> */}
        <td>{props.driver.loadId}</td>
        <Button handleClick={() => setSelectedId(props.driver.id)}></Button>
      </tr>
    </>
  );
};
