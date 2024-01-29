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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import { useDispatch, useSelector } from "react-redux";
import store from "store2";
import Userfront from "@userfront/toolkit";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import {
  Await,
  createBrowserRouter,
  defer,
  Form,
  Link,
  Outlet,
  RouterProvider,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
  useRouteError,
} from "react-router-dom";

import { RootState } from "./stores/store";
import { updateMainSettings, updateSidebar } from "./reducers/main/mainSlice";
import SideNav from "./SideNav";
// import LinkToolbar from './components/LinkToolbar';
import { IProps } from "react-qrcode-logo";
import { updateBitlySettings } from "./reducers/bitly/bitlySlice";
import { setDark } from "./reducers/dark/darkSlice";
import {
  setLinkHistory,
  setUtmLinkHistory,
  setWifiLinkHistory,
} from "./reducers/history/historySlice";
import { updateQRStyleSettings } from "./reducers/qr/qrCodeSettingsSlice";
import { updateQRSettings } from "./reducers/qr/qrSlice";
import {
  updateUTMCampaignSettings,
  updateUTMMediumSettings,
  updateUTMSourceSettings,
  updateUTMTermSettings,
  updateUTMContentSettings,
  updateUTMKeywordSettings,
  updateUTMTargetSettings,
  updateUTMSettings,
} from "./reducers/utm/utmSlice";
import {
  QRSettings,
  BitlyConfig,
  LinkData,
  defaultUTMCampaign,
  defaultUTMMedium,
  defaultUTMSource,
  defaultUTMTerm,
  defaultUTMContent,
  defaultUTMKeyword,
  defaultUTMTarget,
  defaultUTMParams,
  defaultMainSettings,
  defaultQRSettings,
  DefaultQRStyle,
  defaultBitlyConfig,
} from "./types";
import { useWindowSize, useDebounce } from "@uidotdev/usehooks";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";

export default function App() {
  const dispatch = useDispatch();
  const [winWidth] = useState(window.innerWidth);
  const dark = useSelector((state: RootState) => state.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const mainSet = useSelector((state: RootState) => state.main.settings);
  const size = useWindowSize();
  const width = useDebounce(size.width, 300);
  const version = "1.1.0";
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

  /**
   * get/set all default values from local storage
   */
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



  /**
   * set the dark mode
   */
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "build",
      element: <MainPage />,
    },
  ]);
  return (
    <>
      <div className="fullrow">
        <SideNav />
        <RouterProvider router={router} />
        {/* <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/build" element={<MainPage />} />
          </Routes>
        </Router> */}
        <p></p>
        <div
          className={darkClass}
          style={{
            position: "absolute",
            bottom: "5px",
            right: "10px",
            marginTop: "10px",
          }}
        >
          <em>qr-builder v{version}</em>
        </div>
      </div>
    </>
  );
}
