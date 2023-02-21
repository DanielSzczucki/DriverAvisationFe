import React, { useEffect, useState } from "react";
import {
  CreateLoadReq,
  GetSingleLoadRes,
  LoadEntity,
  SingleDriverRes,
} from "types";

import { Link, useParams } from "react-router-dom";
import { logDOM } from "@testing-library/react";

export const SingleLoadView = () => {
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);
  const [driverInfo, setDriverInfo] = useState<SingleDriverRes | null>(null);
  const { singleLoadId } = useParams();

  useEffect(() => {
    (async () => {
      const loadRes = await fetch(`http://localhost:3001/load/${singleLoadId}`);
      const loadData = await loadRes.json();

      setLoadInfo(loadData);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const driverRes = await fetch(
  //       `http://localhost:3001/driver/${loadInfo?.load.driverId}`
  //     );

  //     const driverData = await driverRes.json();

  //     console.log(driverData);

  //     setDriverInfo(driverData);
  //   })();
  // }, [loadInfo]);

  if (loadInfo === null) {
    return null;
  }

  return (
    <>
      <div className="glass views">
        <h2>{loadInfo?.load.loadName}</h2>
        <p>Load Id: {loadInfo?.load.id}</p>
        <p>Sender: {loadInfo?.load.sender}</p>
        <p>Recipient: {loadInfo?.load.recipient}</p>
        <p>Frowarder: {loadInfo?.load.forwarder}</p>
        <p>Units: {loadInfo?.load.units}</p>
        <p>Quantity: {loadInfo?.load.quantity}</p>
        <p>Weight: {loadInfo?.load.weight}</p>
        <p>
          Driver: {driverInfo?.driver.name ?? "not sign"}{" "}
          {driverInfo?.driver.lastName ?? "not sign"}
        </p>
        <p>Truck: {driverInfo?.driver.truckNumber ?? "not sign"}</p>
        <p>Trailer: {driverInfo?.driver.trailerNumber ?? "not sign"}</p>
        <p>Counted given loads: {loadInfo?.givenCount ?? "not sign"}</p>
        <p>
          <Link to="/load">Go back to list</Link>
        </p>
      </div>
    </>
  );
};

//@TODO - add delete option
//add new Load option
