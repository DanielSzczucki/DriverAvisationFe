import React from "react";
import "./Popup.css";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  message: React.ReactNode;
}

export const Popup = (props: Props) =>
  props.isVisible ? (
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
  ) : null;
