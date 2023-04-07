import { Link } from "react-router-dom";
import { DriverEntity, LoadEntity } from "types";
import { Button } from "../common/Button/Button";

import "./Table.css";
import { SmsDockNotification } from "../SmsDockNotification/SmsDockNotification";

interface Props {
  driver: DriverEntity;
  loadsList: LoadEntity[];
  onDelete: (id: string | undefined) => Promise<void>;
  onDockSend: (
    id: string | undefined,
    dock: number | undefined
  ) => Promise<void>;
}

export const DriverTableRow = (props: Props) => {
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
        {/* <td>{props.driver.trailerNumber}</td> */}
        {/* <td>{props.driver.loadingUnloading}</td> */}
        <td>{props.driver.loadId}</td>
        <td>
          <SmsDockNotification
            onDockSend={props.onDockSend}
            driverId={props.driver.id}
          />
        </td>
        <td>
          <Button
            buttonValue="❌"
            handleClick={() => props.onDelete(props.driver.id)}
          ></Button>
        </td>
      </tr>
    </>
  );
};
