/* eslint-disable no-nested-ternary */
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
import './css/hyde.css';
import { useState } from 'react';
import { Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import {
  Lightbulb,
  LightbulbFill,
  Gear,
  GearFill,
  ExclamationCircleFill,
  ExclamationTriangleFill,
  ExclamationOctagonFill,
  InfoCircle,
  InfoCircleFill,
} from 'react-bootstrap-icons';
import store from 'store2';
import { useSelector, useDispatch } from 'react-redux';
import Logo from './images/NewLinkerLogo.png';
import { RootState } from './stores/store';
import spinner from './images/loading.png';
import { setDark } from './reducers/dark/darkSlice';
import ConfigEditor from './configuration/ConfigEditor';
import AboutModal from './components/AboutModal';
import WelcomeModal from './components/WelcomeModal';
import { updateMainSettings } from './reducers/main/mainSlice';

export default function SideNav() {
  const dark = useSelector((state: RootState) => state.dark);
  const dispatch = useDispatch();
  const [updateText] = useState<string>("");
  const [editConfig, setEditConfig] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const mainSet = useSelector((state: RootState) => state.main.settings);
  const sidebar = useSelector(
    (state: RootState) => state.main.settings.sidebar
  );

  const showConfig = () => {
    const r = document.getElementById("root");
    if (!editConfig) {
      r?.setAttribute("class", "backdrop");
    } else {
      r?.setAttribute("class", "");
    }
    setEditConfig(!editConfig);
  };

  const showAbout = () => {
    setShowAboutModal(!showAboutModal);
  };
  /**
   * toggle the sidebar open or closed
   */
  const toggleOpen = () => {
    const ms = { ...mainSet };
    ms.sidebar = mainSet.sidebar === "open" ? "closed" : "open";
    dispatch(updateMainSettings(ms));
    store.set("main-config", ms);
  };

  const setSaveDark = () => {
    const d = { ...dark, dark: !dark.dark };
    store.set("dark", d);
    dispatch(setDark(d.dark));
    console.log(`Dark Mode: ${store.get("dark").dark}`);
  };



  return (
    // eslint-disable-next-line react/jsx-filename-extension
    // <div id="side-nav" className={`side-nav-${sidebar}`}>
    <div>
      <nav className="main-menu">
        <a href="https://qr-builder.io/" rel="noreferrer">
          <img
            src={Logo}
            alt="QR Builder Logo"
            // width={
            //   mainSet.sidebar === "open"
            //     ? mainSet.brandWidth > 0
            //       ? `${mainSet.brandWidth}px`
            //       : "75%"
            //     : "40px"
            // }
            // height={
            //   mainSet.sidebar === "open"
            //     ? mainSet.brandHeight > 0
            //       ? `${mainSet.brandHeight}px`
            //       : "auto"
            //     : "40px"
            // }
            style={{
              transition: "0.3s ease-in-out",
              position: "absolute",
              top: "13px",
              left: "10px",
            }}
          />
        </a>
        <ul>
          <li>
            <a href="/build">
              <i className="bi bi-qr-code bi-2x"></i>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className="has-subnav" onClick={setSaveDark}>
            <a href="#">
              <i
                className={
                  dark.dark ? "bi bi-sun bi-2x" : "bi bi-moon-stars bi-2x"
                }
              ></i>
              <span className="nav-text">
                {dark.dark ? "Set Light Mode" : "Set Dark Mode"}
              </span>
            </a>
          </li>
          <li className="has-subnav">
            <a href="/register">
              <i className="bi bi-person-add bi-2x"></i>
              <span className="nav-text">Create Account</span>
            </a>
          </li>
          <li> {/* className="has-subnav"> */}
            <a href="pricing">
              <i className="bi bi-bag bi-2x"></i>
              <span className="nav-text">Purchase</span>
            </a>
            <ul>
              <li className="has-subnav">
                <a href="/buy-pro">
                  <i className="bi bi-credit-card bi-2x"></i>
                  <span className="nav-text">Pro License</span>
                </a>
              </li>
              <li className="has-subnav">
                <a href="/buy">
                  <i className="bi bi-credit-card bi-2x"></i>
                  <span className="nav-text">Basic License</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <li className="has-subnav">
            <a href="#">
              <i className="fa fa-camera-retro fa-2x"></i>
              <span className="nav-text">Survey Photos</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="fa fa-film fa-2x"></i>
              <span className="nav-text">Surveying Tutorials</span>
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="fa fa-book fa-2x"></i>
              <span className="nav-text">Surveying Jobs</span>
            </a>
          </li> */}
          <li>
            <a href="/config">
              <i className="fa fa-cogs fa-2x"></i>
              <span className="nav-text">Configuration & Settings</span>
            </a>
          </li>
          <li>
            <a href="welcome">
              <i className="bi bi-info-circle bi-2x"></i>
              <span className="nav-text">About</span>
            </a>
          </li>
        </ul>

        <ul className="logout">
          <li>
            <a href="#">
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
        <div className={`copyright-sticky-closed`}>
          <p
            style={{
              fontSize: "10px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, .5)" }}>
              &copy;{" "}
              <a
                href="https://davidgs.com/"
                style={{ color: "rgba(255, 255, 255, .5)" }}
              >
                David G. Simmons 2023
              </a>
            </span>
            <br />
            All rights reserved
          </p>
        </div>
      </nav>
      {/* {sidebar !== "top" && ( */}

      {/* )} */}
      {editConfig && (
        <ConfigEditor showMe={editConfig} callback={setEditConfig} />
      )}
      {showAboutModal && (
        <AboutModal showMe={showAboutModal} callback={setShowAboutModal} />
      )}
      {mainSet.firstRun && (
        <WelcomeModal
          showMe={mainSet.firstRun}
          callback={(res: boolean) => {
            const ms = { ...mainSet, firstRun: false };
            store.set("main", ms);
            dispatch(updateMainSettings(ms));
          }}
        />
      )}
    </div>
    // </div>
  );
}
