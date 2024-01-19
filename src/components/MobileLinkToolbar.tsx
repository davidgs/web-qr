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
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { SaveFill, Save, XCircleFill, XCircle } from "react-bootstrap-icons";
import store from "store2";
import BitlyCheck from "./buttons/BitlyCheck";
import HistoryChooser from "./choosers/HistoryChooser";
import { WiFiLink } from "../types";
import ReactId from "../utils/ReactId";
import { RootState } from "../stores/store";
import { makeLongLink } from "../utils/LongLink";
import {
  setActiveLink,
  setUtmLinkHistory,
  setWifiLinkHistory,
} from "../reducers/history/historySlice";
import { updateQRValue } from "../reducers/qr/qrCodeSettingsSlice";
import QRConfigButton from "./buttons/QRConfigButton";
import DownloadButton from "./buttons/DownloadButton";
import FormChooser from "./choosers/FormChooser";

export default function MobileLinkToolbar(): JSX.Element {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.dark?.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const mainSet = useSelector((state: RootState) => state.main?.settings);
  const useBitly = useSelector(
    (state: RootState) => state.bitly?.settings?.useValue
  );
  // fence for basic license
  const linkHistory = useSelector(
    (state: RootState) => state.history?.linkHistory
  );
  const activeLink = useSelector(
    (state: RootState) => state.history?.activeLink
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

  return (
  <>
      {/* fence for basic license */}
      {/* bitly enable */}
      {useBitly && mainSet?.formType !== "wifi" ? <div className='fullrow'><BitlyCheck /></div> : null}
          <div className="fullrow">

            <div className="col75">
        {/* end fence */}
        {/* QR Type selector */}
        <FormChooser />
        {/* fence for Basic License */}
        {/* history button */}
        <div className="fullrow">
          <HistoryChooser />
        </div>
        {/* end fence */}
      </div>
      <div className="col25">
        <div className='fullrow' />
        <div className="fullrow">
          <div className="col10px" />
          {/* download QR Code BUtton */}
          <div className="colauto">
            <DownloadButton />
          </div>
          {/* spacer */}
          <div className="col10px" />
          {/* config button */}
          <div className="colauto">
            <QRConfigButton />
          </div>
        </div>
        <div className="fullrow">
          {/* spacer */}
          <div className="col10px" />
          {/* fence for basic license */}
          {/* save button */}
          <div className="colauto">
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
                size="sm"
                id="save-btn"
                variant={dark ? "icon-only-dark" : "icon-only"}
                onClick={() => saveLink()}
                className={darkClass}
              >
                {dark ? <Save /> : <SaveFill />}
              </Button>
            </OverlayTrigger>
          </div>
          {/* end fence */}
          {/* spacer */}
          <div className="col10px" />
          {/* clear button */}
          <div className="colauto">
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
                size="sm"
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
      </>
  );
}
