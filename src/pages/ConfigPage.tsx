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
import { JSX, useState, SyntheticEvent, memo } from "react";
import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import "primereact/resources/primereact.min.css";
import { useDispatch, useSelector } from "react-redux";
import store from "store2";
import "../css/hyde.css";
import BitlyConfigurator from "../configuration/Configurators/BitlyConfigurator";
import MainValuesConfigurator from "../configuration/Configurators/MainValuesConfigurator";
import UTMConfigurator from "../configuration/Configurators/UTMConfigurator";
import QRConfigurator from "../configuration/Configurators/QRConfigurator";
import { RootState } from "../stores/store";
import {
  BitlyConfig,
  MainSettings,
  QRSettings,
  UtmObj,
  UtmParams,
  WiFiSettings,
  IProps,
} from "../types";
import { updateBitlySettings } from "../reducers/bitly/bitlySlice";
import { updateMainSettings } from "../reducers/main/mainSlice";
import { updateQRStyleSettings } from "../reducers/qr/qrCodeSettingsSlice";
import { updateQRSettings } from "../reducers/qr/qrSlice";
import {
  updateUTMCampaignSettings,
  updateUTMContentSettings,
  updateUTMKeywordSettings,
  updateUTMMediumSettings,
  updateUTMSourceSettings,
  updateUTMTargetSettings,
  updateUTMTermSettings,
} from "../reducers/utm/utmSlice";

// interface ConfigEditorProps {
//   showMe: boolean;
//   // eslint-disable-next-line no-unused-vars
//   callback: (value: boolean) => void;
// }
function ConfigPage(): JSX.Element {
  const dispatch = useDispatch();
  // const { showMe, callback } = props;
  const [targetValidated, setTargetValidated] = useState(false);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const main: MainSettings = useSelector(
    (state: RootState) => state.main.settings
  );
  const session = useSelector((state: RootState) => state.session.settings);
  const qr: QRSettings = useSelector((state: RootState) => state.qr.settings);
  const qrConf: IProps = useSelector(
    (state: RootState) => state.qrCode.settings
  );
  const wifi: WiFiSettings = useSelector(
    (state: RootState) => state.wifi.settings
  );
  const bitly: BitlyConfig = useSelector(
    (state: RootState) => state.bitly.settings
  );
  const utmTarget: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_target
  );
  const utmSource: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_source
  );
  const utmCampaign: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_campaign
  );
  const utmMedium: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_medium
  );
  const utmContent: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_content
  );
  const utmTerm: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_term
  );
  const utmKeyword: UtmObj = useSelector(
    (state: RootState) => state.utmStuff.settings.utm_keyword
  );

  /* handle closing without saving */
  // const handleCancel = () => {
  //   const uc = store.get("utm-config");
  //   if (uc !== null) {
  //     dispatch(updateUTMCampaignSettings(uc.utm_campaign));
  //     dispatch(updateUTMMediumSettings(uc.utm_medium));
  //     dispatch(updateUTMSourceSettings(uc.utm_source));
  //     dispatch(updateUTMTermSettings(uc.utm_term));
  //     dispatch(updateUTMContentSettings(uc.utm_content));
  //     dispatch(updateUTMKeywordSettings(uc.utm_keyword));
  //     dispatch(updateUTMTargetSettings(uc.utm_target));
  //   }
  //   const mset = store.get("main-config");
  //   if (mset !== null) {
  //     dispatch(updateMainSettings(mset));
  //   }
  //   const qr: QRSettings = store.get("qr-config");
  //   if (qr !== null) {
  //     dispatch(updateQRSettings(qr));
  //   }
  //   const qs: IProps = store.get("qr-style");
  //   if (qs !== null) {
  //     dispatch(updateQRStyleSettings(qs));
  //   }
  //   const bc: BitlyConfig = store.get("bitly-config");
  //   if (bc !== null) {
  //     dispatch(updateBitlySettings(bc));
  //   }
  //   // callback(false);
  // };

  /* All done! */
  function callDone() {
    // callback(false);
  }

  /* handle the save button
      @param: event: the event that triggered the save
  */
  const handleSave = (event: SyntheticEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    if (form != null && form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    store.set("main-config", main);
    store.set("qr-config", qr);
    store.set("qr-style", qrConf);
    store.set("wifi-config", wifi);
    store.set("bitly-config", bitly);
    const utmConfig = {
      utm_target: utmTarget,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
      utm_medium: utmMedium,
      utm_content: utmContent,
      utm_term: utmTerm,
      utm_keyword: utmKeyword,
    } as UtmParams;
    store.set("utm-config", utmConfig);
    setTargetValidated(true);
    callDone();
  };

  return (
    <>
      <div className="main-column">
        <div
          className="fullrow"
          style={{ textAlign: "center", paddingBottom: "10px" }}
        >
          <h2 style={{ margin: "auto" }}>Configuration Editor</h2>
        </div>
        {session.license_type === "free" && (
          <div
            className="fullrow"
            style={{ textAlign: "center", paddingBottom: "10px" }}
          >
            <h2 style={{ margin: "auto" }}>
              No Changeable settings for Free version
            </h2>
          </div>
        )}
        <Accordion>
          {/* Fence off for Basic/Enterprise license */}
          {/* General Config */}
          {session.license_type !== "free" &&
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
          {session.license_type !== "free" && (
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
          {session.license_type !== "free" && (
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
        {/* <Modal.Footer>
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
              Close
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
            <Button type="button" variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </OverlayTrigger>
        </Modal.Footer> */}
        {/* </ThemeContext.Provider> */}
      </div>
    </>
  );
}
export default memo(ConfigPage);
