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
import React, { JSX, useState, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { UtmObj, UtmKeyValue } from '../../types';

interface UTMChoiceProps {
  // eslint-disable-next-line no-unused-vars
  valueChanged: (value: string, type: string) => void;
  targetType: string;
  settings: UtmObj;
}

export default function UTMChoice(props: UTMChoiceProps): JSX.Element {
  const { valueChanged, targetType, settings } = props;
  const [displayValue, setDisplayValue] = useState<string>('Choose one ...');
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  /**
   * Create the choices for the select element
   */
  const choices = useMemo(() => {
    // eslint-disable-next-line no-undef
    const groups: JSX.Element[] = [];
    groups.push(
      <option key={`${targetType}-default`} value="">
        Choose one ...
      </option>,
    );
    // eslint-disable-next-line array-callback-return
    settings.value?.map((val: UtmKeyValue) => {
      groups.push(
        <option key={`${targetType}-${val.key}`} id={val.key} value={val.value}>
          {val.value}
        </option>,
      );
    });
    return groups;
  }, [settings.value, targetType]);

  const selectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v: number = e.target?.selectedIndex;
    if (v === 0) {
      valueChanged('', targetType);
      return;
    }
    const txtVal: string = settings?.value[v - 1].value;
    setDisplayValue(txtVal);
  };

  const returnVal = (value: string) => {
    valueChanged(value, targetType);
  };

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 300 }}
      overlay={
        <Tooltip id={`${targetType}-tooltip`}>{settings?.tooltip}</Tooltip>
      }
    >
      <FloatingLabel
        label={
          settings?.showName
            ? `${settings?.label} (${targetType})`
            : settings?.label
        }
      >
        <Form.Select
          className={darkClass}
          size="sm"
          required
          aria-label={
            settings?.showName
              ? `${settings?.ariaLabel} (${targetType})`
              : settings?.ariaLabel
          }
          id={targetType}
          onChange={(eventKey) => {
            if (eventKey.target.value === 'Choose one ...') {
              returnVal('');
              return;
            }
            if (eventKey.target.value === 'Choose a Term first') {
              returnVal('');
              return;
            }

            returnVal(eventKey.target[eventKey.target.selectedIndex].id);
            selectedValue(eventKey);
          }}
          value={displayValue}
        >
          {choices}
        </Form.Select>
      </FloatingLabel>
    </OverlayTrigger>
  );
}
