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
import { JSX } from "react";
import { OverlayTrigger, Tooltip, Button, Form } from "react-bootstrap";
import {
  XCircleFill,
  XCircle,
  Hourglass,
  HourglassSplit,
} from "react-bootstrap-icons";
import store from "store2";
import BitlyCheck from "./buttons/BitlyCheck";
import HistoryChooser from "./choosers/HistoryChooser";
import { WiFiLink } from "../types";
import ReactId from "../utils/ReactId";
import { RootState } from "../stores/store";
import { makeLongLink } from "../utils/LongLink";
import { updateFormType } from "../reducers/main/mainSlice";
import {
  setActiveLink,
  setUtmLinkHistory,
  setWifiLinkHistory,
} from "../reducers/history/historySlice";
import { updateQRValue } from "../reducers/qr/qrCodeSettingsSlice";
// import QRConfigButton from "./buttons/QRConfigButton";
import DownloadButton from "./buttons/DownloadButton";
import "../css/Toolbar.css";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

export default function LinkToolbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const mainSet = useAppSelector((state: RootState) => state.main.settings);
  const bitlySettings = useAppSelector(
    (state: RootState) => state.bitly.settings
  );
  const license = useAppSelector((state: RootState) => state.license.settings);
  // fence for basic license
  const linkHistory = useAppSelector(
    (state: RootState) => state.history.linkHistory
  );
  const activeLink = useAppSelector(
    (state: RootState) => state.history.activeLink
  );

  /**
   * Clear the form and start over
   */

  const clearForm = () => {
    switch (mainSet?.formType) {
      case "wifi":
        dispatch(
          setActiveLink({
            ...activeLink,
            ssid: "",
            password: "",
            hidden: false,
            encryption: "nopass",
          })
        );
        dispatch(updateQRValue(""));
        break;
      case "encoded":
        dispatch(
          setActiveLink({
            ...activeLink,
            utm_target: "https://www.example.com/",
            utm_campaign: undefined,
            utm_source: undefined,
            utm_medium: undefined,
            utm_term: undefined,
            utm_content: undefined,
            utm_keyword: undefined,
          })
        );
        dispatch(updateQRValue(""));
        break;
      case "simple":
        dispatch(
          setActiveLink({
            ...activeLink,
            utm_target: "https://www.example.com/",
            utm_campaign: undefined,
            utm_source: undefined,
            utm_medium: undefined,
            utm_term: undefined,
            utm_content: undefined,
            utm_keyword: undefined,
          })
        );
        dispatch(updateQRValue(""));
        break;
      default:
        break;
    }
  };

  /* Fence off for basic license */
  /* Save link to the main process */
  function saveLink(): void {
    if (mainSet?.formType === "wifi") {
      const wfl: WiFiLink = {
        ssid: activeLink?.ssid ? activeLink?.ssid : "",
        encryption: activeLink?.encryption ? activeLink?.encryption : "nopass",
        password: activeLink?.password ? activeLink?.password : "",
        hidden: activeLink?.hidden ? activeLink?.hidden : false,
        uuid: ReactId(),
      };
      const wfLinks = linkHistory.wifi_link ? [...linkHistory.wifi_link] : [];
      wfLinks.push(wfl);
      const l = { ...linkHistory };
      l.wifi_link = wfLinks;
      const h = { ...l, wifi_link: wfLinks };
      store.set("history", h);
      dispatch(setWifiLinkHistory(wfLinks));
    } else {
      // save a utm Link
      const displayLink = {
        long_link: makeLongLink(activeLink),
        short_link: activeLink?.short_link ? activeLink?.short_link : "",
        uuid: ReactId(),
        utm_target: activeLink?.utm_target ? activeLink?.utm_target : undefined,
        utm_campaign: activeLink?.utm_campaign
          ? activeLink?.utm_campaign
          : undefined,
        utm_source: activeLink?.utm_source ? activeLink?.utm_source : undefined,
        utm_medium: activeLink?.utm_medium ? activeLink?.utm_medium : undefined,
        utm_term: activeLink?.utm_term ? activeLink?.utm_term : undefined,
        utm_content: activeLink?.utm_content
          ? activeLink?.utm_content
          : undefined,
        utm_keyword: activeLink?.utm_keyword
          ? activeLink?.utm_keyword
          : undefined,
      };
      const utmLinks = linkHistory.utm_link ? [...linkHistory.utm_link] : [];
      utmLinks.push(displayLink);
      const l = { ...linkHistory, utm_link: utmLinks };
      store.set("history", l);
      dispatch(setUtmLinkHistory(utmLinks));
    }
  }
  /* End fence */

  /**
   *
   * @param value the value of the form type
   */
  const saveFormType = (value: string) => {
    const ms = { ...mainSet };
    ms.formType = value as "simple" | "encoded" | "wifi";
    dispatch(updateFormType(value as "simple" | "encoded" | "wifi"));
    store.set("main-config", ms);
  };

  return (
    <>
      <Form>
        <div className="fullrow">
          {/* fence for basic & free licenses */}
          {/* bitly enable */}
          {license.license_type !== "basic" &&
          license.license_type !== "free" &&
          bitlySettings.use_value &&
          mainSet?.formType !== "wifi" ? (
            <div className="col15">
              <BitlyCheck />
            </div>
          ) : null}
          {/* end fence */}
          {/* QR Type selector */}
          <div className="col30" style={{ fontSize: 14 }}>
            <Form.Select
              className={darkClass}
              // size="lg"
              required
              aria-label="What kind of link do you want to make?"
              id="link-type"
              disabled={false}
              onChange={(e) => {
                if (e.target.value === "Choose one ...") {
                  return;
                }
                saveFormType(e.target.value);
              }}
              value={mainSet?.formType}
            >
              <option key="none" value="Choose one ...">
                Choose One ...
              </option>
              <option key="simple" value="simple">
                Simple Link
              </option>
              <option key="encoded" value="encoded">
                Trackable Link
              </option>
              <option key="wifi" value="wifi">
                WiFi QR Code
              </option>
            </Form.Select>
          </div>
          {/* fence for Basic License */}
          {/* history button */}
          <div className="col30">
            {license.license_type !== "free" && <HistoryChooser />}
          </div>
          {/* end fence */}
          <div className="col30">
            <div className="button-row">
              {/* download QR Code BUtton */}
              <div className="button-column">
                <DownloadButton />
              </div>
              {/* config button */}
              {/* <div className="button-column">
                <QRConfigButton />
              </div> */}
              {/* fence for basic license */}
              {/* save button */}
              {license.license_type !== "free" && (
                <div className="button-column">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      <Tooltip id="save-btn-tooltip">
                        Save the current link to your history.
                      </Tooltip>
                    }
                  >
                    <Button
                      // size="sm"
                      id="save-btn"
                      variant={dark ? "icon-only-dark" : "icon-only"}
                      onClick={() => saveLink()}
                      className={darkClass}
                    >
                      {dark ? <Hourglass /> : <HourglassSplit />}
                    </Button>
                  </OverlayTrigger>
                </div>
              )}
              {/* end fence */}
              {/* clear button */}
              <div className="button-column">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="clear-btn-tooltip">
                      Clear the form and start over.
                    </Tooltip>
                  }
                >
                  <Button
                    // size="sm"
                    variant={dark ? "icon-only-dark" : "icon-only"}
                    color={dark ? "#adb5bd" : "#0B3665"}
                    className={dark ? "header-stuff-dark" : "header-stuff"}
                    onClick={clearForm}
                  >
                    {dark ? <XCircle /> : <XCircleFill />}
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
        {/* </Col> */}
        {/* </Row> */}
      </Form>
    </>
  );
}
