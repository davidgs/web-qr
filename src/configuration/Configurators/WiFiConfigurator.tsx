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
import React from "react";
import {
  Accordion,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ReactId from "../../utils/ReactId";
import {
  updateSSIDAriaLabel,
  updateSSIDLabel,
} from "../../reducers/wifi/wifiSlice";
import { updateTooltip } from "../../reducers/bitly/bitlySlice";
import { RootState } from "../../stores/store";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";

export default function WiFiConfigurator(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const settings = useAppSelector((state: RootState) => state.wifi);

  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  return (
    <Accordion.Body id="wifi-settings">
      <Form noValidate>
        <div className="fullrow">
          <Form.Label className={darkClass}>
            <strong>SSID Form Field:</strong>
          </Form.Label>
        </div>
        <div className="fullrow">
          <Form.Label className={darkClass}>
            <strong>SSID Field Label:</strong>
          </Form.Label>
        </div>
        <div className="fullrow">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 300 }}
            overlay={
              <Tooltip id={ReactId()}>
                How do you ant the SSID field label to read?
              </Tooltip>
            }
          >
            <FormControl
              required
              className={darkClass}
              type="text"
              size="sm"
              id={ReactId()}
              aria-label="SSID Field Label"
              aria-describedby="How do you ant the SSID field label to read?"
              value={settings.ssid.label}
              onChange={(e) => {
                dispatch(updateSSIDLabel(e.target.value));
              }}
            />
          </OverlayTrigger>
        </div>
        {/* SSID Tooltip */}
        <div className="fullrow">
          <Form.Label className={darkClass}>
            <strong>SSID Form Tooltip:</strong>
          </Form.Label>
        </div>
        <div className="fullrow">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 300 }}
            overlay={
              <Tooltip id={ReactId()}>
                What do you want the tooltip to read?
              </Tooltip>
            }
          >
            <FormControl
              required
              className={darkClass}
              type="text"
              size="sm"
              id={ReactId()}
              aria-label="SSID Tooltip"
              aria-describedby="What do you want the tooltip to read?"
              value={settings.ssid.tooltip}
              onChange={(e) => {
                dispatch(updateTooltip(e.target.value));
              }}
            />
          </OverlayTrigger>
        </div>
        {/* SSID Arial Label */}
        <div className="fullrow">
          <Form.Label className={darkClass}>
            <strong>SSID Form ARIA Label:</strong>
          </Form.Label>
        </div>
        <div className="fullrow">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 300 }}
            overlay={
              <Tooltip id={ReactId()}>
                Enter the Aria Label (Accessibility) for the SSID Form Field?
              </Tooltip>
            }
          >
            <FormControl
              required
              className={darkClass}
              type="text"
              size="sm"
              id={ReactId()}
              aria-label={settings.ssid.ariaLabel}
              aria-describedby="What do you want the Aria to read?"
              value={settings.ssid.ariaLabel}
              onChange={(e) => {
                dispatch(updateSSIDAriaLabel(e.target.value));
              }}
            />
          </OverlayTrigger>
        </div>
        {/* item Error */}
      </Form>
    </Accordion.Body>
  );
}
