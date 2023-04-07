import "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Popup } from "../common/Popup/Popup";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

export const AddAdmin = () => {
  const navigate = useNavigate();
  const authToken = useAuthHeader();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isVisible]);

  const onSubmit = async (values: RegistrationFormData) => {
    setIsVisible(true);

    try {
      const res = await fetch(`${config.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken()}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      setMessage(data.message);
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
      <Popup
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        message={message}
      />

      <header className="Header">
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
