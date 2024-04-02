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
import "./css/hyde.css";
import Logo from "./images/NewLinkerLogo.png";
import { RootState } from "./stores/store";
import { updateDark, updateMainSettings } from "./reducers/main/mainSlice";
import Userfront from "@userfront/core";
import axios from "axios";
import { logoutUserFront, setLogin } from "./reducers/session/loginSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { settingsServer } from "./types";

export default function SideNav() {
  // const navigate = useNavigate();
  const dark: boolean = useAppSelector(
    (state: RootState) => state.main.settings.dark
  );
  const loggedIn = useAppSelector((state: RootState) => state.login.login);
  const username = useAppSelector(
    (state: RootState) => state.userFront.settings.username
  );
  const dispatch = useAppDispatch();
  // const [editConfig, setEditConfig] = useState(false);
  const mainSet = useAppSelector((state: RootState) => state.main);
  Userfront.init("xbp876mb");

  /**
   * Set the dark mode
   */
  const setSaveDark = () => {
    const d = !dark;
    const newSet = { ...mainSet, dark: d };
    const payload = { username: username, settings: newSet };
    if (loggedIn) {
      axios
        .post(`${settingsServer}update-main-settings`, payload)
        .then((res) => {
          console.log(`res`, res);
          dispatch(updateMainSettings(res.data.main_settings));
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    }
    dispatch(updateDark(d));
  };

  useEffect(() => {
    console.log(`SideNav Logged in: ${loggedIn}`);
  }, [loggedIn]);
  /**
   * Logout the user
   */
  const logout = () => {
    dispatch(logoutUserFront());
    dispatch(setLogin(false));
    // await Userfront.logout()
    //   .then(() => {
    //     console.log(`Logged out`);
    //     dispatch(setLogin(false));
    //   })
    //   .catch((err) => {
    //     console.log(`err`, err);
    //   });
    // console.log(`Logged out ... `);
    // Userfront.getSession()
    //   .then((session: SessionResponse) => {
    //     if (session) {
    //       console.log(`session`, session.isLoggedIn);
    //       dispatch(setLogin(session.isLoggedIn));
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(`err`, err);
    //     return false;
    //   });
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
            <a href="#">
              <i className="bi bi-justify-left bi-4x"></i>
            </a>
          </li>
          <li>
            <Link to="/build">
              <i className="bi bi-qr-code bi-2x"></i>
              <span className="nav-text">Create</span>
            </Link>
          </li>
          <li className="has-subnav" onClick={setSaveDark}>
            {/* <a href="#"> */}
            <i
              className={dark ? "bi bi-sun bi-2x" : "bi bi-moon-stars bi-2x"}
            ></i>
            <span className="nav-text">
              {dark ? "Light Mode" : "Dark Mode"}
            </span>
            {/* </a> */}
          </li>
          <li>
            <Link to="/pricing">
              <i className="bi bi-credit-card-fill bi-2x"></i>
              <span className="nav-text">Purchase</span>
            </Link>
          </li>
          <li>
            <Link to="/config">
              <i className="fa fa-cogs fa-2x"></i>
              <span className="nav-text">Configuration & Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/guide">
              <i className="bi bi-book-half bi-2x"></i>
              <span className="nav-text">Docs</span>
            </Link>
          </li>
          <li>
            <Link to="/welcome">
              <i className="bi bi-info-circle bi-2x"></i>
              <span className="nav-text">About</span>
            </Link>
          </li>
          <li>
            <Link to="/faq">
              <i className="bi bi-patch-question bi-2x"></i>
              <span className="nav-text">FAQ</span>
            </Link>
          </li>
          <li>
            <Link to="/tos">
              <i className="bi bi-file-earmark-text bi-2x"></i>
              <span className="nav-text">Terms of Service</span>
            </Link>
          </li>
          <li>
            <Link to="/privacy">
              <i className="bi bi-shield-lock bi-2x"></i>
              <span className="nav-text">Privacy Policy</span>
            </Link>
          </li>
          <li className="has-subnav">
            <a href="https://dgs.st/bug" rel="noreferrer" target="_blank">
              <i className="bi bi-bug bi-2x"></i>
              <span className="nav-text">Rebort a Bug</span>
            </a>
          </li>
          <li>
            {loggedIn ? (
              <Link to="/myAccount">
                <i className="bi bi-person bi-2x"></i>
                <span className="nav-text">My Account</span>
              </Link>
            ) : (
              <> </>
            )}
          </li>
          <li>
            {loggedIn ? (
              <span className="logout" onClick={logout}>
                <i className="bi bi-power bi-2x off"></i>
                <span className="nav-text">Logout</span>
              </span>
            ) : (
              <Link to="/login">
                <span className="login">
                  <i className="bi bi-power bi-2x on"></i>
                  <span className="nav-text">Login/Signup</span>
                </span>
              </Link>
            )}
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
    </div>
  );
}
