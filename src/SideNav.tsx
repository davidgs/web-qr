/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { useEffect } from 'react';
import store from 'store2';
import { useSelector, useDispatch } from 'react-redux';
import Logo from './images/NewLinkerLogo.png';
import { RootState } from './stores/store';
import { setDark } from './reducers/dark/darkSlice';
import { updateMainSettings } from './reducers/main/mainSlice';
import { SessionResponse } from '@userfront/core';
import Userfront from '@userfront/toolkit';

export default function SideNav() {
  const dark = useSelector((state: RootState) => state.dark);
  const dispatch = useDispatch();
  // const [editConfig, setEditConfig] = useState(false);
  // const [showAboutModal, setShowAboutModal] = useState(false);
  const mainSet = useSelector((state: RootState) => state.main.settings);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Userfront.getSession()
      .then((session: SessionResponse) => {
        if (session) {
          console.log(`session`, session.isLoggedIn);
          // setIsLoggedIn(session.isLoggedIn);
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        return false;
      });
  }, []);
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
            style={{
              transition: "0.3s ease-in-out",
              position: "absolute",
              top: "13px",
              left: "10px",
            }}
          />
        </a>
        <ul>
          <li className="hamburger">
            <a href="#" onClick={toggleOpen}>
              <i className="bi bi-justify-left bi-4x"></i>
            </a>
          </li>
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
                {dark.dark ? "Light Mode" : "Dark Mode"}
              </span>
            </a>
          </li>
          {/* <li className="has-subnav">
            <a href="/register">
              <i className="bi bi-person-add bi-2x"></i>
              <span className="nav-text">Create Account</span>
            </a>
          </li> */}
          <li>
            {" "}
            {/* className="has-subnav"> */}
            <a href="pricing">
              <i className="bi bi-bag bi-2x"></i>
              <span className="nav-text">Purchase</span>
            </a>
          </li>
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
          <li>
            <a href="tos">
              <i className="bi bi-file-earmark-text bi-2x"></i>
              <span className="nav-text">Terms of Service</span>
            </a>
          </li>
          <li>
            <a href="privacy">
              <i className="bi bi-shield-lock bi-2x"></i>
              <span className="nav-text">Privacy Policy</span>
            </a>
          </li>
          <li className="has-subnav">
            <a href="#">
              <i className="bi bi-bug bi-2x"></i>
              <span className="nav-text">Rebort a Bug</span>
            </a>
          </li>
          {/* <li>
            <a href="account">
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">{isLoggedIn ? "Logout" : "Login/Sign up"}</span>
            </a>
          </li> */}
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
      {/* {editConfig && (
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
      )} */}
    </div>
    // </div>
  );
}
