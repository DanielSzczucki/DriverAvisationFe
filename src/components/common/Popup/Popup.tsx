import React, { useState } from "react";
import "./Popup.css";

interface Props {
  isVisible: boolean;
  message: React.ReactNode;
  //children as message to show
}

export const Popup = (props: Props) => {
  const [isVisible, setIsVisible] = useState(props.isVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="glass Popup">
      <p className="popup-content">{props.message}</p>
      <button className="close-button" onClick={handleClose}>
        ✖
      </button>
    </div>
  ) : null;
};
