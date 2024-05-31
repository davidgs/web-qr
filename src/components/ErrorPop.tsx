import React from "react";
import Draggable from "react-draggable";
import { useAppSelector } from "../stores/hooks";

interface ErrorPopProps {
  errorMsg: string | undefined;
  duration: number;
}
export default function ErrorPop(props: ErrorPopProps) {
  const [open, setOpen] = React.useState<Boolean>(props.errorMsg !== undefined && props.errorMsg !== "");
  const dark = useAppSelector((state) => state.main.settings.dark);
  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";
  const closeMe = () => {
    setOpen(false);
  };

  return (
    <div>
      <Draggable>
        <div
          className="error-pop fullrow darkClass"
          style={{
            display: open ? "inline-flex" : "none",
          }}
        >
          <div
            className="handle"
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   width: "36px",
            //   paddingTop: "5px",
            //   color: "white",
            // }}
          >
            <i className="bi bi-grip-vertical bi-2x"></i>
          </div>

          <div
            className="error-pop-content darkClass"

          >
            <h1>Error</h1>
            <p>{props.errorMsg}</p>
          </div>
          <div className="prod-close" onClick={closeMe}>
            <i className="bi bi-x-circle bi-1x"></i>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
