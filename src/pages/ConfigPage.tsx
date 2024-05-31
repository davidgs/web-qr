/* eslint-disable no-console */
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
/* eslint-disable no-case-declarations */
import { JSX, useState, memo, SyntheticEvent } from "react";
import {
  Accordion,
  Button,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import "primereact/resources/primereact.min.css";
import "../css/hyde.css";
import "../css/Config.css";
import BitlyConfigurator from "../configuration/Configurators/BitlyConfigurator";
import MainValuesConfigurator from "../configuration/Configurators/MainValuesConfigurator";
import UTMConfigurator from "../configuration/Configurators/UTMConfigurator";
import QRConfigurator from "../configuration/Configurators/QRConfigurator";
import { RootState } from "../stores/store";
import { LicenseProps } from "../types";
import { saveUtm } from "../reducers/utm/utmSlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { Link } from "react-router-dom";
import { saveQrCodeSettings } from "../reducers/qr/qrCodeSettingsSlice";
import { saveBitly } from "../reducers/bitly/bitlySlice";
import { setSettingsUpdated } from "../reducers/session/loginSlice";
import Logo from "../images/NewLinkerLogo.png";
import Footer from "../components/Footer";
import PHunt from "../components/PHunt";

function ConfigPage(): JSX.Element {
  const [targetValidated] = useState(false);
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const settingsChanged = useAppSelector(
    (state: RootState) => state.login.settingsUpdated
  );
  const loggedIn = useAppSelector((state: RootState) => state.login.login);
  const bitly = useAppSelector((state: RootState) => state.bitly);
  const qrC = useAppSelector((state: RootState) => state.qrCode.settings);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const session: LicenseProps = useAppSelector(
    (state: RootState) => state.license.settings
  );
  const license = useAppSelector((state: RootState) => state.license.settings);
  const utmSettings = useAppSelector((state: RootState) => state.utmConfigs);
  const userfront = useAppSelector(
    (state: RootState) => state.userFront.settings
  );

  // dispatch(setSettingsUpdated(false));
  const handleCancel = () => {
    // reload settings from server
    // do nothing
  };

  /* handle the save button
      @param: event: the event that triggered the save
  */
  const handleSave = (event: SyntheticEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form != null && form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const newSet = { ...utmSettings };
    dispatch(
      saveUtm({
        username: userfront.username,
        settings: newSet.settings,
      }) as any
    );
    const newBit = { ...bitly };
    dispatch(
      saveBitly({
        username: userfront.username,
        settings: newBit.settings,
      }) as any
    );
    // const payloadBit = { username: userfront.username, settings: newBit };
    // axios
    //   .post(`http://localhost:4242/update-bitly-settings`, payloadBit)
    //   .then((res) => {
    //     console.log(`res`, res);
    //   })
    //   .catch((err) => {
    //     console.log(`err`, err);
    //   });
    const q = { ...qrC };
    dispatch(
      saveQrCodeSettings({ username: userfront.username, settings: q }) as any
    );
    console.log(`settings saved`);
    console.log(`QRSettings: ${qrC}`);
    dispatch(setSettingsUpdated(false)); // save settings to server
    // dispatch(updateBitlySettings(currentBitly));
  };
  return (
    <>
      <div className="main-column">
        <Row>
          <h1 style={{ margin: "auto", textAlign: "center" }}>
            <img src={Logo} alt="QR Builder Logo" width={40} height={40} />{" "}
            &nbsp; &nbsp;
            <strong>
              <span className={darkClass}>QR Builder Settings</span>
            </strong>
          </h1>
          <p></p>
        </Row>
        <div className="fullrow">
          <PHunt />
        </div>
        {(license.license_type === "free" || !loggedIn) && (
          <Row>
            <h2 className={darkClass} style={{ margin: "auto" }}>
              No Changeable settings{" "}
              {!loggedIn ? `if not logged in` : `for Free version`}
            </h2>
            <p></p>
          </Row>
        )}
        <Accordion>
          {/* Fence off for Basic/Enterprise license */}
          {/* General Config */}
          <Accordion.Item eventKey="0">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="general-tooltip">
                  Configuration settings for Bit.ly integration
                </Tooltip>
              }
            >
              <Accordion.Header className={darkClass}>
                <strong>General Configuration</strong>
                <span style={{ marginTop: ".5rem" }}>
                  {session.license_type === "free" ? (
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip id="brand-tooltip">
                          These Settings for paid Customers only.
                        </Tooltip>
                      }
                    >
                      <i className={`bi bi-ban ${session.license_type}`}></i>
                    </OverlayTrigger>
                  ) : (
                    ""
                  )}
                </span>
              </Accordion.Header>
            </OverlayTrigger>
            <Accordion.Body id="general">
              <Accordion>
                {/* Bitly Configuration */}
                <BitlyConfigurator eKey="0" />
                {/* Fence off for Enterprise License */}
                {/* UI Images */}
                <MainValuesConfigurator targetValidated={targetValidated} />
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          {/* End fence */}
          {/* Fence off for Basic/Enterprise License */}
          {/* QR Code Configuration */}
          <Accordion.Item eventKey="1">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="qr-tooltip">
                  Configuration settings for the QR Code
                </Tooltip>
              }
            >
              <Accordion.Header className={darkClass}>
                <strong>QR Code Configuration</strong>
                <span style={{ marginTop: ".5rem" }}>
                  {session.license_type === "free" ? (
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip id="brand-tooltip">
                          QR Code Settings for paid Customers only.
                        </Tooltip>
                      }
                    >
                      <i className="bi bi-ban" style={{ color: "red" }}></i>
                    </OverlayTrigger>
                  ) : (
                    ""
                  )}
                </span>
              </Accordion.Header>
            </OverlayTrigger>
            <QRConfigurator />
          </Accordion.Item>
          {/* End fence */}
          {/* UTM Codes */}
          <Accordion.Item eventKey="2">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="utm-tooltip">
                  Configuration settings for the UTM Codes and how they are used
                </Tooltip>
              }
            >
              <Accordion.Header>
                <strong>UTM Code Configuration</strong>
                <span style={{ marginTop: ".5rem" }}>
                  {session.license_type === "free" ? (
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip id="brand-tooltip">
                          QR Code Settings for paid Customers only.
                        </Tooltip>
                      }
                    >
                      <i className="bi bi-ban" style={{ color: "red" }}></i>
                    </OverlayTrigger>
                  ) : (
                    ""
                  )}
                </span>
              </Accordion.Header>
            </OverlayTrigger>
            <UTMConfigurator />
          </Accordion.Item>

          {/* End fence */}
          {/* Fence off for Basic/Enterprise License */}
          {/* {(session.license_type === "pro" || session.license_type === "enterprise") && (
          <Accordion.Item eventKey="3">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="qr-tooltip">
                  Configuration settings WiFi QR Code
                </Tooltip>
              }
            >
              <Accordion.Header className={darkClass}>
                <strong>WiFi Form Configuration</strong>
              </Accordion.Header>
            </OverlayTrigger>
            <WiFiConfigurator />
            </Accordion.Item>
          )} */}
          {/* End Fence */}
        </Accordion>
        <div className="fullrow" />
        {loggedIn ? (
          <div
            className="fullrow"
            style={{ justifyContent: "right", paddingBottom: "25px" }}
          >
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="cancel-tooltip">
                  Close the configuration editor without saving
                </Tooltip>
              }
            >
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </OverlayTrigger>
            &nbsp; &nbsp;
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="save-tooltip">
                  Save the configuration settings
                </Tooltip>
              }
            >
              <Button
                type="button"
                variant="primary"
                disabled={!settingsChanged}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </OverlayTrigger>
          </div>
        ) : (
          <Link to="/login">
            <Button type="button" variant="primary">
              Login
            </Button>
          </Link>
        )}
        <div className="fullrow" style={{ paddingBottom: "25px" }} />
        <p />
        <p />
        <Footer />
      </div>
    </>
  );
}
export default memo(ConfigPage);
