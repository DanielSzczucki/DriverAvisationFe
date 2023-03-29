import React, { FormEvent, useState } from "react";
import { CreateDriverReq, DriverEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { config } from "../../utils/config";

import "./AddDriver.css";
import { redirect, useNavigate } from "react-router-dom";
import { Popup } from "../common/Popup/Popup";
import { ErrorView } from "../views/ErrorView";

export const AddDriver = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

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

  const [loading, setLoading] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string | null>(null);

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);

      const res = await fetch(`${config.apiUrl}/driver`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: DriverEntity = await res.json();
      setLoading(false);
      setResultInfo(`${data.name} added with ref: ${data.referenceNumber}`);
      console.log(data);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } finally {
      setLoading(false);
      setError(true);
    }
  };

  // switch (true) {
  //   case loading:
  //     return <SpinnerLoading />;
  //   case resultInfo !== null:
  //     return (
  //       <>
  //         <div className="good-box">
  //           <p>{resultInfo}</p>
  //           <p>Thank you. Please wait in your truck</p>
  //         </div>
  //       </>
  //     );
  //   case error:
  //     return <ErrorView />;
  // }

  if (loading) {
    return <SpinnerLoading />;
  }

  if (resultInfo !== null) {
    return (
      <>
        <div className="good-box">
          <p>{resultInfo}</p>
          <p>Thank you. Please wait in your truck</p>
        </div>
      </>
    );
  }

  if (error) {
    return <ErrorView />;
  }

  return (
    <>
      <main className="hide-scrollbar">
        <form className=" box-size glass addForm" onSubmit={sendForm}>
          <h2>Driver registration</h2>
          <br />
          <label>
            Name: <br />
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name: <br />
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone Number: <br />
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => updateForm("phoneNumber", e.target.value)}
            />
          </label>

          <br />
          <label>
            Reference Number (12 signs: xxx-xxxx-xxx) : <br />
            <input
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
              required
              minLength={12}
            />
          </label>
          <br />

          <label>
            Your Company Name: <br />
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
            />
          </label>
          <br />
          <label>
            Truck Number: <br />
            <input
              type="text"
              value={form.truckNumber}
              onChange={(e) => updateForm("truckNumber", e.target.value)}
            />
          </label>
          <br />
          <label>
            Trailer Number: <br />
            <input
              type="text"
              value={form.trailerNumber}
              onChange={(e) => updateForm("trailerNumber", e.target.value)}
            />
          </label>
          <br />
          <label className="loadLabel">
            Loading/Unloading:
            <select
              value={form.loadingUnloading}
              onChange={(e) => updateForm("loadingUnloading", e.target.value)}
            >
              <option>select</option>
              <option>loading</option>
              <option>unloading</option>
            </select>
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </main>
    </>
  );
};
