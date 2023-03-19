import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface props {
  message?: string;
}

export const ErrorView = (props?: props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <>
      <div className=" error-box views">
        <p>You went to far away 😕</p>
        <p>{props?.message && "Something went wrong"}</p>
        <p>Sorry, please try again later</p>
        <p>
          <a href="/">Back to list</a>
        </p>
      </div>
    </>
  );
};
