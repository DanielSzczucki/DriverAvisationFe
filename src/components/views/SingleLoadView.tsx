import React, { useEffect, useState } from "react";
import { GetSingleLoadRes, SingleDriverRes } from "types";

import { Link, useParams } from "react-router-dom";

export const SingleLoadView = () => {
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);

  const { singleLoadId } = useParams();

  const [driverInfo, setDriverInfo] = useState<SingleDriverRes | null>(null);

  useEffect(() => {
    (async () => {
      const loadRes = await fetch(`http://localhost:3001/load/${singleLoadId}`);
      const loadData = await loadRes.json();
      setLoadInfo(loadData);

      const driverRes = await fetch(
        `http://localhost:3001/driver/ef273244-9fbe-11ed-be26-b00d2ebe2fb0`
      );
      const driverData = await driverRes.json();

      setDriverInfo(driverData);
    })();
  }, []);

  if (loadInfo === null) {
    return null;
  }

  return (
    <>
      <h2>{loadInfo.load.loadName}</h2>
      <p>Load Id: {loadInfo.load.id}</p>
      <p>Sender: {loadInfo.load.sender}</p>
      <p>Recipient: {loadInfo.load.recipient}</p>
      <p>Units: {loadInfo.load.units}</p>
      <p>Quantity: {loadInfo.load.quantity}</p>
      <p>Weight: {loadInfo.load.weight}</p>
      <p>
        Driver: {driverInfo?.driver.name} {driverInfo?.driver.lastName}
      </p>
      <p>Truck: {driverInfo?.driver.truckNumber}</p>
      <p>Trailer: {driverInfo?.driver.trailerNumber}</p>
      <p>Counted given loads: {loadInfo.givenCount}</p>
      <p>
        <Link to="/load">Go back to list</Link>
      </p>
    </>
  );
};

//@TODO - add delete option
//add new Load option
