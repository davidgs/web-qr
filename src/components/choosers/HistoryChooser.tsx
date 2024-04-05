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
import { JSX, SyntheticEvent, useMemo, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import store from "store2";
import { RootState } from "../../stores/store";
import { setActiveLink } from "../../reducers/history/historySlice";
import DireWarning from "../../configuration/DireWarning";
import { WiFiLink, utmLink } from "../../types";
import ReactId from "../../utils/ReactId";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";

export default function HistoryChooser(): JSX.Element {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const [displayValue, setDisplayValue] = useState<string>("History...");
  const [showDireWarning, setShowDireWarning] = useState(false);
  const links = useAppSelector((state: RootState) => state.history.linkHistory);
  const main = useAppSelector((state: RootState) => state.main.settings);
  const activeLink = useAppSelector(
    (state: RootState) => state.history.activeLink
  );

  /**
   * Create the Link history items for the dropdown
   */
  const historyItems = useMemo<JSX.Element[]>(() => {
    const items: JSX.Element[] = [];
    const utH = links?.utm_link;
    if (utH === undefined || utH.length === 0) {
      return items;
    }
    // eslint-disable-next-line array-callback-return
    utH?.map((item: utmLink) => {
      items.push(
        <option
          color={dark ? "#adb5bd" : "#0B3665"}
          id={`${item.uuid}`}
          key={`${item.uuid}`}
          value={item.uuid}
        >
          {item.short_link ? item.short_link : item.long_link}
        </option>
      );
    });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  const clearHistory = (): void => {
    store.set("history", { utm_link: [], wifi_link: [] });
  };

  /* Show a dire warning */
  const dire = (): void => {
    setShowDireWarning(false);
    clearHistory();
  };
  /**
   * Create the WiFi history items for the dropdown
   */
  const wifiItems = useMemo<JSX.Element[]>(() => {
    const items: JSX.Element[] = [];
    const utH = links?.wifi_link;
    if (utH === undefined) {
      return items;
    }
    // eslint-disable-next-line array-callback-return
    utH?.map((item: WiFiLink) => {
      items.push(
        <option
          color={dark ? "#adb5bd" : "#0B3665"}
          id={`${item.uuid}`}
          key={`${item.uuid}`}
          value={item.uuid}
        >
          {item.ssid}
        </option>
      );
    });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  const valueChanged = (eventKey: SyntheticEvent) => {
    const target = eventKey.target as HTMLInputElement;
    if (target.value === "clear-history") {
      setShowDireWarning(true);
      return;
    }
    setDisplayValue(target.value);
    const v = target.value;
    if (main?.formType === "wifi") {
      const wLinks: WiFiLink[] = { ...(links?.wifi_link as WiFiLink[]) };
      let i = 0;
      while (wLinks[i] !== undefined) {
        if (wLinks[i].uuid === v) {
          dispatch(
            setActiveLink({
              ...activeLink,
              ssid: wLinks[i].ssid,
              password: wLinks[i].password,
              hidden: wLinks[i].hidden,
              encryption: wLinks[i].encryption,
            })
          );
          break;
        }
        i += 1;
      }
    } else {
      const uLinks: utmLink[] = { ...(links?.utm_link as utmLink[]) };
      let i = 0;
      while (uLinks[i] !== undefined) {
        if (uLinks[i].uuid === v) {
          dispatch(
            setActiveLink({
              ...activeLink,
              utm_target: uLinks[i].utm_target,
              utm_campaign: uLinks[i].utm_campaign,
              utm_source: uLinks[i].utm_source,
              utm_medium: uLinks[i].utm_medium,
              utm_term: uLinks[i].utm_term,
              utm_content: uLinks[i].utm_content,
              utm_keyword: uLinks[i].utm_keyword,
              short_link: uLinks[i].short_link,
              long_link: uLinks[i].long_link,
            })
          );
          break;
        }
        i += 1;
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 300 }}
        overlay={
          links?.utm_link?.length > 0 || links?.wifi_link?.length > 0 ? (
            <Tooltip id="history-tooltip">All of your saved links</Tooltip>
          ) : (
            <Tooltip id="history-empty-tooltip">No saved links</Tooltip>
          )
        }
      >
        <Form.Select
          // variant={dark ? 'icon-only-dark' : 'icon-only'}
          // size="lg"
          disabled={
            links?.utm_link?.length === 0 && links?.wifi_link?.length === 0
          }
          color={dark ? "#adb5bd" : "#0B3665"}
          className={darkClass}
          id="dropdown-basic-button"
          title={displayValue}
          onChange={(eventKey) => {
            valueChanged(eventKey);
          }}
          value={displayValue}
        >
          <option
            style={{ color: "red" }}
            id={`clear-list-${ReactId()}`}
            key={`clear-list-${ReactId()}`}
            value="clear-history"
          >
            {main?.formType === "wifi" ? "WiFi Network" : "Link"} History
          </option>
          <option
            style={{ color: "red" }}
            id={`clear-list-${ReactId()}`}
            key={`clear-list-${ReactId()}`}
            value="clear-history"
          >
            Clear History
          </option>
          {main?.formType === "wifi" ? wifiItems : historyItems}
        </Form.Select>
      </OverlayTrigger>
      <DireWarning
        show={showDireWarning}
        onHide={setShowDireWarning}
        onConfirm={dire}
      />
    </div>
  );
}
