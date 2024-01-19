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
import store from "store2";
import Userfront from "@userfront/toolkit";
import { RootState } from "./stores/store";
import { updateMainSettings, updateSidebar } from "./reducers/main/mainSlice";
import SideNav from "./SideNav";
// import LinkToolbar from './components/LinkToolbar';
import QCode from "./forms/QRCodeForm";
import URLForm from "./forms/URLForm";
import WifiForm from "./forms/WiFiForm";
import LinkToolbar from "./components/LinkToolbar";
import { IProps } from "react-qrcode-logo";
import { updateBitlySettings } from "./reducers/bitly/bitlySlice";
import { setDark } from "./reducers/dark/darkSlice";
import { setLinkHistory, setUtmLinkHistory, setWifiLinkHistory } from "./reducers/history/historySlice";
import { updateQRStyleSettings } from "./reducers/qr/qrCodeSettingsSlice";
import { updateQRSettings } from "./reducers/qr/qrSlice";
import { updateUTMCampaignSettings, updateUTMMediumSettings, updateUTMSourceSettings, updateUTMTermSettings, updateUTMContentSettings, updateUTMKeywordSettings, updateUTMTargetSettings, updateUTMSettings } from "./reducers/utm/utmSlice";
import { QRSettings, BitlyConfig, LinkData, defaultUTMCampaign, defaultUTMMedium, defaultUTMSource, defaultUTMTerm, defaultUTMContent, defaultUTMKeyword, defaultUTMTarget, defaultUTMParams, defaultMainSettings, defaultQRSettings, DefaultQRStyle, defaultBitlyConfig } from "./types";
import { useWindowSize, useDebounce } from "@uidotdev/usehooks";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ChevronDoubleDown, ChevronDoubleRight } from "react-bootstrap-icons";
import MobileLinkToolbar from "./components/MobileLinkToolbar";
import MobileQCode from "./forms/MobileQRCodeForm";
import MobileURLForm from "./forms/MobileURLForm";

export default function App() {
  const dispatch = useDispatch();
  const [winWidth, ] = useState(window.innerWidth);
  const dark = useSelector((state: RootState) => state.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const mainSet = useSelector((state: RootState) => state.main.settings);
  const size = useWindowSize();
  const width = useDebounce(size.width, 300);
  const version = process.env.REACT_APP_VERSION;
  console.log("version", version);
  Userfront.init("qbjrr47b");
  // Userfront.init("qbjrr47b");

  useEffect(() => {
    if (!width) {
      if (winWidth < 650) {
        const f = { ...mainSet, sidebar: "top" };
        store.set("main-config", f);
        dispatch(updateSidebar("top"));
        console.log(`winWidth: ${winWidth} < 650 Sidebar: top`);
      } else if (winWidth <= 780) {
        const f = { ...mainSet, sidebar: "closed" };
        store.set("main-config", f);
        dispatch(updateSidebar("closed"));
        console.log(`winWidth: ${winWidth} <= 780 Sidebar: closed`);
      } else {
        return;
      }
      return;
    } else {
      if (width < 650) {
        const f = { ...mainSet, sidebar: "top" };
        store.set("main-config", f);
        dispatch(updateSidebar("top"));
        console.log(`winWidth: ${winWidth} < 650 Sidebar: top`);
        return;
      } else if (width <= 780) {
        const f = { ...mainSet, sidebar: "closed" };
        store.set("main-config", f);
        dispatch(updateSidebar("closed"));
        console.log(`winWidth: ${winWidth} <= 780 Sidebar: closed`);
        return;
      } else {
        return;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, winWidth]);

  useEffect(() => {
    console.log("sidebar", mainSet.sidebar);
  }, [mainSet.sidebar]);

  useEffect(() => {
    if (width && width < 650) {
      const f = { ...mainSet, sidebar: "top" };
      store.set("main-config", f);
      dispatch(updateSidebar("top"));
      return;
    } else if (width && width <= 780) {
      const f = { ...mainSet, sidebar: "closed" };
      store.set("main-config", f);
      dispatch(updateSidebar("closed"));
      return;
    } else {
      const s = mainSet.sidebar;
      if (s === "top") {
        const f = { ...mainSet, sidebar: "closed" };
        store.set("main-config", f);
        dispatch(updateSidebar("closed"));
        return;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    const d = store.get("dark");
    if (d !== null) {
      dispatch(setDark(d.dark));
      if (d.dark) {
        window.document
          .getElementsByTagName("html")[0]
          .setAttribute("data-bs-theme", "dark");
      } else {
        window.document
          .getElementsByTagName("html")[0]
          .setAttribute("data-bs-theme", "light");
      }
    } else {
      dispatch(setDark(false));
        window.document
          .getElementsByTagName("html")[0]
          .setAttribute("data-bs-theme", "light");
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
    } else {
      dispatch(updateUTMCampaignSettings(defaultUTMCampaign));
      dispatch(updateUTMMediumSettings(defaultUTMMedium));
      dispatch(updateUTMSourceSettings(defaultUTMSource));
      dispatch(updateUTMTermSettings(defaultUTMTerm));
      dispatch(updateUTMContentSettings(defaultUTMContent));
      dispatch(updateUTMKeywordSettings(defaultUTMKeyword));
      dispatch(updateUTMTargetSettings(defaultUTMTarget));
      dispatch(updateUTMSettings(defaultUTMParams));
    }
    const mset = store.get("main-config");
    if (mset !== null) {
      if (winWidth < 650) {
        const f = { ...mset, sidebar: "top" };
        store.set("main-config", f);
        dispatch(updateMainSettings(f));
      } else if (winWidth <= 780) {
        const f = { ...mset, sidebar: "closed" };
        store.set("main-config", f);
        dispatch(updateMainSettings(f));
      } else {
        dispatch(updateMainSettings(mset));
      }
    } else {
      if (winWidth < 750) {
        const f = { ...defaultMainSettings, sidebar: "top" };
        store.set("main-config", f);
        dispatch(updateMainSettings(f));
      } else if (winWidth <= 780) {
        const f = { ...defaultMainSettings, sidebar: "closed" };
        store.set("main-config", f);
        dispatch(updateMainSettings(f));
      } else {
        const m = { ...defaultMainSettings };
        store.set("main-config", m);
        dispatch(updateMainSettings(m));
      }
    }
    const qr: QRSettings = store.get("qr-config");
    if (qr !== null) {
      dispatch(updateQRSettings(qr));
    } else {
      dispatch(updateQRSettings(defaultQRSettings));
    }
    const qs: IProps = store.get("qr-style");
    if (qs !== null) {
      console.log("qs", qs);
      dispatch(updateQRStyleSettings(qs));
    } else {
      dispatch(updateQRStyleSettings(DefaultQRStyle));
    }
    const bc: BitlyConfig = store.get("bitly-config");
    if (bc !== null) {
      dispatch(updateBitlySettings(bc));
    } else {
      dispatch(updateBitlySettings(defaultBitlyConfig));
    }
    const ht: LinkData = store.get("history");
    if (ht !== null) {
      dispatch(setLinkHistory(ht));
      dispatch(setUtmLinkHistory(ht.utm_link));
      dispatch(setWifiLinkHistory(ht.wifi_link));
    } else {
      dispatch(setLinkHistory({ utm_link: [], wifi_link: [] }));
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
    store.set("dark", dark);
    if (dark.dark) {
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
              <div className="fullrow" style={{paddingTop: '0px'}}>
                {/* <div className={`aside-column-${mainSet.sidebar}`}> */}
                  {mainSet.sidebar !== "top" && (
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
                  )}
                  <SideNav />
                {/* </div> */}
                <div className={`main-column-${mainSet.sidebar}`}>
                  <div className="link-form">
                    {mainSet.sidebar !== 'top' ? <QCode /> : <MobileQCode />}
                    <hr />
                    {mainSet.sidebar !== 'top' ? (<LinkToolbar />) : (<MobileLinkToolbar />)}
                      <hr />
                    {mainSet.formType === "wifi" && <WifiForm />}
                    {mainSet.sidebar !== 'top' ? <URLForm /> : <MobileURLForm /> }
                  </div>
                  <div className={darkClass}><em>qr-builder v{version}</em></div>
                </div>
              </div>
              {/* W: {width} x H: {size.height} */}
              {/* <Analytics /> */}
            </>
          }
        />
      </Routes>
    </Router>
  );
}
