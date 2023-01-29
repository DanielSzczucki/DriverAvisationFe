import React, { useEffect, useState } from "react";
import { GetSingleLoadRes, ListDriverRes, SingleDriverRes } from "types";

import { Link, useParams } from "react-router-dom";

export const SingleDriverView = () => {
  const [driverInfo, setDriverInfo] = useState<SingleDriverRes | null>(null);

  const { singleDriverId } = useParams();

  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);

  useEffect(() => {
    (async () => {
      const driverRes = await fetch(
        `http://localhost:3001/driver/${singleDriverId}`
      );
      const driverData = await driverRes.json();
      setDriverInfo(driverData);

      const loadRes = await fetch(
        `http://localhost:3001/load/${driverInfo?.driver.loadId}`
      );
      const loadData = await loadRes.json();
      setLoadInfo(loadData);
    })();
  }, []);

  if (driverInfo === null) {
    return null;
  }

  return (
    <>
      <h2>{driverInfo?.driver.name}</h2>
      <p>
        Driver: {driverInfo?.driver.name} {driverInfo?.driver.lastName}
      </p>
      <p>Driver Id: {driverInfo?.driver.loadId}</p>
      <p>Ref: {driverInfo?.driver.referenceNumber}</p>
      <p>Company: {driverInfo.driver.companyName}</p>
      <p>Phone: {driverInfo?.driver.phoneNumber}</p>
      <p>Truck: {driverInfo?.driver.truckNumber}</p>
      <p>Trailer: {driverInfo?.driver.trailerNumber}</p>
      <p>Load Name: {loadInfo?.load.loadName}</p>
      <p>Counted given loads: {loadInfo?.givenCount}</p>
      <p>
        <Link to="/driver">Go back to list</Link>
      </p>
    </>
  );
};

//@TODO - add delete option
//add new Load option
