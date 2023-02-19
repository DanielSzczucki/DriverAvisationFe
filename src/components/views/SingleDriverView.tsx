import React, { useEffect, useState } from "react";
import { GetSingleLoadRes, ListDriverRes, SingleDriverRes } from "types";

import { Link, useParams } from "react-router-dom";

import "./Views.css";

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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const loadRes = await fetch(
        `http://localhost:3001/load/${driverInfo?.driver.loadId}`
      );
      const loadData = await loadRes.json();
      setLoadInfo(loadData);
    })();
  }, [driverInfo]);

  if (driverInfo === null) {
    return null;
  }

  return (
    <>
      <div className="glass views">
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
        <p>Load Name: {loadInfo?.load.loadName ?? "not sign"}</p>
        <p>Counted given loads: {loadInfo?.givenCount ?? "not sign"}</p>
        <p>
          <Link to="/driver">Go back to list</Link>
        </p>
      </div>
    </>
  );
};

//@TODO - add delete option
//add new Load option
