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
import { Accordion, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Checker from '../../components/buttons/Checker';
import {
  updateTooltip,
  updateLabel,
  updateAriaLabel,
  updateDomain,
  updateToken,
  updateType,
  updateURL,
  updateUseValue,
  updateError,
} from '../../reducers/bitly/bitlySlice';
import { RootState } from '../../stores/store';

export default function BitlyConfigurator({ eKey }: { eKey: string }) {
  const dark = useSelector((state: RootState) => state.dark.dark);
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.bitly.settings);

  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  const type: string = 'Link Shortener';

  return (
    <Accordion.Item eventKey={eKey}>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 300 }}
        overlay={
          <Tooltip id={`${type}-accordion`}>
            Edit configuration for {settings.type}
          </Tooltip>
        }
      >
        <Accordion.Header className={darkClass}>
          <strong>{type} Configuration</strong>
        </Accordion.Header>
      </OverlayTrigger>
      <Accordion.Body id={settings.type}>
        <Form noValidate>
          {/* item Use Value */}
          <div className="fullrow">
            <div className={`${darkClass} col30`}>
              <Form.Label
                className={darkClass}
              >{`Use '${settings.type}'?`}</Form.Label>
            </div>
            <div className="col10">
              <Checker
                cState={settings.useValue}
                disabled={false}
                label=""
                tooltip={
                  settings.useValue
                    ? `Uncheck to not the use the '${settings.type}'`
                    : `Check to use the '${settings.type}'`
                }
                callback={(e) => dispatch(updateUseValue(e))}
              />
            </div>
            <div className="col60" />
          </div>
          {settings.useValue && (
            <>
              {/* Link Shortener Type */}
              <div className="fullrow">
                <div className="col30">
                  <Form.Label
                    className={darkClass}
                  >{`Choose '${type}'?`}</Form.Label>
                </div>
                <div className="col15">
                  <Form.Select
                    className={darkClass}
                    size="sm"
                    required
                    aria-label={settings.ariaLabel}
                    id={type}
                    disabled={false}
                    onChange={(eventKey) => {
                      if (eventKey.target.value === "Choose one ...") {
                        // returnVal('');
                        return;
                      }
                      dispatch(updateType(eventKey.target.value));
                    }}
                    value={settings.type}
                  >
                    <option key="none" value="Choose one ...">
                      Choose One ...
                    </option>
                    <option key="bitly" value="bitly">
                      Bitly
                    </option>
                    <option key="tinyurl" value="yourls">
                      YOURLS
                    </option>
                  </Form.Select>
                </div>
                <div className="col50" />
                <div className="col5" />
              </div>
              {/* item link shortener URL */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>Link Shortener URL</strong>
                </Form.Label>
              </div>
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${settings.type}-error-tooltip`}>
                      Enter the URL for your link shortener
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${type}-error`}
                    placeholder={settings.bitlyAddr}
                    value={settings.bitlyAddr}
                    onChange={(e) => {
                      dispatch(updateURL(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item link shortener Domain */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>Short Link Domain (if any)</strong>
                </Form.Label>
              </div>
              {/* Fence off for Enterprise License */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${settings.type}-error-tooltip`}>
                      Enter the custom domain for your link shortener
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${type}-error`}
                    placeholder={settings.bitlyDomain}
                    value={settings.bitlyDomain}
                    onChange={(e) => {
                      dispatch(updateDomain(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* end fence */}
              {/* Link Shortener token */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>Link Shortener API Token</strong>
                </Form.Label>
              </div>
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${settings.type}-error-tooltip`}>
                      Enter the API Token for your link shortener
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="password"
                    id={`${type}-error`}
                    placeholder={settings.bitlyToken}
                    value={settings.bitlyToken}
                    onChange={(e) => {
                      dispatch(updateToken(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item Label */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>Label</strong>
                </Form.Label>
              </div>
              {/* item Label Input */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${settings.type}-label-tooltip`}>
                      Enter the label for the {settings.type} {type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    width="100%"
                    id={`${type}-label`}
                    placeholder={`Enter ${settings.type} ${type} field label`}
                    value={settings.label}
                    onChange={(e) => {
                      dispatch(updateLabel(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item Tooltip */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>ToolTip Text</strong>
                </Form.Label>
              </div>
              {/* item Tooltip Input */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${type}-tooltip-tooltip`}>
                      Enter the tooltip text for the {settings.type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${type}-tooltip`}
                    placeholder={`Enter ${settings.type} field tooltip`}
                    value={settings.tooltip}
                    onChange={(e) => {
                      dispatch(updateTooltip(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item Aria */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>ARIA (Accessibility) Text</strong>
                </Form.Label>
              </div>
              {/* item Aria Input */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${type}-aria-tooltip`}>
                      Enter the ARIA (Accessibility) text for the{" "}
                      {settings.type}: {type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${type}-aria`}
                    placeholder={`Enter ${settings.type} ${type} field ARIA (Accessibility) label`}
                    required
                    value={settings.ariaLabel}
                    onChange={(e) => {
                      dispatch(updateAriaLabel(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item Error */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${type}-aria-tooltip`}>
                      Enter the Error text for the {settings.type}: {type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${type}-error`}
                    placeholder={`Enter ${settings.type} ${type} field error text`}
                    required
                    value={settings.ariaLabel}
                    onChange={(e) => {
                      dispatch(updateError(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
            </>
          )}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
