import React, { StaticLifecycle, useState } from "react";
import "./Popup.css";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  message: React.ReactNode;
}

export const Popup = (props: Props) => {
  if (!props.isVisible) return null;

  return (
    <>
      <div className="overlay glass">
        <div className="popupContainer">
          <div className="popupContent">
            <p>{props.message}</p>
          </div>
          <button className="closeBtn glass error-box" onClick={props.onClose}>
            ✖
          </button>
        </div>
      </div>
    </>
  );
};
