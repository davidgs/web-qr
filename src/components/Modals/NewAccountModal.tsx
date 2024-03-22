import React, { SyntheticEvent, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import Logo from "../../images/NewLinkerLogo.png";
import { RootState } from "../../stores/store";
import "../../css/MainConfig.css";
import "../../css/AccountModal.css";
import store from "store2";
import { useAppSelector } from "../../stores/hooks";

interface NewAccountModalProps {
  show: boolean;
  username: string;
  email: string;
  password: string;
}
export default function NewAccountModal(props: NewAccountModalProps) {
  const [showMe, setShowMe] = useState(props.show);
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);

  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";

  const handleClose = () => setShowMe(false);
  const copyContents = (e: SyntheticEvent) => {
    const tar: HTMLInputElement = e.target as HTMLInputElement;
    const id: string = tar.id.split("-")[0];
    const el: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    navigator.clipboard
      .writeText(el.value)
      .then(null, null)
      // eslint-disable-next-line no-console
      .catch((err) => console.error("Error: ", err));
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
                Welcome to your QR Builder Account
              </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`${darkClass} field-label`}>
                      Username:{" "}
                    </Form.Label>
                  </div>
                  <div className="controls-row">
                    <Form.Control
                      type="text"
                      value={props.username}
                      readOnly
                      id="username"
                      style={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    />
                    <InputGroup.Text
                      onClick={copyContents}
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="bi bi-clipboard" id="username-copy"></i>
                    </InputGroup.Text>
                  </div>
                </div>
              </div>
            </InputGroup>
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
                      value={props.email}
                      readOnly
                      id="registered-email"
                      style={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    />
                    <InputGroup.Text
                      onClick={copyContents}
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="bi bi-clipboard"></i>
                    </InputGroup.Text>
                  </div>
                </div>
              </div>
            </InputGroup>

            <Form.Group controlId="formBasicPassword">
              <InputGroup>
                <div className="main-settings-row">
                  <div className="controls-row">
                    <div className="text-label">
                      <Form.Label className={`${darkClass} field-label`}>
                        Password:
                      </Form.Label>
                    </div>
                    <div className="controls-row">
                      <Form.Control
                        type="text"
                        value={props.password}
                        style={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      />
                      <InputGroup.Text
                        onClick={copyContents}
                        style={{
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "0px",
                          cursor: "pointer",
                        }}
                      >
                        <i className="bi bi-clipboard"></i>
                      </InputGroup.Text>
                    </div>
                  </div>
                </div>
              </InputGroup>
              <Form.Text
                className={`${darkClass}`}
                style={{ color: "red", textAlign: "center" }}
              >
                Your password is not stored, and this is the only time it will
                be shown.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
