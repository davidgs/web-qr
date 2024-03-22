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
import { Accordion, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Checker from "../../components/buttons/Checker";
import { RootState } from "../../stores/store";
import "../../css/MainConfig.css";
import {
  updateAriaLabel,
  updateDomain,
  updateLabel,
  updateToken,
  updateTooltip,
  updateURL,
  updateUseValue,
} from "../../reducers/bitly/bitlySlice";
import store from "store2";
import { useAppSelector } from "../../stores/hooks";
import { setSettingsUpdated } from "../../reducers/session/loginSlice";

export default function BitlyConfigurator({
  eKey,
}: {
  eKey: string;
}) {
  const dispatch = useDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const session = useAppSelector((state: RootState) => state.session);
  const bitly_settings = useAppSelector((state: RootState) => state.bitly);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const type: string = "Link Shortener";

  return (
    <Accordion.Item eventKey={eKey}>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 300 }}
        overlay={
          <Tooltip id={`${type}-accordion`}>
            Edit configuration for {bitly_settings.settings.type}
          </Tooltip>
        }
      >
        <Accordion.Header className={darkClass}>
          <strong>{type} Configuration</strong>
        </Accordion.Header>
      </OverlayTrigger>
      <Accordion.Body id={bitly_settings.settings.type}>
        <Form noValidate>
          <div className="main-settings-row">
            <div className="bitly-settings">
              {/* item Use Value */}
              <div className="bitly-settings-row">
                <div className={`${darkClass} text-label`}>
                  <Form.Label
                    className={darkClass}
                  >{`Use '${bitly_settings.settings.type}'?`}</Form.Label>
                </div>
                <div className="check-column">
                  <Checker
                    cState={bitly_settings.settings.use_value}
                    disabled={false}
                    label=""
                    tooltip={
                      bitly_settings.settings.use_value
                        ? `Uncheck to not the use the '${bitly_settings.settings.type}'`
                        : `Check to use the '${bitly_settings.settings.type}'`
                    }
                    callback={(e) => {
                      dispatch(setSettingsUpdated(bitly_settings.settings.use_value !== e));
                      dispatch(updateUseValue(e));
                    }}
                  />
                </div>
              </div>
              {bitly_settings.settings.use_value && (
                <>
                  {/* Link Shortener Type */}
                  {/* item link shortener URL */}
                  <div className="bitly-settings-row">
                    <div className="text-label">
                      <Form.Label className={darkClass}>
                        <strong>Link Shortener URL</strong>
                      </Form.Label>
                    </div>
                    <div className="text-column">
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip
                            id={`${bitly_settings.settings.type}-error-tooltip`}
                          >
                            Enter the URL for your link shortener
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          className={darkClass}
                          type="text"
                          id={`${type}-url`}
                          placeholder={bitly_settings.settings.bitly_addr}
                          value={bitly_settings.settings.bitly_addr}
                          onChange={(e) => {
                              dispatch(setSettingsUpdated(bitly_settings.settings.bitly_addr !==
                              e.target.value));
                            dispatch(updateURL(e.target.value));
                          }}
                        />
                      </OverlayTrigger>
                    </div>
                  </div>

                  {/* item link shortener Domain */}
                  {/* Fence off for Enterprise License */}
                  {(session.license_type === "pro" ||
                    session.license_type === "enterprise") && (
                    <div className="bitly-settings-row">
                      <div className="text-label">
                        <Form.Label className={darkClass}>
                          <strong>Short Link Domain (if any)</strong>
                        </Form.Label>
                      </div>

                      <div className="text-column">
                        <OverlayTrigger
                          placement="auto"
                          delay={{ show: 250, hide: 300 }}
                          overlay={
                            <Tooltip
                              id={`${bitly_settings.settings.type}-domain-tooltip`}
                            >
                              Enter the custom domain for your link shortener
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            className={darkClass}
                            type="text"
                            id={`${type}-domain`}
                            placeholder={bitly_settings.settings.bitly_domain}
                            value={bitly_settings.settings.bitly_domain}
                            onChange={(e) => {
                               dispatch(setSettingsUpdated(bitly_settings.settings.bitly_domain !==
                                e.target.value));
                              dispatch(updateDomain(e.target.value));
                            }}
                          />
                        </OverlayTrigger>
                      </div>
                    </div>
                  )}
                  {/* end fence */}
                  {/* Link Shortener token */}
                  <div className="bitly-settings-row">
                    <div className="text-label">
                      <Form.Label className={darkClass}>
                        <strong>Link Shortener API Token</strong>
                      </Form.Label>
                    </div>
                    <div className="text-column">
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 300 }}
                        overlay={
                          <Tooltip
                            id={`${bitly_settings.settings.type}-token-tooltip`}
                          >
                            Enter the API Token for your link shortener
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          className={darkClass}
                          type="password"
                          id={`${type}-token`}
                          placeholder={bitly_settings.settings.bitly_token}
                          value={bitly_settings.settings.bitly_token}
                          onChange={(e) => {
                            dispatch(setSettingsUpdated(bitly_settings.settings.bitly_token !==
                              e.target.value));
                            dispatch(updateToken(e.target.value));
                          }}
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                  {/* item Label */}
                  {session.license_type === "enterprise" && (
                    <>
                      <div className="bitly-settings-row">
                        <div className="text-label">
                          <Form.Label className={darkClass}>
                            <strong>Label</strong>
                          </Form.Label>
                        </div>
                        <div className="text-column">
                          <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 300 }}
                            overlay={
                              <Tooltip
                                id={`${bitly_settings.settings.type}-label-tooltip`}
                              >
                                Enter the label for the{" "}
                                {bitly_settings.settings.type} {type} field
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              className={darkClass}
                              type="text"
                              width="100%"
                              id={`${type}-label`}
                              placeholder={`Enter ${bitly_settings.settings.type} ${type} field label`}
                              value={bitly_settings.settings.label}
                              onChange={(e) => {
                                dispatch(setSettingsUpdated(bitly_settings.settings.label !== e.target.value));
                                dispatch(updateLabel(e.target.value));
                              }}
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="bitly-settings-row">
                        <div className="text-label">
                          <Form.Label className={darkClass}>
                            <strong>ToolTip Text</strong>
                          </Form.Label>
                        </div>
                        <div className="text-column">
                          <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 300 }}
                            overlay={
                              <Tooltip id={`${type}-tooltip-tooltip`}>
                                Enter the tooltip text for the{" "}
                                {bitly_settings.settings.type} field
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              className={darkClass}
                              type="text"
                              id={`${type}-tooltip`}
                              placeholder={`Enter ${bitly_settings.settings.type} field tooltip`}
                              value={bitly_settings.settings.tooltip}
                              onChange={(e) => {
                                dispatch(setSettingsUpdated(bitly_settings.settings.tooltip !== e.target.value));
                                dispatch(updateTooltip(e.target.value));
                              }}
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="bitly-settings-row">
                        <div className="text-label">
                          <Form.Label className={darkClass}>
                            <strong>ARIA (Accessibility) Text</strong>
                          </Form.Label>
                        </div>
                        <div className="text-column">
                          <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 300 }}
                            overlay={
                              <Tooltip id={`${type}-aria-tooltip`}>
                                Enter the ARIA (Accessibility) text for the{" "}
                                {bitly_settings.settings.type}: {type} field
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              className={darkClass}
                              type="text"
                              id={`${type}-aria`}
                              placeholder={`Enter ${bitly_settings.settings.type} ${type} field ARIA (Accessibility) label`}
                              required
                              value={bitly_settings.settings.aria_label}
                              onChange={(e) => {
                                dispatch(setSettingsUpdated(bitly_settings.settings.aria_label !== e.target.value));
                                dispatch(updateAriaLabel(e.target.value));
                              }}
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                      {/* item Error */}
                      {/* item Aria */}
                      <div className="bitly-settings-row">
                        <div className="text-label">
                          <Form.Label className={darkClass}>
                            <strong>Error Feedback Text</strong>
                          </Form.Label>
                        </div>
                        <div className="text-column">
                          <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 300 }}
                            overlay={
                              <Tooltip id={`${type}-aria-tooltip`}>
                                Enter the Error text for the{" "}
                                {bitly_settings.settings.type}: {type} field
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              className={darkClass}
                              type="text"
                              id={`${type}-error`}
                              placeholder={`Enter ${bitly_settings.settings.type} ${type} field error text`}
                              required
                              value={bitly_settings.settings.error}
                              onChange={(e) => {
                                dispatch(setSettingsUpdated(bitly_settings.settings.error !== e.target.value));
                                dispatch(updateAriaLabel(e.target.value));
                              }}
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
