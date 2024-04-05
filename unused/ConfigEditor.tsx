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
import Button from "react-bootstrap/Button";
import { Accordion, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import "primereact/resources/primereact.min.css";
import store from "store2";
import "../css/hyde.css";
import BitlyConfigurator from "../src/configuration/Configurators/BitlyConfigurator";
import MainValuesConfigurator from "../src/configuration/Configurators/MainValuesConfigurator";
import UTMConfigurator from "../src/configuration/Configurators/UTMConfigurator";
import QRConfigurator from "../src/configuration/Configurators/QRConfigurator";
import { RootState } from "../src/stores/store";
import {
  BitlyConfig,
  MainSettings,
  UtmObj,
  UtmParams,
  WiFiSettings,
  QProps,
} from "../src/types";
import { updateBitlySettings } from "../src/reducers/bitly/bitlySlice";
import { updateMainSettings } from "../src/reducers/main/mainSlice";
import { updateQRStyleSettings } from "../src/reducers/qr/qrCodeSettingsSlice";
import {
  updateUTMCampaignSettings,
  updateUTMContentSettings,
  updateUTMKeywordSettings,
  updateUTMMediumSettings,
  updateUTMSourceSettings,
  updateUTMTargetSettings,
  updateUTMTermSettings,
} from "../src/reducers/utm/utmSlice";
import { useAppDispatch, useAppSelector } from "../src/stores/hooks";

interface ConfigEditorProps {
  showMe: boolean;
  // eslint-disable-next-line no-unused-vars
  callback: (value: boolean) => void;
}
function ConfigEditor(props: ConfigEditorProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { showMe, callback } = props;
  const [targetValidated, setTargetValidated] = useState(false);
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const main: MainSettings = useAppSelector(
    (state: RootState) => state.main.settings
  );
  const qrConf: QProps = useAppSelector((state: RootState) => state.qrCode.settings);
  const wifi: WiFiSettings = useAppSelector(
    (state: RootState) => state.wifi.settings
  );
  const bitly: BitlyConfig = useAppSelector((state: RootState) => state.bitly.settings);
  const utmTarget: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_target
  );
  const utmSource: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_source
  );
  const utmCampaign: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_campaign
  );
  const utmMedium: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_medium
  );
  const utmContent: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_content
  );
  const utmTerm: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_term
  );
  const utmKeyword: UtmObj = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_keyword
  );

  /* handle closing without saving */
  const handleCancel = () => {
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
      dispatch(updateMainSettings(mset));
    }
    const qs: QProps = store.get("qr-style");
    if (qs !== null) {
      dispatch(updateQRStyleSettings(qs));
    }
    const bc: BitlyConfig = store.get("bitly-config");
    if (bc !== null) {
      dispatch(updateBitlySettings(bc));
    }
    callback(false);
  };

  /* All done! */
  function callDone() {
    callback(false);
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
      <Modal
        show={showMe}
        onHide={handleCancel}
        size="xl"
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuration Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                </Accordion.Header>
              </OverlayTrigger>
              <Accordion.Body id="general">
                <Accordion>
                  {/* Bitly Configuration */}
                  <BitlyConfigurator
                    eKey="0" />
                  {/* Fence off for Enterprise License */}
                  {/* UI Images */}
                  <MainValuesConfigurator targetValidated={targetValidated} />
                  {/* End fence */}
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
                </Accordion.Header>
              </OverlayTrigger>
              <QRConfigurator />
            </Accordion.Item>
            {/* End fence */}
            {/* WiFi Form Configuration */}
            {/* <Accordion.Item eventKey="2">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="wifi-tooltip">
                    Configuration settings for the WiFi Form
                  </Tooltip>
                }
              >
                <Accordion.Header className={darkClass}>
                  <strong>WiFi Form Configuration</strong>
                </Accordion.Header>
              </OverlayTrigger>
              <WiFiConfigurator eKey="2" />
            </Accordion.Item> */}
            {/* Fence off for Basic/Enterprise License */}
            {/* UTM Codes */}
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
            {/* End fence */}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
      {/* </ThemeContext.Provider> */}
    </>
  );
}
export default memo(ConfigEditor);
