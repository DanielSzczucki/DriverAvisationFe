//@TODO sprawdz commity i wróć do commita z przed merga.. właściwie to nie wracaj bo teraz zasysa dane z obu miejsc. sprawdż tylko songl load view

import React, { useEffect, useState } from "react";
import {
  DriverEntity,
  GetSingleDriverRes,
  GetSingleLoadRes,
  ListDriverRes,
} from "types";
import { Link, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";

import "./Views.css";

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);
  const authToken = useAuthHeader();

  useEffect(() => {
    (async () => {
      const driverRes = await fetch(
        `http://localhost:3001/driver/${singleDriverId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken()}`,
          },
        }
      );

      const driverData = await driverRes.json();

      setDriverInfo(driverData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const loadRes = await fetch(
        `http://localhost:3001/load/${driverInfo?.driver.loadId}`,
        {
          credentials: "include",
          headers: {
            "Content-type": "application/json",
            Authorization: `${authToken()}`,
          },
        }
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
        <p>Driver Id: {driverInfo?.driver.id}</p>
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
//@TODO - add math couting for pallets
