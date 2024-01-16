/* The MIT License (MIT)
 *
 * Copyright (c) 2022-present David G. Simmons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { useEffect, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDoubleDown, ChevronDoubleRight } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import store from "store2";
import Userfront from "@userfront/toolkit";
import { RootState } from "./stores/store";
import { updateMainSettings } from "./reducers/main/mainSlice";
import SideNav from "./SideNav";
// import LinkToolbar from './components/LinkToolbar';
import QCode from "./forms/QRCodeForm";
import URLForm from "./forms/URLForm";
import WifiForm from "./forms/WiFiForm";
import LinkToolbar from "./components/LinkToolbar";

export default function App() {
  const dispatch = useDispatch();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const mainSet = useSelector((state: RootState) => state.main.settings);

  Userfront.init("qbjrr47b");
  // Userfront.init("qbjrr47b");

  const toggleOpen = () => {
    const ms = { ...mainSet };
    ms.sidebar = mainSet.sidebar === "open" ? "closed" : "open";
    dispatch(updateMainSettings(ms));
    store.set("main-config", ms);
  };

  useEffect(() => {
    if (winWidth < 768) {
      mainSet.sidebar = "closed";
      dispatch(updateMainSettings(mainSet));
    }
    console.log("v", winWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winWidth]);

  useEffect(() => {
    if (dark) {
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("data-bs-theme", "dark");
    } else {
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("data-bs-theme", "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="fullrow">
                {/* <div className="content"> */}
                <div
                  className={
                    mainSet.sidebar === "open"
                      ? "aside-column"
                      : "aside-column-closed"
                  }
                  style={{
                    width: mainSet.sidebar === "open" ? "270px" : "60px",
                    marginTop: "-7px",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      mainSet.sidebar === "open" ? (
                        <Tooltip id="sidebar-tooltip">
                          Collapse the Sidebar
                        </Tooltip>
                      ) : (
                        <Tooltip id="sidebar-collapse-tooltip">
                          Expand the Sidebar
                        </Tooltip>
                      )
                    }
                  >
                    <button
                      type="button"
                      className="menuBtn"
                      style={{ float: "left" }}
                      onClick={toggleOpen}
                    >
                      {mainSet.sidebar === "open" ? (
                        <ChevronDoubleDown
                          style={{ width: "32px", height: "26px" }}
                        />
                      ) : (
                        <ChevronDoubleRight
                          style={{ width: "32px", height: "26px" }}
                        />
                      )}
                    </button>
                  </OverlayTrigger>
                  <SideNav />
                </div>
                <div
                  className={
                    mainSet.sidebar === "open"
                      ? "main-column"
                      : "main-column-closed"
                  }
                  style={{
                    width:
                      mainSet.sidebar === "open"
                        ? "calc(100% - 280px)"
                        : "calc(100% - 90px)",
                  }}
                >
                  <div className="link-form">
                    <div className="fullrow">
                      <QCode />
                    </div>
                    <div className="fullrow">
                      <LinkToolbar />
                      <hr />
                    </div>
                    {mainSet.formType === "wifi" ? <WifiForm /> : <URLForm />}
                  </div>
                </div>
              </div>
              {/* <Analytics /> */}
            </>
          }
        />
      </Routes>
    </Router>
  );
}
