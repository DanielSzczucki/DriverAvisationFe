import React, { FormEvent, useState } from "react";
import { CreateDriverReq, CreateLoadReq, DriverEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";

export const AddDriver = () => {
  const [form, setForm] = useState<CreateDriverReq>({
    name: "",
    lastName: "",
    phoneNumber: 0,
    referenceNumber: "",
    truckNumber: "",
    trailerNumber: "",
    loadingUnloading: "",
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
      const res = await fetch("http://localhost:3001/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: DriverEntity = await res.json();
      setLoading(false);
      setResultInfo(`${data.name} added with ref: ${data.referenceNumber}`);

      // setTimeout(() => {
      //   setResultInfo(null);
      //   setForm({
      //     name: "",
      //     lastName: "",
      //     phoneNumber: 0,
      //     referenceNumber: "",
      //     truckNumber: "",
      //     trailerNumber: "",
      //     loadingUnloading: "unloadning",
      //   });
      // }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  if (resultInfo !== null) {
    return (
      <>
        <>
          <div>
            <p>
              <strong>{resultInfo}</strong>
            </p>
            <p>Thank you. Please wait in your truck</p>
          </div>
        </>
      </>
    );
  }

  return (
    <>
      <form onSubmit={sendForm}>
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
          Reference Number: <br />
          <input
            type="text"
            value={form.referenceNumber}
            onChange={(e) => updateForm("referenceNumber", e.target.value)}
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
        <label>
          Loading/Unloading: <br />
          <select
            value={form.loadingUnloading}
            onChange={(e) => updateForm("loadingUnloading", e.target.value)}
          >
            <option>loading</option>
            <option>unloading</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
