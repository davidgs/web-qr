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
import { SyntheticEvent, useState } from 'react';
import {
  Col,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { updateQRValue } from '../reducers/qr/qrCodeSettingsSlice';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import { setActiveLink } from '../reducers/history/historySlice';
import Checker from '../components/buttons/Checker';

export default function WifiForm() {
  // WIFI:S:<SSID>;T:<WEP|WPA|nopass>;P:<PASSWORD>;H:<true|false|blank>;;
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  const settings = useSelector((state: RootState) => state.wifi.settings);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const pwField = document.getElementById('wifi-passwd');
  const activeLink = useSelector(
    (state: RootState) => state.history.activeLink,
  );
  const wifiString = `WIFI:S:${activeLink.ssid};T:${activeLink.encryption};P:${activeLink.password};H:${activeLink.hidden};;`;

  dispatch(updateQRValue(wifiString));
  const toggle = () => {
    if (!passwordShown) {
      pwField?.setAttribute('type', 'text');
    } else {
      pwField?.setAttribute('type', 'password');
    }
    setPasswordShown(!passwordShown);
  };

  const valueChanged = (value: SyntheticEvent) => {
    const tar = value.target as HTMLInputElement;
    switch (tar.id) {
      case 'wifi-encryption-choice':
        dispatch(
          setActiveLink({
            ...activeLink,
            encryption: tar.value as 'nopass' | 'WEP' | 'WPA/WPA2',
          }),
        );
        break;
      case 'wifi-ssid':
        dispatch(
          setActiveLink({
            ...activeLink,
            ssid: tar.value,
          }),
        );
        break;
      case 'wifi-passwd':
        dispatch(
          setActiveLink({
            ...activeLink,
            password: tar.value,
          }),
        );
        break;
      default:
        break;
    }
  };

  const checkChanged = (value: boolean) => {
    dispatch(
      setActiveLink({
        ...activeLink,
        hidden: value,
      }),
    );
  };

  return (
    <>
      <div className="fullrow">
        <div className="col20">
          <Form.Label className={darkClass}>
            <strong>{settings.encryption.label}</strong>
          </Form.Label>
        </div>
        <div className="col30">
          <OverlayTrigger
            placement="auto"
            overlay={
              <Tooltip id="wifi-values-tooltip">
                {settings.encryption.tooltip}
              </Tooltip>
            }
          >
            <Form.Select
              className={darkClass}
              size="sm"
              required
              aria-label={settings?.encryption.ariaLabel}
              id="wifi-encryption-choice"
              onChange={(eventKey) => {
                if (eventKey.target.value === 'Choose one ...') {
                  return;
                }
                // dispatch(updateEncryptionValue(eventKey.target.value));
                valueChanged(eventKey);
              }}
              value={
                activeLink.encryption === undefined
                  ? 'Choose one ...'
                  : activeLink.encryption
              }
            >
              <option key="none" value="Choose one ...">
                Choose One ...
              </option>
              <option key="nopass" id="nopass" value="nopass">
                No Password
              </option>
              <option key="wep" id="WEP" value="WEP">
                WEP
              </option>
              <option key="wpa" id="WPA/WPA2" value="WPA/WPA2">
                WPA/WPA2
              </option>
            </Form.Select>
          </OverlayTrigger>
        </div>
        <div className="col20" />
        <div className="col25">
          <Checker
            cState={activeLink.hidden === undefined ? false : activeLink.hidden}
            label={settings.hidden.label}
            tooltip={settings.hidden.tooltip}
            disabled={false}
            callback={(value) => {
              checkChanged(value);
              dispatch(updateQRValue(wifiString));
            }}
          />
        </div>
      </div>
      <div className="fullrow">
        <InputGroup size="lg">
          <Col sm={12}>
            <OverlayTrigger
              placement="auto"
              overlay={
                <Tooltip id="ssid-label-tooltip">
                  Enter the SSID (Network Name) for the WiFi network
                </Tooltip>
              }
            >
              <FloatingLabel label={settings.ssid.label} className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="wifi-ssid"
                  aria-label={settings.ssid.ariaLabel}
                  aria-describedby={settings.ssid.tooltip}
                  value={activeLink.ssid === undefined ? '' : activeLink.ssid}
                  onChange={(e) => {
                    valueChanged(e);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </Col>
        </InputGroup>
      </div>
      <div className="fullrow input-group mb-3">
        <InputGroup size="lg">
          <Col sm={12}>
            <OverlayTrigger
              placement="auto"
              overlay={
                <Tooltip id="ssid-label-tooltip">
                  Enter the WiFi Password for the WiFi network
                </Tooltip>
              }
            >
              <InputGroup>
                <FloatingLabel
                  label={settings.password.label}
                  className={darkClass}
                >
                  <FormControl
                    required
                    className={darkClass}
                    type="password"
                    size="sm"
                    id="wifi-passwd"
                    aria-label={settings.password.ariaLabel}
                    aria-describedby={settings.password.tooltip}
                    value={
                      activeLink.password === undefined
                        ? ''
                        : activeLink.password
                    }
                    onChange={(e) => {
                      valueChanged(e);
                    }}
                  />
                </FloatingLabel>
                <InputGroup.Text onClick={toggle} style={{ cursor: 'pointer' }}>
                  {!passwordShown ? <EyeSlashFill /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </OverlayTrigger>
          </Col>
        </InputGroup>
      </div>
    </>
  );
}
