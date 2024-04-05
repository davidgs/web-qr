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
import { JSX, useState, SyntheticEvent, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import { UtmKeyValue, UtmObj } from "../types";
import Checker from "../components/buttons/Checker";
import PillArea from "./pills/PillArea";

interface UtmAccordianProps {
  type: string;
  value: UtmObj;
  itemNo: string;
  // eslint-disable-next-line no-unused-vars
  callback: (type: string, value: UtmObj) => void;
}

export default function UTMAccordianItem(
  props: UtmAccordianProps
): JSX.Element {
  const { type, value, itemNo, callback } = props;
  const [accValue, setAccValue] = useState<UtmObj>(value as UtmObj);
  const [kvValue, setKvValue] = useState<string>("");
  const [valValid, setValValid] = useState<boolean>(true);
  const valKind: string =
    type.split("_")[1].charAt(0).toUpperCase() + type.split("_")[1].slice(1);

  useEffect(() => {
    callback(type, accValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accValue]);

  /**
   * delete a pill value
   * @param value the value to delete
   * */
  const deletePillValue = (v: string) => {
    const newT = Object.entries(accValue as UtmObj);
    const tLen = newT.length;
    const tEntries: UtmKeyValue[] = newT[tLen - 1][1] as UtmKeyValue[];
    for (let t = 0; t < tEntries.length; t += 1) {
      if (tEntries[t].value === v) {
        tEntries.splice(t, 1);
      }
    }
    setAccValue((prevConfig) => {
      const newConfig = { ...(prevConfig as UtmObj) };
      newConfig.value = tEntries;
      // callback(type, newConfig);
      return newConfig;
    });
  };

  /**
   * add a pill value
   * */
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
    setAccValue((prevConfig) => {
      const newConfig = { ...(prevConfig as UtmObj) };
      newConfig.value = newTrm;
      return newConfig;
    });
  };

  return (
    <Accordion.Item eventKey={`"${itemNo}"`}>
      <Accordion.Header>
        <strong>{type}</strong>
      </Accordion.Header>
      <Accordion.Body id={type}>
        <Form noValidate>
          <div className="fullrow">
            <div className="col30">
              <Form.Label>{`Use '${type}' value?`}</Form.Label>
            </div>
            <div className="col10">
              <Checker
                cState={accValue?.use_value}
                disabled={false}
                label=""
                tooltip={`Check to enable the use of the '${type}' value`}
                callback={(v) => {
                  setAccValue((prevConfig) => {
                    const newConfig = { ...(prevConfig as UtmObj) };
                    newConfig.use_value = v;
                    callback(type, newConfig);
                    return newConfig;
                  });
                }}
              />
            </div>
            <div className="col60" />
          </div>
          {accValue?.use_value && (
            <>
              {/* item Label */}
              <div className="fullrow">
                <Form.Label>
                  <strong>Label</strong>
                </Form.Label>
              </div>
              {/* item Label Input */}
              <div className="fullrow">
                <Form.Control
                  type="text"
                  width="100%"
                  id={`${type}-label`}
                  placeholder={`Enter ${type} field label`}
                  value={
                    accValue?.show_name
                      ? `${accValue?.label} (${type})`
                      : `${accValue?.label}`
                  }
                  onChange={(e) => {
                    setAccValue((prevConfig) => {
                      const newConfig = { ...(prevConfig as UtmObj) };
                      newConfig.label = e.target.value;
                      callback(type, newConfig);
                      return newConfig;
                    });
                  }}
                />
              </div>
              {/* item Show Name */}
              <div className="fullrow">
                <div className="col30">
                  <Form.Label>{`Show '${type}' in Field Label?`}</Form.Label>
                </div>
                <div className="col10">
                  <Checker
                    cState={accValue?.show_name ? accValue.show_name : false}
                    disabled={false}
                    label=""
                    tooltip="check to show the field name in the field label"
                    callback={(v) => {
                      setAccValue((prevConfig) => {
                        const newConfig = { ...(prevConfig as UtmObj) };
                        newConfig.show_name = v;
                        callback(type, newConfig);
                        return newConfig;
                      });
                    }}
                  />
                </div>
                <div className="col60" />
              </div>
              {/* item Tooltip */}
              <div className="fullrow">
                <Form.Label>
                  <strong>ToolTip Text</strong>
                </Form.Label>
              </div>
              {/* item Tooltip Input */}
              <div className="fullrow">
                <Form.Control
                  type="text"
                  id={`${type}-tooltip`}
                  placeholder={`Enter ${type} field tooltip`}
                  value={accValue?.tooltip ? accValue.tooltip : ""}
                  onChange={(e) => {
                    setAccValue((prevConfig) => {
                      const newConfig = { ...(prevConfig as UtmObj) };
                      newConfig.tooltip = e.target.value;
                      callback(type, newConfig);
                      return newConfig;
                    });
                  }}
                />
              </div>
              {/* item Aria */}
              <div className="fullrow">
                <Form.Label>
                  <strong>ARIA (Accessibility) Text</strong>
                </Form.Label>
              </div>
              {/* item Aria Input */}
              <div className="fullrow">
                <Form.Control
                  type="text"
                  id={`${type}-aria`}
                  placeholder={`Enter ${type} field ARIA (Accessibility) label`}
                  required
                  value={accValue?.aria_label ? accValue.aria_label : ""}
                  onChange={(e) => {
                    setAccValue((prevConfig) => {
                      const newConfig = { ...(prevConfig as UtmObj) };
                      newConfig.aria_label = e.target.value;
                      callback(type, newConfig);
                      return newConfig;
                    });
                  }}
                />
              </div>
              {/* item Error */}
              <div className="fullrow">
                <Form.Label>
                  <strong>Error Text</strong>
                </Form.Label>
              </div>
              {/* item Error Input */}
              <div className="fullrow">
                <Form.Control
                  type="text"
                  id={`${type}-error`}
                  placeholder={`Enter ${type} field error text`}
                  value={accValue?.error ? accValue.error : ""}
                  onChange={(e) => {
                    setAccValue((prevConfig) => {
                      const newConfig = { ...(prevConfig as UtmObj) };
                      newConfig.error = e.target.value;
                      callback(type, newConfig);
                      return newConfig;
                    });
                  }}
                />
              </div>
              {/* use chooser or txt */}
              <div className="fullrow">
                {accValue?.use_value ? (
                  <div className="fullrow">
                    <div className="col15">
                      <Form.Label>Use Chooser</Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={accValue?.is_chooser}
                        disabled={false}
                        label=""
                        tooltip={`Use a chooser to select from a list of ${type} values`}
                        callback={(v) => {
                          setAccValue((prevConfig) => {
                            const newConfig = { ...(prevConfig as UtmObj) };
                            newConfig.is_chooser = v;
                            callback(type, newConfig);
                            return newConfig;
                          });
                        }}
                      />
                    </div>
                    <div className="col5" />
                    <div className="col15">
                      <Form.Label>Use Text Field</Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={!accValue?.is_chooser}
                        disabled={false}
                        label=""
                        tooltip={`Use a Text Field to enter ${type} values`}
                        callback={(v) => {
                          setAccValue((prevConfig) => {
                            const newConfig = { ...(prevConfig as UtmObj) };
                            newConfig.is_chooser = !v;
                            callback(type, newConfig);
                            return newConfig;
                          });
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
              {accValue?.is_chooser && ( // || utmObj?.restrict_bases ? (
                <>
                  <div className="fullrow">
                    <Form.Label>
                      <strong>{`UTM_${valKind} Values`}</strong>
                    </Form.Label>
                  </div>
                  <div className="fullrow">
                    <Form.Control
                      type="text"
                      placeholder="Enter comma-separated list of key=value pairs to use"
                      value={kvValue || ""}
                      required
                      id={`${type}-values`}
                      isInvalid={!valValid}
                      onChange={(eventKey) => {
                        addPill(eventKey);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      You must provide a key=value pair.
                    </Form.Control.Feedback>
                  </div>
                  <div className="fullrow">
                    <PillArea
                      pills={
                        accValue?.value
                          ? (accValue.value as UtmKeyValue[])
                          : ([] as UtmKeyValue[])
                      }
                      type={type}
                      callback={deletePillValue}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
