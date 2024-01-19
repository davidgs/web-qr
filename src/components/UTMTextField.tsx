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
import { JSX } from 'react';
import Form from 'react-bootstrap/Form';
import {
  FloatingLabel,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UtmObj } from '../types';
import { RootState } from '../stores/store';

interface UTMTextFieldProps {
  // eslint-disable-next-line no-unused-vars
  valueChanged: (value: string, target: string) => void;
  targetType: string;
  value: string;
  settings: UtmObj;
}

export default function UTMTextField(props: UTMTextFieldProps): JSX.Element {
  const { valueChanged, targetType, value, settings } = props;
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  const returnVal = (v: string) => {
    valueChanged(v, targetType);
  };

  return (
    <>
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
              : `${settings?.label}`
          }
          className={darkClass}
        >
          <FormControl
            required
            className={darkClass}
            type={targetType === 'utm_target' ? "url" : "text"}
            size="sm"
            id={`${targetType}`}
            aria-label={settings?.ariaLabel}
            aria-describedby={settings?.tooltip}
            value={value}
            onChange={(eventKey) => {
              returnVal(eventKey.target.value);
            }}
          />
        </FloatingLabel>
      </OverlayTrigger>
      <Form.Control.Feedback type="invalid">
        {settings?.error}
      </Form.Control.Feedback>
    </>
  );
}
