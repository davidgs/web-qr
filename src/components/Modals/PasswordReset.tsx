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
import { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import Logo from "../../images/NewLinkerLogo.png";
import { RootState } from "../../stores/store";
import "../../css/MainConfig.css";
import "../../css/AccountModal.css";
import { useAppSelector } from "../../stores/hooks";
import Userfront from "@userfront/core";


export default function PasswordReset({
  show,
  callback,
}: {
  show: boolean;
  callback: (show: boolean) => void;
}) {
  const [showMe, setShowMe] = useState(show);
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);

  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";

  Userfront.init("xbp876mb");

  useEffect(() => {
    setShowMe(show);
  }, [show]);

  const sendLink = () => {
    const email = document.getElementById(
      "registered-email"
    ) as HTMLInputElement;
    console.log(`email`, email.value);
    Userfront.sendLoginLink(email.value);
    setShowMe(false);
    callback(false);
  };
  const handleClose = () => {
    setShowMe(false);
    callback(false);
  };

  return (
    <>
      <Modal size="lg" show={showMe} onHide={handleClose}>
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
                Password Reset
              </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will send you a link to reset the password to your acount.
          <br />
          Please enter the email address you used to register.
          <Form>
            <InputGroup>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`${darkClass} field-label`}>
                      Email:
                    </Form.Label>
                  </div>
                  <div className="controls-row">
                    <Form.Control
                      type="email"
                      id="registered-email"
                      style={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    />
                    <InputGroup.Text
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderLeft: "0px",
                      }}
                    >
                      <i className="bi bi-at" style={{ paddingTop: "4px" }}></i>
                    </InputGroup.Text>
                  </div>
                </div>
              </div>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendLink}>
            Send
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
