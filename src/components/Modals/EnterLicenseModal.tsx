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
import { SyntheticEvent, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import Logo from "../../images/NewLinkerLogo.png";
import { RootState } from "../../stores/store";
import "../../css/MainConfig.css";
import "../../css/AccountModal.css";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { settingsServer, UserSettings } from "../../types";
import {DeviceUUID} from "device-uuid";
import { updateLicenseSettings } from "../../reducers/licensing/licenseSlice";

interface NewAccountModalProps {
  show: boolean;
  callback: (show: boolean) => void;
}

export default function NewAccountModal(props: NewAccountModalProps) {
  const user: UserSettings = useAppSelector(
    (state: RootState) => state.userSettings.settings
  );
  const dispatch = useAppDispatch();
  const license = useAppSelector((state: RootState) => state.license);
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";
  // const [showError, setShowError] = useState<boolean>(false);
  // const [errorText, setErrorText] = useState<string>("");


  const handleClose = () => {
    props.callback(false);
  };
  const valueChanged = (e: SyntheticEvent) => {
    const tar = e.target as HTMLInputElement;
    setLicenseKey(tar.value);
  };


  const submitLicense = () => {
    // eslint-disable-next-line no-console
    console.log("License Key: ", licenseKey);
    if (licenseKey === "") {
      const lk = document.getElementById("licenseKey") as HTMLInputElement;
      const lsk = lk.value;
      if (lsk === "") {
        // setShowError(true);
        // setErrorText("License Key is required");
        return;
      } else {
        // setShowError(false);
        setLicenseKey(lsk);
        validateLicense();
        handleClose();
      }
    } else {
      validateLicense();
      handleClose();
    }
  };

  /**
   * Validate the license key
   * Payload to send: {
   * username: user.username,
   * license: licenseKey,
   * fingerprint: fingerprint,
   * os: dud.os,
   * platform: dud.platform,
   * name: user.name,
   * email: user.email,
   * id: license.settings.cust_id }
   */

  interface LicensePayload {
    username: string;
    license: string;
    fingerprint: string;
    os: string;
    platform: string;
    name: string;
    email: string;
    id: string;
  }
  async function validateLicense() {
    const dud = new DeviceUUID().parse();
    const uuid = new DeviceUUID().get();
    console.log("uuid: ", uuid);
    const fingerprint = uuid
      .replace(/-/gi, "")
      .replace(/(.{2})/g, "$1:")
      .slice(0, -1);
    console.log("fingerprint: ", fingerprint);
    const licenseData: LicensePayload = {
      username: user.login,
      license: licenseKey,
      fingerprint: fingerprint,
      os: dud.os,
      platform: dud.platform,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      id: license.settings.cust_id,
    };
    const licStatus = await fetch(`${settingsServer}add-license`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(licenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("license response: ", data);
        dispatch(updateLicenseSettings(data));
        return data;
      })
      .catch((error) => console.error("license error: ", error));
    console.log("Response: ", licStatus);
  }

  return (
    <>
      <Modal size="lg" show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ margin: "auto" }}>
              <h1>
                <img
                  src={Logo}
                  alt="QR Builder Logo"
                  width={40}
                  height={40}
                ></img>{" "}
                Let's activate your license!
              </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name */}
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      First Name:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column" style={{ width: "60%" }}>
                    <Form.Control
                      size="lg"
                      type="text"
                      id="firstName"
                      readOnly
                      value={user.first_name}
                    />
                  </div>
                </div>
              </div>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      Last Name:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column" style={{ width: "60%" }}>
                    <Form.Control
                      size="lg"
                      type="text"
                      id="lastName"
                      readOnly
                      value={user.last_name}
                    />
                  </div>
                </div>
              </div>
            </InputGroup>
            {/* Email */}
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      Email:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column" style={{ width: "60%" }}>
                    <Form.Control
                      size="lg"
                      type="email"
                      id="email"
                      value={user.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </InputGroup>
            {/* License */}
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      License Key:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column" style={{ width: "60%" }}>
                    <Form.Control
                      size="lg"
                      type="email"
                      id="licenseKey"
                      value={licenseKey}
                      placeholder="123ABC-ABC123-123ABC-ABCXYZ-123456-V3"
                      required
                      onChange={valueChanged}
                    />
                  </div>
                </div>
              </div>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={submitLicense}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
