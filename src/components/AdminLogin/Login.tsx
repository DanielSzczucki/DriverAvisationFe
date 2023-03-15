import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useAuthHeader } from "react-auth-kit";
import { useFormik } from "formik";

import "./Login.css";

export const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const authToken = useAuthHeader();

  interface LoginDataForm {
    email: string;
    password: string;
  }

  const onSubmit = async (values: LoginDataForm) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken()}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      // sending cookie annd other
      // make auth
      signIn({
        token: data.token.refreshToken,
        refreshToken: data.token.refreshToken,
        refreshTokenExpireIn: 5,
        expiresIn: 5 * 60,
        tokenType: "Bearer",
        //info user
        authState: { email: values.email },
      });

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

          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/register">User registration</Link>
        </p>
      </div>
    </>
  );
};
