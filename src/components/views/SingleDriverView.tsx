import React, { FormEvent, useEffect, useState } from "react";
import { CreateDriverReq, GetSingleDriverRes, GetSingleLoadRes } from "types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { fetchData } from "../../utils/fetchData";
import { ErrorView } from "./ErrorView";

import "./Views.css";
import { Popup } from "../common/Popup/Popup";

interface GetDriverResStatus {
  message: string;
  driver: CreateDriverReq;
}

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const authToken = useAuthHeader();
  const navigate = useNavigate();
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);
  const [resultInfo, setResultInfo] = useState<string>();
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

  useEffect(() => {
    const getDataForDriver = async () => {
      try {
        const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;
        const loadResUrl = `${config.apiUrl}/load/`;

        const driverRes = fetchData(driverResUrl, "GET", authToken());
        const driverResData: GetDriverResStatus = await driverRes;

        const loadRes = fetchData(
          `${loadResUrl}${driverResData.driver.loadId}`,
          "GET",
          authToken()
        );

        const loadForDriver: GetSingleLoadRes = await loadRes;

        setDriverInfo(driverResData);
        setForm({ ...driverResData.driver });
        setResultInfo(driverResData.message);
        setLoadInfo(loadForDriver);
      } catch (e) {
        setIsPopupVisible(true);
        <Popup
          isVisible={true}
          message={"Cant fetch load data"}
          onClose={() => setIsPopupVisible(false)}
        />;
      }
    };

    getDataForDriver();
  }, []);

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

      const updatedDriver = await driverUpdateRes;
      console.log(updatedDriver);

      setResultInfo(`${updatedDriver.message}`);
      setIsPopupVisible(true);
    } catch (e) {
      setIsPopupVisible(true);

      setTimeout(() => {
        navigate("/driver");
      }, 4000);
    }
  };

  if (!driverInfo) {
    return <SpinnerLoading />;
  }

  return (
    <>
      {isPopupVisible ? (
        <Popup
          isVisible={isPopupVisible}
          message={resultInfo}
          onClose={() => setIsPopupVisible(false)}
        />
      ) : (
        <main className="hide-scrollbar">
          <header className="Header">
            <h2>Driver info & edit form</h2>
          </header>

          <form className="box-size glass addForm" onSubmit={sendForm}>
            <p>
              Driver:{""}
              <span>
                {driverInfo?.driver.name} {driverInfo?.driver.lastName}
              </span>
            </p>

            <p>
              Driver Id: <span>{driverInfo.driver.id}</span>
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
      )}
    </>
  );
};

//add new Load option
//@TODO - add math couting for pallets
