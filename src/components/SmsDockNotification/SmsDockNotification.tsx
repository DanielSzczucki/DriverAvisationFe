import { fetchData } from "src/utils/fetchData";
import { Button } from "../common/Button/Button";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { SetStateAction, useState } from "react";
import { Popup } from "../common/Popup/Popup";
import "./SmsDockNotification.css";

interface Props {
  driverId: string | undefined;
  onDockSend: (
    id: string | undefined,
    dock: number | undefined
  ) => Promise<void>;
}

export const SmsDockNotification = (props: Props) => {
  const authToken = useAuthHeader();
  const docksQuantity: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedDock, setSelectedDock] = useState<number | undefined>(
    undefined
  );
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const handleDockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedDock(parseInt(e.target.value));
    setIsButtonClicked(true);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(false);
  };

  console.log(isButtonClicked);

  return (
    <>
      <div className="SelectAssign">
        <select
          name="dock"
          id=""
          onChange={handleDockChange}
          onClick={() => setIsButtonClicked(true)}
        >
          {docksQuantity.map((dock, index) => (
            <option key={index} value={index}>
              {dock}
            </option>
          ))}
        </select>
        {isButtonClicked && (
          <Button
            onClick={handleButtonClick}
            buttonValue="✅"
            handleClick={() => props.onDockSend(props.driverId, selectedDock)}
          ></Button>
        )}
      </div>
    </>
  );
};
