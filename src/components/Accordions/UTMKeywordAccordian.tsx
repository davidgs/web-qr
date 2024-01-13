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
import { JSX, useState, SyntheticEvent } from 'react';
import { Accordion, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { UtmKeyValue, UtmObj } from '../../types';
import Checker from '../buttons/Checker';
import { RootState } from '../../stores/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateLabel,
  updateValue,
  updateAriaLabel,
  updateError,
  updateIsChooser,
  updateShowName,
  updateTooltip,
  updateUseValue,
} from '../../reducers/utm/utmKeywordSlice';
import PillArea from '../pills/PillArea';

export default function UTMKeywordAccordian(): JSX.Element {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  const valKind: string = 'utm_keyword';
  const itemNo: string = '6';
  const type: string = 'UTM Keyword';
  const accValue = useSelector(
    (state: RootState) => state.utmKeyword.settings as UtmObj,
  );
  const [kvValue, setKvValue] = useState<string>('');
  const [valValid, setValValid] = useState<boolean>(true);

  const [fieldValue, setFieldValue] = useState<string>(
    accValue.showName ? `${accValue?.label} (${valKind})` : `${accValue.label}`,
  );

  const updateFieldValue = (eventKey: SyntheticEvent) => {
    const target = eventKey.target as HTMLInputElement;
    const v = target.value;
    if (v.indexOf(`(${valKind})`) !== -1) {
      setFieldValue(v);
    } else if (accValue.showName) {
      setFieldValue(`${v} (${valKind})`);
    } else {
      setFieldValue(v);
    }
    const newV = v.replace(`(${valKind})`, '').trim();
    dispatch(updateLabel(newV));
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
    dispatch(updateValue(tEntries));
  };

  /**
   * add a pill value
   * */
  const addPill = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setKvValue(target?.value);
    if (!target?.value.includes(',')) {
      return;
    }
    if (target?.value.indexOf('=') === -1) {
      setValValid(false);
      return;
    }
    setKvValue('');
    const newTrm = accValue?.value as UtmKeyValue[];
    const newTrmPill = {
      key: target?.value?.replace(/,/g, '').split('=')[1].trim(),
      value: target?.value?.replace(/,/g, '').split('=')[0].trim(),
    };
    newTrm.push(newTrmPill);
    dispatch(updateValue(newTrm));
  };

  return (
    <Accordion.Item eventKey={`"${itemNo}"`}>
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip id={`${valKind}-accordion`}>
            Edit configuration for {type}
          </Tooltip>
        }
      >
        <Accordion.Header className={darkClass}>
          <strong>{type}</strong>
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
                cState={accValue.useValue}
                disabled={false}
                label=""
                tooltip={
                  accValue.useValue
                    ? `Uncheck to not the use the '${valKind}' value`
                    : `Check to use the '${valKind}' value`
                }
                callback={(value) => {
                  dispatch(updateUseValue(value));
                }}
              />
            </div>
            <div className="col60" />
          </div>
          {accValue?.useValue && (
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
                  overlay={
                    <Tooltip id={`${type}-label-tooltip`}>
                      Enter the label for the {type} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
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
                    {accValue.showName
                      ? `Hide '${type}' in Field Label?`
                      : `Show '${type}' in Field Label`}
                  </Form.Label>
                </div>
                <div className="col10">
                  <Checker
                    cState={accValue.showName ? accValue.showName : false}
                    disabled={false}
                    label=""
                    tooltip={
                      accValue.showName
                        ? 'Uncheck to hide the field name in the field label'
                        : 'Check to show the field name in the field label'
                    }
                    callback={(value) => {
                      if (value) {
                        setFieldValue(`${accValue?.label} (${type})`);
                      } else {
                        setFieldValue(`${accValue?.label}`);
                      }
                      dispatch(updateShowName(value));
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
                  overlay={
                    <Tooltip id={`${valKind}-tooltip-tooltip`}>
                      Enter the tooltip text for the {valKind} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${valKind}-tooltip`}
                    placeholder={`Enter ${valKind} field tooltip`}
                    value={accValue.tooltip ? accValue.tooltip : ''}
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
                  overlay={
                    <Tooltip id={`${valKind}-aria-tooltip`}>
                      Enter the ARIA (Accessibility) text for the {valKind}{' '}
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
                    value={accValue.ariaLabel}
                    onChange={(e) => {
                      dispatch(updateAriaLabel(e.target.value));
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
                  overlay={
                    <Tooltip id={`${valKind}-error-tooltip`}>
                      Enter the error text for the {valKind} field
                    </Tooltip>
                  }
                >
                  <Form.Control
                    className={darkClass}
                    type="text"
                    id={`${valKind}-error`}
                    placeholder={`Enter ${valKind} field error text`}
                    value={accValue.error}
                    onChange={(e) => {
                      dispatch(updateError(e.target.value));
                    }}
                  />
                </OverlayTrigger>
              </div>
              {/* use chooser or txt */}
              <div className="fullrow">
                {accValue?.useValue ? (
                  <div className="fullrow">
                    <div className="col15">
                      <Form.Label className={darkClass}>Use Chooser</Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={accValue.isChooser}
                        disabled={false}
                        label=""
                        tooltip={`Use a chooser to create a pre-defined list of allowed values for ${valKind}`}
                        callback={(value) => {
                          dispatch(updateIsChooser(value));
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
                        cState={!accValue.isChooser}
                        disabled={false}
                        label=""
                        tooltip={`Use a Text Field to allow the user to enter any value for ${valKind}`}
                        callback={(value) => {
                          dispatch(updateIsChooser(!value));
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
              {accValue.isChooser && (
                <>
                  <div className="fullrow">
                    <Form.Label className={darkClass}>
                      <strong>{`${valKind} Values`}</strong>
                    </Form.Label>
                  </div>
                  <div className="fullrow">
                    <OverlayTrigger
                      placement="auto"
                      overlay={
                        <Tooltip id={`${valKind}-values-tooltip`}>
                          Create a predefined list of values for the {valKind}{' '}
                          field
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        className={darkClass}
                        type="text"
                        placeholder="Enter comma-separated list of key=value pairs to use"
                        value={kvValue || ''}
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
            </>
          )}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
