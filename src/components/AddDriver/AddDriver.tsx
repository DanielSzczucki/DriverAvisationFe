import React, { FormEvent, useState } from "react";
import { CreateDriverReq, DriverEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { config } from "../../utils/config";

import "./AddDriver.css";
import { useNavigate } from "react-router-dom";
import { ErrorView } from "../views/ErrorView";
import { useAuthHeader } from "react-auth-kit";

export const AddDriver = () => {
  const navigate = useNavigate();
  const authToken = useAuthHeader();
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
          Authorization: `${authToken()}`,
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
      <main className="hide-scrollbar ">
        <header className="Header">
          <h2>Driver registration</h2>
        </header>
        <form className=" box-size glass addForm" onSubmit={sendForm}>
          <label>
            Name:
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone Number (0048999999999): <br />
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => updateForm("phoneNumber", e.target.value)}
            />
          </label>

          <label>
            Reference Number (12 signs) :
            <input
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
              required
              minLength={12}
            />
          </label>

          <label>
            Your Company Name:
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
            />
          </label>

          <label>
            Truck Number:
            <input
              type="text"
              value={form.truckNumber}
              onChange={(e) => updateForm("truckNumber", e.target.value)}
            />
          </label>

          <label>
            Trailer Number:
            <input
              type="text"
              value={form.trailerNumber}
              onChange={(e) => updateForm("trailerNumber", e.target.value)}
            />
          </label>

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

          <button type="submit">Register</button>
        </form>
      </main>
    </>
  );
};
