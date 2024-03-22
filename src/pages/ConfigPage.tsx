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
import { useDispatch } from "react-redux";
import "../css/hyde.css";
import BitlyConfigurator from "../configuration/Configurators/BitlyConfigurator";
import MainValuesConfigurator from "../configuration/Configurators/MainValuesConfigurator";
import UTMConfigurator from "../configuration/Configurators/UTMConfigurator";
import QRConfigurator from "../configuration/Configurators/QRConfigurator";
import { RootState } from "../stores/store";
import axios from "axios";
import { SessionProps } from "../types";
import {
  saveUtm,
  updateUTMCampaignSettings,
  updateUTMContentSettings,
  updateUTMKeywordSettings,
  updateUTMMediumSettings,
  updateUTMSourceSettings,
  updateUTMTargetSettings,
  updateUTMTermSettings,
} from "../reducers/utm/utmSlice";
import { useAppSelector } from "../stores/hooks";
import { Link } from "react-router-dom";
import { saveQrCodeSettings } from "../reducers/qr/qrCodeSettingsSlice";
import { saveBitly } from "../reducers/bitly/bitlySlice";
import { setSettingsUpdated } from "../reducers/session/loginSlice";

function ConfigPage(): JSX.Element {
  const [targetValidated] = useState(false);
  const dispatch = useDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const settingsChanged = useAppSelector(
    (state: RootState) => state.login.settingsUpdated
  );
  const loggedIn = useAppSelector((state: RootState) => state.login.login);
  const bitly = useAppSelector((state: RootState) => state.bitly);
  const qrC = useAppSelector((state: RootState) => state.qrCode.settings);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const session: SessionProps = useAppSelector(
    (state: RootState) => state.session
  );
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
    dispatch(saveUtm({
      username: userfront.username,
      settings: newSet.settings
    }) as any);
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
          <h2
            className={darkClass}
            style={{ margin: "auto", paddingBottom: "10px" }}
          >
            Configuration Editor
          </h2>
        </Row>
        {(session.license_type === "free" || !loggedIn) && (
          <Row>
            <h2 className={darkClass} style={{ margin: "auto" }}>
              No Changeable settings{" "}
              {!loggedIn ? `if not logged in` : `for Free version`}
            </h2>
          </Row>
        )}
        <Accordion>
          {/* Fence off for Basic/Enterprise license */}
          {/* General Config */}
          {session.license_type !== "free" &&
            loggedIn &&
            session.license_type === "enterprise" && (
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
            )}
          {(session.license_type === "basic" ||
            session.license_type === "pro") && (
            <Accordion>
              <BitlyConfigurator eKey="0" />
            </Accordion>
          )}
          {/* End fence */}
          {/* Fence off for Basic/Enterprise License */}
          {/* QR Code Configuration */}
          {session.license_type !== "free" && loggedIn && (
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
                </Accordion.Header>
              </OverlayTrigger>
              <QRConfigurator />
            </Accordion.Item>
          )}
          {/* End fence */}
          {/* UTM Codes */}
          {session.license_type !== "free" && loggedIn && (
            <Accordion.Item eventKey="2">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="utm-tooltip">
                    Configuration settings for the UTM Codes and how they are
                    used
                  </Tooltip>
                }
              >
                <Accordion.Header>
                  <strong>UTM Code Configuration</strong>
                </Accordion.Header>
              </OverlayTrigger>
              <UTMConfigurator />
            </Accordion.Item>
          )}
          {/* End fence */}
        </Accordion>
        <div className="fullrow" style={{ paddingBottom: "25px" }} />
        {loggedIn ? (
          <>
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
          </>
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
      </div>
    </>
  );
}
export default memo(ConfigPage);
