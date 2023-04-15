import React, { FormEvent, useEffect, useState } from "react";
import {
  CreateDriverReq,
  CreateLoadReq,
  DriverEntity,
  GetSingleDriverRes,
  GetSingleLoadRes,
} from "types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { fetchData } from "../../utils/fetchData";
import { ErrorView } from "./ErrorView";

import "./Views.css";
import { Popup } from "../common/Popup/Popup";

interface GetLoadResStatus {
  load: CreateLoadReq;
  givenCount: number;
}

interface GetDriverResStatus {
  message: string;
  driverRouter: string;
  driver: DriverEntity;
}

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const authToken = useAuthHeader();
  const navigate = useNavigate();

  const [driverInfo, setDriverInfo] = useState<DriverEntity | undefined>(
    undefined
  );
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | undefined>(
    undefined
  );

  const [resultInfo, setResultInfo] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<CreateDriverReq>({
    name: "",
    lastName: "",
    companyName: "",
    phoneNumber: 0,
    referenceNumber: "",
    truckNumber: "",
    trailerNumber: "",
    loadingUnloading: "",
    loadId: "",
  });

  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const getDataForDriver = async () => {
    try {
      //api endpoints
      const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;
      const loadResUrl = `${config.apiUrl}/load/`;

      //take driver data
      const driverRes = await fetchData(driverResUrl, "GET", authToken());
      const driverResData: GetDriverResStatus = await driverRes;

      //set load id from driver
      const loadId = driverRes.driver.loadId;

      setDriverInfo(driverResData.driver);

      setForm({ ...driverResData.driver });

      //take all loads

      //if load id exist take load data for driver
      if (loadId) {
        const loadRes = await fetchData(
          `${loadResUrl}${loadId}`,
          "GET",
          authToken()
        );

        //set load for driver
        const loadForDriver: GetSingleLoadRes = await loadRes;
        setLoadInfo(loadForDriver);
      }
    } catch (e) {
      setIsPopupVisible(true);
      <Popup
        isVisible={true}
        message={"Something went wrong :("}
        onClose={() => setIsPopupVisible(false)}
      />;
    }
  };

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
    setIsFormChanged(true);
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const driverUpdateRes = fetchData(
        `${config.apiUrl}/driver/${singleDriverId}`,
        "PUT",
        authToken(),
        form
      );

      const updatedDriver: GetDriverResStatus = await driverUpdateRes;
      console.log(updatedDriver);
      setResultInfo(`${updatedDriver.message}`);

      setIsPopupVisible(true);
      //reset form button status
      setIsFormChanged(false);
      //reload driver form data
      getDataForDriver();
    } catch (e) {
      setTimeout(() => {
        navigate("/driver");
      }, 4000);
    }
    return <ErrorView />;
  };

  useEffect(() => {
    getDataForDriver();
  }, []);

  if (!driverInfo) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <Popup
        isVisible={isPopupVisible}
        message={resultInfo}
        onClose={() => setIsPopupVisible(false)}
      />

      <main className="hide-scrollbar">
        <header className="Header">
          <h2>Driver info & edit form</h2>
        </header>

        <form className="box-size glass addForm" onSubmit={sendForm}>
          <p>
            Driver:{" "}
            <span>
              {driverInfo?.name} {driverInfo?.lastName}
            </span>
          </p>

          <p>
            Driver Id: <span>{driverInfo.id}</span>
          </p>
          <p>
            Load Name: <span>{loadInfo?.load.loadName}</span>
          </p>
          <p>
            Counted given loads: <span>{loadInfo?.givenCount}</span>
          </p>
          <label>
            Reference number:
            <input
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
            />
          </label>
          <label>
            Company name:
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
            />
          </label>
          <label>
            Phone number:
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => updateForm("phoneNumber", e.target.value)}
            />
          </label>
          <label>
            Truck number:
            <input
              type="text"
              value={form.truckNumber}
              onChange={(e) => updateForm("truckNumber", e.target.value)}
            />
          </label>
          <label>
            Trailer number:
            <input
              type="text"
              value={form.trailerNumber}
              onChange={(e) => updateForm("trailerNumber", e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <p>
            <Link to="/driver">Go back to list</Link>
          </p>
        </form>
      </main>
    </>
  );
};

//@TODO - add select with ref
//add math couting for pallets
////add new Load option, allow to load component without load info
