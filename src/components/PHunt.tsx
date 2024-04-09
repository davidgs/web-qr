import Draggable from "react-draggable";
import "../css/sidebar.css";
import React from "react";

export default function PHunt() {
  const [vis, setVis] = React.useState("inline-flex");
  /*
  <a href="https://www.producthunt.com/posts/qr-builder?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-qr&#0045;builder" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=449193&theme=neutral" alt="Qr&#0032;Builder - The&#0032;modern&#0044;&#0032;easy&#0032;to&#0032;use&#0032;QR&#0032;Code&#0032;builder&#0032;tool | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
  */

  const hideMe = () => {
    setVis("none");
  };

  return (
    <Draggable>
      <div
        className=" prod-hunt fullrow"
        style={{
          display: vis,
          float: "right",
          position: "absolute",
          top: "12px",
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

        <a
          href="https://www.producthunt.com/posts/qr-builder?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-qr&#0045;builder"
          target="_blank"
          rel="noreferrer"
          style={{ zIndex: -100 }}
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=449193&theme=neutral"
            alt="Qr&#0032;Builder - The&#0032;modern&#0044;&#0032;easy&#0032;to&#0032;use&#0032;QR&#0032;Code&#0032;builder&#0032;tool | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
        <div className="prod-close"
          onClick={hideMe}

        >
          <i className="bi bi-x-circle bi-1x"></i>
        </div>
      </div>
    </Draggable>
  );
}
