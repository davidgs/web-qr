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
import { JSX, useState, SyntheticEvent } from "react";
import "../../css/Config.css";
import { Accordion, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { UtmKeyValue, UtmObj } from "../../types";
import Checker from "../buttons/Checker";
import { RootState } from "../../stores/store";
import {
  updateCampaignLabel,
  updateCampaignValue,
  updateCampaignAriaLabel,
  updateCampaignError,
  updateCampaignIsChooser,
  updateCampaignShowName,
  updateCampaignTooltip,
  updateCampaignUseValue,
} from "../../reducers/utm/utmSlice";
import PillArea from "../pills/PillArea";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { setSettingsUpdated } from "../../reducers/session/loginSlice";

export default function UTMCampaignAccordian(): JSX.Element {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const session = useAppSelector((state: RootState) => state.license.settings);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const valKind: string = "utm_campaign";
  const itemNo: string = "4";
  const type: string = "UTM Campaign";
  const accValue = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_campaign as UtmObj
  );
  const [kvValue, setKvValue] = useState<string>("");
  const [valValid, setValValid] = useState<boolean>(true);

  const [fieldValue, setFieldValue] = useState<string>(
    accValue.show_name ? `${accValue?.label} (${valKind})` : `${accValue.label}`
  );

  const updateFieldValue = (eventKey: SyntheticEvent) => {
    const target = eventKey.target as HTMLInputElement;
    const v = target.value;
    if (v.indexOf(`(${valKind})`) !== -1) {
      setFieldValue(v);
    } else if (accValue.show_name) {
      setFieldValue(`${v} (${valKind})`);
    } else {
      setFieldValue(v);
    }
    const newV = v.replace(`(${valKind})`, "").trim();
    dispatch(updateCampaignLabel(newV));
    dispatch(setSettingsUpdated(true));
  };
  /**
   * delete a pill value
   * @param value the value to delete
   * */
  const deletePillValue = (value: string) => {
    const newT = Object.entries(accValue as UtmObj);
    const tLen = newT.length;
    const tEntries: UtmKeyValue[] = newT[tLen - 1][1] as UtmKeyValue[];
    for (let t = 0; t < tEntries.length; t += 1) {
      if (tEntries[t].value === value) {
        tEntries.splice(t, 1);
      }
    }
    dispatch(updateCampaignValue(tEntries));
    dispatch(setSettingsUpdated(true));
  };

  /**
   * add a pill value
   */
  const addPill = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setKvValue(target?.value);
    if (!target?.value.includes(",")) {
      return;
    }
    if (target?.value.indexOf("=") === -1) {
      setValValid(false);
      return;
    }
    setKvValue("");
    const newTrm = accValue?.value as UtmKeyValue[];
    const newTrmPill = {
      key: target?.value?.replace(/,/g, "").split("=")[1].trim(),
      value: target?.value?.replace(/,/g, "").split("=")[0].trim(),
    };
    newTrm.push(newTrmPill);
    dispatch(updateCampaignValue(newTrm));
    dispatch(setSettingsUpdated(true));
  };

  return (
    <Accordion.Item eventKey={`"${itemNo}"`}>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 300 }}
        overlay={
          <Tooltip id={`${valKind}-accordion`}>
            Edit configuration for {type}
          </Tooltip>
        }
      >
        <Accordion.Header className={darkClass}>
          <strong>{type}</strong>
          <span style={{ marginTop: ".5rem" }}>
            {session.license_type === "free" ? (
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="brand-tooltip">
                    UTM Code Settings for paid Customers only.
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
      <Accordion.Body id={type}>
        <Form noValidate>
          <div className="fullrow">
            <div className="col30">
              <Form.Label
                className={darkClass}
              >{`Use '${valKind}' value?`}</Form.Label>
            </div>
            <div className="col10">
              <Checker
                cState={accValue.use_value}
                disabled={session.license_type === "free"}
                label=""
                tooltip={
                  accValue.use_value
                    ? `Uncheck to not the use the '${valKind}' value`
                    : `Check to use the '${valKind}' value`
                }
                callback={(value) => {
                  dispatch(updateCampaignUseValue(value));
                  dispatch(setSettingsUpdated(accValue.use_value !== value));
                }}
              />
            </div>
            <div className="col60" />
          </div>
          {accValue?.use_value && (
            <>
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
                    <Tooltip id={`${type}-label-tooltip`}>
                      Enter the label for the {type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    disabled={session.license_type !== "enterprise"}
                    type="text"
                    width="100%"
                    id={`${valKind}-label`}
                    placeholder={`Enter ${valKind} field label`}
                    value={fieldValue}
                    onChange={updateFieldValue}
                  />
                </OverlayTrigger>
              </div>
              {/* item Show Name */}
              <div className="fullrow">
                <div className="col30">
                  <Form.Label className={darkClass}>
                    {accValue.show_name
                      ? `Hide '${type}' in Field Label?`
                      : `Show '${type}' in Field Label`}
                  </Form.Label>
                </div>
                <div className="col10">
                  <Checker
                    cState={accValue.show_name ? accValue.show_name : false}
                    disabled={session.license_type !== "enterprise"}
                    label=""
                    tooltip={
                      accValue.show_name
                        ? "Uncheck to hide the field name in the field label"
                        : "Check to show the field name in the field label"
                    }
                    callback={(value) => {
                      if (value) {
                        setFieldValue(`${accValue?.label} (${type})`);
                      } else {
                        setFieldValue(`${accValue?.label}`);
                      }
                      dispatch(updateCampaignShowName(value));
                      dispatch(
                        setSettingsUpdated(accValue.show_name !== value)
                      );
                    }}
                  />
                </div>
                <div className="col60" />
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
                    <Tooltip id={`${valKind}-tooltip-tooltip`}>
                      Enter the tooltip text for the {valKind} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    disabled={session.license_type !== "enterprise"}
                    id={`${valKind}-tooltip`}
                    placeholder={`Enter ${valKind} field tooltip`}
                    value={accValue.tooltip ? accValue.tooltip : ""}
                    onChange={(e) => {
                      dispatch(updateCampaignTooltip(e.target.value));
                      dispatch(
                        setSettingsUpdated(accValue.tooltip !== e.target.value)
                      );
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
                    <Tooltip id={`${valKind}-aria-tooltip`}>
                      Enter the ARIA (Accessibility) text for the {valKind}{" "}
                      field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${valKind}-aria`}
                    placeholder={`Enter ${valKind} field ARIA (Accessibility) label`}
                    required
                    disabled={session.license_type !== "enterprise"}
                    value={accValue.aria_label}
                    onChange={(e) => {
                      dispatch(updateCampaignAriaLabel(e.target.value));
                      dispatch(
                        setSettingsUpdated(
                          accValue.aria_label !== e.target.value
                        )
                      );
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* item Error */}
              <div className="fullrow">
                <Form.Label className={darkClass}>
                  <strong>Error Text</strong>
                </Form.Label>
              </div>
              {/* item Error Input */}
              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id={`${valKind}-error-tooltip`}>
                      Enter the error text for the {valKind} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    disabled={session.license_type !== "enterprise"}
                    id={`${valKind}-error`}
                    placeholder={`Enter ${valKind} field error text`}
                    value={accValue.error}
                    onChange={(e) => {
                      dispatch(updateCampaignError(e.target.value));
                      dispatch(
                        setSettingsUpdated(accValue.error !== e.target.value)
                      );
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* Fence off for Enterprise License */}
              {/* use chooser or txt */}
              <div className="fullrow">
                {accValue?.use_value ? (
                  <div className="fullrow">
                    <div className="col15">
                      <Form.Label className={darkClass}>Use Chooser</Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={accValue.is_chooser}
                        disabled={
                          session.license_type === "free" ||
                          session.license_type === "basic"
                        }
                        label=""
                        tooltip={`Use a chooser to create a pre-defined list of allowed values for ${valKind}`}
                        callback={(value) => {
                          dispatch(updateCampaignIsChooser(value));
                          dispatch(
                            setSettingsUpdated(accValue.is_chooser !== value)
                          );
                        }}
                      />
                    </div>
                    <div className="col5" />
                    <div className="col15">
                      <Form.Label className={darkClass}>
                        Use Text Field
                      </Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={!accValue.is_chooser}
                        disabled={
                          session.license_type === "free" ||
                          session.license_type === "basic"
                        }
                        label=""
                        tooltip={`Use a Text Field to allow the user to enter any value for ${valKind}`}
                        callback={(value) => {
                          dispatch(updateCampaignIsChooser(!value));
                          dispatch(
                            setSettingsUpdated(accValue.is_chooser !== !value)
                          );
                        }}
                      />
                    </div>
                    <div className="col5" />
                    <div className="col50" />
                  </div>
                ) : (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <></>
                )}
                {/* </>
                ) : (
                  <></>
                )} */}
              </div>
              {/* item Values */}
              {accValue.is_chooser && (
                <>
                  <div className="fullrow">
                    <Form.Label className={darkClass}>
                      <strong>{`${valKind} Values`}</strong>
                    </Form.Label>
                  </div>
                  <div className="fullrow">
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip id={`${valKind}-values-tooltip`}>
                          Create a predefined list of values for the {valKind}{" "}
                          field
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        className={darkClass}
                        disabled={
                          session.license_type === "free" ||
                          session.license_type === "basic"
                        }
                        type="text"
                        placeholder="Enter comma-separated list of key=value pairs to use"
                        value={kvValue || ""}
                        required
                        id={`${valKind}-values`}
                        isInvalid={!valValid}
                        onChange={(eventKey) => {
                          addPill(eventKey);
                        }}
                      />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid">
                      You must provide a key=value pair.
                    </Form.Control.Feedback>
                  </div>
                  <div className="fullrow">
                    <PillArea
                      pills={
                        accValue.value
                          ? (accValue.value as UtmKeyValue[])
                          : ([] as UtmKeyValue[])
                      }
                      type={valKind}
                      callback={deletePillValue}
                    />
                  </div>
                </>
              )}
              {/* end Fence off for Enterprise License */}
            </>
          )}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
