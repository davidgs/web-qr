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
import ImgElement from './components/ImgElement';
import { RootState } from './stores/store';
import spinner from './images/loading.png';
import { setDark } from './reducers/dark/darkSlice';
import ConfigEditor from './configuration/ConfigEditor';
import AboutModal from './components/AboutModal';

export default function SideNav() {
  const dark = useSelector((state: RootState) => state.dark);
  const dispatch = useDispatch();
  const [updateText, setUpdateText] = useState<string>('');
  const [editConfig, setEditConfig] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const mainSet = useSelector((state: RootState) => state.main.settings);

  const showConfig = () => {
    const r = document.getElementById('root');
    if (!editConfig) {
      r?.setAttribute('class', 'backdrop');
    } else {
      r?.setAttribute('class', '');
    }
    setEditConfig(!editConfig);
  };

  const showAbout = () => {
    setShowAboutModal(!showAboutModal);
  }

  const setSaveDark = () => {
    const d = { ...dark }
    d.dark = !d.dark;
    store.set('dark', d);
    console.log(`Dark Mode: ${store.get('dark').dark}`)
    dispatch(setDark(d.dark));
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div id="side-nav">
      <div
        className={
          mainSet.sidebar === "open"
            ? "theme-base-09 sidebar"
            : "theme-base-09 sidebarClosed"
        }
      >
        <p />
        <p />
        <div style={{ textAlign: "center" }}>
          <a href="https://davidgs.com/" target="_blank" rel="noreferrer">
            {mainSet.brandImage !== undefined &&
            mainSet.brandImage !== null &&
            mainSet.brandImage !== "" ? (
              <ImgElement
                byteString={mainSet.brandImage as string}
                width={
                  mainSet.sidebar === "open"
                    ? (mainSet.brandWidth as number)
                    : 40
                }
                height={
                  mainSet.sidebar === "open"
                    ? (mainSet.brandHeight as number)
                    : 40
                }
                alt="Logo"
              />
            ) : (
              <OverlayTrigger
                placement="auto"
                overlay={
                  <Tooltip id="brand-tooltip">
                    Click the <GearFill /> icon below to change this image.
                  </Tooltip>
                }
              >
                <img
                  src={Logo}
                  alt="QR Builder Logo"
                  width={
                    mainSet.sidebar === "open"
                      ? mainSet.brandWidth > 0
                        ? `${mainSet.brandWidth}px`
                        : "75%"
                      : "40px"
                  }
                  height={
                    mainSet.sidebar === "open"
                      ? mainSet.brandHeight > 0
                        ? `${mainSet.brandHeight}px`
                        : "auto"
                      : "40px"
                  }
                  style={{
                    transition: "0.3s ease-in-out",
                  }}
                />
              </OverlayTrigger>
            )}
          </a>
        </div>
        {mainSet.sidebar === "open" && (
          <article className="post">
            <p />
            <h5
              style={{
                textAlign: "center",
                transition: "0.3s ease-in-out",
              }}
            >
              QR Code Builder
            </h5>
            <p
              style={{
                textAlign: "center",
                transition: "0.3s ease-in-out",
              }}
            >
              Create trackable links.
              <br />
              Design and add a custom QR Code to match your brand.
            </p>
          </article>
        )}
        <p />
        <div
          className={
            mainSet.sidebar === "open"
              ? "sidebar-sticky"
              : "sidebar-sticky-closed"
          }
        >
          <Form>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: mainSet.sidebar === "open" ? "row" : "column",
                paddingLeft: mainSet.sidebar === "open" ? "0px" : "10px",
                transition: "0.3s ease-in-out",
                width: mainSet.sidebar === "open" ? "200px" : "",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="config-tooltip">
                      Turn {dark.dark ? "off" : "on"} Dark Mode
                    </Tooltip>
                  }
                >
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setSaveDark();
                    }}
                    className="btn"
                    style={{
                      backgroundColor: "#0A1C2E",
                      borderColor: "#0A1C2E",
                    }}
                  >
                    {dark.dark ? (
                      <LightbulbFill size={20} />
                    ) : (
                      <Lightbulb size={20} />
                    )}
                  </Button>
                </OverlayTrigger>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  width: mainSet.sidebar === "open" ? "80%" : "",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="about-tooltip">
                      About the QR Builder App
                    </Tooltip>
                  }
                >
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      showAbout();
                    }}
                    className="btn"
                    style={{
                      backgroundColor: "#0A1C2E",
                      borderColor: "#0A1C2E",
                    }}
                  >
                    {dark.dark ? (
                      <InfoCircleFill size={20} />
                    ) : (
                      <InfoCircle size={20} />
                    )}
                  </Button>
                </OverlayTrigger>
              </div>
              <div
                style={{
                  // textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                  width: mainSet.sidebar === "open" ? "100%;" : "",
                  marginRight: mainSet.sidebar === "open" ? "-20px" : "0px",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="config-tooltip">
                      Edit the Configuration of fields, images and the QR Code
                    </Tooltip>
                  }
                >
                  <Button
                    variant="config-btn-icon-only-dark"
                    className="configSwitch"
                    id="custom-switch"
                    style={{ opacity: 1.0, zIndex: 1000 }}
                    key="config-switch"
                    aria-label="Edit Configuration"
                    onClick={() => {
                      showConfig();
                    }}
                    size="sm"
                  >
                    {dark.dark ? <GearFill size={20} /> : <Gear size={20} />}
                  </Button>
                </OverlayTrigger>
              </div>
              {mainSet.sidebar === "closed" && (
                <div>
                  {updateText !== "" && updateText.startsWith("Checking") ? (
                    <div style={{ textAlign: "center" }}>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip id="update-tooltip">{updateText}</Tooltip>
                        }
                      >
                        <img
                          src={spinner}
                          alt="spinner"
                          width="10px"
                          className="glyphicon-refresh-animate"
                          style={{ paddingTop: "-.25rem" }}
                        />
                      </OverlayTrigger>
                    </div>
                  ) : (
                    <div />
                  )}
                  {updateText !== "" &&
                  updateText.startsWith("There was a problem") ? (
                    <div style={{ textAlign: "center" }}>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip id="update-tooltip">{updateText}</Tooltip>
                        }
                      >
                        <ExclamationTriangleFill
                          size={20}
                          style={{ color: "red" }}
                        />
                      </OverlayTrigger>
                    </div>
                  ) : (
                    <div />
                  )}
                  {updateText !== "" && updateText.startsWith("Version") ? (
                    <div style={{ textAlign: "center" }}>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip id="update-tooltip">{updateText}</Tooltip>
                        }
                      >
                        <ExclamationCircleFill
                          size={20}
                          style={{ color: "green" }}
                        />
                      </OverlayTrigger>
                    </div>
                  ) : (
                    <div />
                  )}
                  {updateText !== "" &&
                  updateText.startsWith("Update available") ? (
                    <div style={{ textAlign: "center" }}>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip id="update-tooltip">{updateText}</Tooltip>
                        }
                      >
                        <ExclamationOctagonFill
                          size={20}
                          style={{ color: "green" }}
                        />
                      </OverlayTrigger>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </div>
          </Form>
        </div>
        <div
          className={
            mainSet.sidebar === "open"
              ? "copyright-sticky"
              : "copyright-sticky-closed"
          }
        >
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
        {editConfig && (
          <ConfigEditor showMe={editConfig} callback={setEditConfig} />
        )}
        {showAboutModal && (
          <AboutModal showMe={showAboutModal} callback={setShowAboutModal} />
        )}
      </div>
    </div>
  );
}
