import React, { useEffect, useState } from "react";
import { GetSingleDriverRes, GetSingleLoadRes } from "types";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";

import { fetchData } from "../../utils/fetchData";

export const SingleLoadView = () => {
  const { singleLoadId } = useParams();
  const authToken = useAuthHeader();
  const navigate = useNavigate();
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | undefined>(
    undefined
  );
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | undefined>(
    undefined
  );

  useEffect(() => {
    try {
      (async () => {
        const loadResUrl = `${config.apiUrl}/load/${singleLoadId}`;
        const driverResUrl = `${config.apiUrl}/driver/`;

        const loadRes = await fetchData(loadResUrl, "GET", `${authToken()}`);
        const loadResData: GetSingleLoadRes = loadRes;

        const driverRes = await fetchData(
          `${driverResUrl}${loadResData.load.driverId}`,
          "GET",
          `${authToken()}`
        );
        const driverResData: GetSingleDriverRes = driverRes;

        setLoadInfo(loadResData);
        setDriverInfo(driverResData);
      })();
    } catch (e) {
      console.log(e);
      navigate("/load");
    }
  }, []);

  if (!loadInfo) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <div className="glass views">
        <h2>{loadInfo.load.loadName}</h2>
        <p>Load Id: {loadInfo.load.id}</p>
        <p>Sender: {loadInfo.load.sender}</p>
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

//add new Load option
// @TODO take and save data to one container and find better hook: useMemo?
