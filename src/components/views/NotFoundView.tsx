import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);

  return (
    <>
      <h1>You are loste :( </h1>
      <p>Sorry, you are very far away</p>
    </>
  );
};
