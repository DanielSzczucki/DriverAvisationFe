import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import "./Login.css";

export const Login = (props: any) => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    console.log("Values", values);

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      // sending cookie annd other
      // make auth
      signIn({
        token: data.accesToken,
        refreshToken: data.refreshToken,
        refreshTokenExpireIn: 5,
        expiresIn: 5 * 60,
        tokenType: "Bearer",
        //info user
        authState: { email: values.email },
      });

      console.log(data);

      navigate("/driver");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      <div className="box glass addForm">
        <form onSubmit={formik.handleSubmit}>
          <label>
            Login <br />
            <input
              type="email"
              name="email"
              autoComplete="on"
              placeholder="login/mail"
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
              onChange={formik.handleChange}
            />
          </label>

          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="driver/add">Driver registration</Link>
        </p>
      </div>
    </>
  );
};
