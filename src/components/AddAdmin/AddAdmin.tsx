import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useSignOut, useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";

export const AddAdmin = (props: any) => {
  const navigate = useNavigate();
  const authToken = useAuthHeader();

  const onSubmit = async (values: any) => {
    console.log("Values", values);

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("data", data);

      console.log(data);

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //Todo add conditional rendering and message after user created

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      <header className="section-head">
        <h2>User registration form</h2>
      </header>
      <div className="box glass addForm">
        <form onSubmit={formik.handleSubmit}>
          <label>
            Name <br />
            <input
              type="name"
              name="name"
              autoComplete="on"
              placeholder="name"
              required
              onChange={formik.handleChange}
            />
          </label>
          <br />
          <label>
            Login <br />
            <input
              type="email"
              name="email"
              autoComplete="on"
              placeholder="login/mail"
              required
              onChange={formik.handleChange}
            />
          </label>
          <br />
          <label>
            Password <br />
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="password"
              required
              onChange={formik.handleChange}
            />
          </label>

          <button type="submit">Register</button>
        </form>
        <p>
          <Link to="/driver/add">Driver registration</Link>
        </p>
      </div>
    </>
  );
};
