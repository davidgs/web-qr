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
import { Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  BitlyConfig,
  QRSettings,
  IProps,
  LinkData,
} from "./types";
import store from "store2";
import Userfront, { SignupForm } from "@userfront/toolkit";
import { RootState } from "./stores/store";
import { updateMainSettings } from "./reducers/main/mainSlice";
import { updateQRSettings } from "./reducers/qr/qrSlice";
import { updateUTMCampaignSettings } from "./reducers/utm/utmCampaignSlice";
import { updateUTMContentSettings } from "./reducers/utm/utmContentSlice";
import { updateUTMKeywordSettings } from "./reducers/utm/utmKeywordSlice";
import { updateUTMMediumSettings } from "./reducers/utm/utmMediumSlice";
import { updateUTMSourceSettings } from "./reducers/utm/utmSourceSlice";
import { updateUTMTargetSettings } from "./reducers/utm/utmTargetSlice";
import { updateUTMTermSettings } from "./reducers/utm/utmTermSlice";
import { updateBitlySettings } from "./reducers/bitly/bitlySlice";
import { updateQRStyleSettings } from "./reducers/qr/qrCodeSettingsSlice";
import { setDark } from "./reducers/dark/darkSlice";
import SideNav from "./SideNav";
// import LinkToolbar from './components/LinkToolbar';
import QCode from "./forms/QRCodeForm";
import URLForm from "./forms/URLForm";
import WifiForm from "./forms/WiFiForm";
import {
  setUtmLinkHistory,
  setWifiLinkHistory,
  setLinkHistory,
} from "./reducers/history/historySlice";
import LinkToolbar from "./components/LinkToolbar";

export default function App() {
  const dispatch = useDispatch();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const mainSet = useSelector((state: RootState) => state.main.settings);

Userfront.init("qbjrr47b");
  // Userfront.init("qbjrr47b");

  useEffect(() => {
    const d = store.get("dark");
    if (d !== null) {
      dispatch(setDark(d));
    }
    const uc = store.get("utm-config");
    if (uc !== null) {
      dispatch(updateUTMCampaignSettings(uc.utm_campaign));
      dispatch(updateUTMMediumSettings(uc.utm_medium));
      dispatch(updateUTMSourceSettings(uc.utm_source));
      dispatch(updateUTMTermSettings(uc.utm_term));
      dispatch(updateUTMContentSettings(uc.utm_content));
      dispatch(updateUTMKeywordSettings(uc.utm_keyword));
      dispatch(updateUTMTargetSettings(uc.utm_target));
    }
    const mset = store.get("main-config");
    if (mset !== null) {
      console.log("mset", mset);
      dispatch(updateMainSettings(mset));
    }
    const qr: QRSettings = store.get("qr-config");
    if (qr !== null) {
      dispatch(updateQRSettings(qr));
    }
    const qs: IProps = store.get("qr-style");
    if (qs !== null) {
      console.log("qs", qs);
      dispatch(updateQRStyleSettings(qs));
    }
    const bc: BitlyConfig = store.get("bitly-config");
    if (bc !== null) {
      dispatch(updateBitlySettings(bc));
    }
    const ht: LinkData = store.get("history");
    if (ht !== null) {
      dispatch(setLinkHistory(ht));
      dispatch(setUtmLinkHistory(ht.utm_link));
      dispatch(setWifiLinkHistory(ht.wifi_link));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Row>
                {/* <div className="content"> */}
                <div
                  className={
                    mainSet.sidebar === "open"
                      ? "aside-column"
                      : "aside-column-closed"
                  }
                  style={{
                    width: mainSet.sidebar === "open" ? "270px" : "60px",
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
              </Row>
              {/* <Analytics /> */}
            </>
          }
        />
      </Routes>
    </Router>
  );
}
