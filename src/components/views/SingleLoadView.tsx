import React, { useEffect, useState } from "react";
import { DriverEntity, GetSingleDriverRes, GetSingleLoadRes } from "types";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { Link, useParams } from "react-router-dom";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { ErrorView } from "./ErrorView";

export const SingleLoadView = () => {
  const { singleLoadId } = useParams();
  const authToken = useAuthHeader();
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const loadResUrl = `${config.apiUrl}/load/${singleLoadId}`;
        const driverResUrl = `${config.apiUrl}/driver/`;

        const loadRes = await fetch(loadResUrl, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken()}`,
          },
        });

        const loadResData: GetSingleLoadRes = await loadRes.json();
        setLoadInfo(loadResData);

        if (loadResData.load.driverId) {
          const driverRes = await fetch(
            `${driverResUrl}${loadResData.load.driverId}}`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${authToken()}`,
              },
            }
          );

          const driverResData: GetSingleDriverRes = await driverRes.json();
          setDriverInfo(driverResData);
        } else {
          return null;
        }

        setIsLoading(false);
      })();
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError(true);
    }
  }, [singleLoadId]);

  if (!loadInfo) {
    return <SpinnerLoading />;
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
          Driver: {driverInfo?.driver.name ?? "not sign"}
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
// @TODO take and save data to one container and find better hook: useMemo?
