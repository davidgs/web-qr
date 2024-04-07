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
import "../css/sidebar.css";
import Userfront from "@userfront/core";
import { SessionResponse } from "@userfront/core";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import NewAccountModal from "../components/Modals/NewAccountModal";
import { EyeSlashFill, Eye } from "react-bootstrap-icons";
import "../css/MainConfig.css";
import PassChecker from "../components/PassChecker";
import { settingsServer } from "../types";
import { setLogin } from "../reducers/session/loginSlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import Footer from "../components/Footer";
import Logo from "../images/NewLinkerLogo.png";
import PHunt from "../components/PHunt";
Userfront.init("xbp876mb");

type goodBad = {
  lengthGood: boolean;
  numberGood: boolean;
  upperGood: boolean;
  lowerGood: boolean;
  specialGood: boolean;
};

const regExes = {
  numRegEx: /^(?=.*[0-9])/,
  upperRegEx: /^(?=.*[A-Z])/,
  lowerRegEx: /^(?=.*[a-z])/,
  specialRegEx: /^(?=.*[!@#$%^&*\(\)_+={[}\]|\\:;<,>\.\?\/])/,
  lengthRegEx: /^(?=.{8,16})/,
};

export default function Account() {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confPasswordShown, setConfPasswordShown] = useState(false);
  const [passGood, setPassGood] = useState<goodBad>({
    lengthGood: false,
    numberGood: false,
    upperGood: false,
    lowerGood: false,
    specialGood: false,
  });
  const db_url = `${settingsServer}create-user`;
  /**
   * toggle the password visibility
   */
  const toggle = () => {
    setPasswordShown(!passwordShown);
  };

  /**
   * toggle the confirm password visibility
   */
  const confToggle = () => {
    setConfPasswordShown(!confPasswordShown);
  };

  const logout = () => {
    Userfront.logout();
    Userfront.getSession()
      .then((session: SessionResponse) => {
        if (session) {
          console.log(`session`, session.isLoggedIn);
          setIsLoggedIn(session.isLoggedIn);
          dispatch(setLogin(session.isLoggedIn));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        return false;
      });
  };

  const checkName = (e: SyntheticEvent) => {
    const tar = e.target as HTMLInputElement;
    if (tar.id === "firstName") {
      if (tar.value.length > 2) {
        setFirstNameValid(true);
      } else {
        setFirstNameValid(false);
      }
    } else if (tar.id === "lastName") {
      if (tar.value.length > 2) {
        setLastNameValid(true);
      } else {
        setLastNameValid(false);
      }
    }
  };
  /**
   *
   * @param e Event for input that changed
   * @returns
   */
  const valueChanged = (e: SyntheticEvent) => {
    const tar = e.target as HTMLInputElement;
    const form = e.currentTarget as HTMLFormElement;
    switch (tar.id) {
      case "firstName":
        setFirstName(tar.value);
        break;
      case "lastName":
        setLastName(tar.value);
        break;
      case "email":
        setEmail(tar.value);
        break;
      case "passwd":
        setPasswd(tar.value);
        setPassGood({
          lengthGood: regExes.lengthRegEx.test(tar.value),
          numberGood: regExes.numRegEx.test(tar.value),
          upperGood: regExes.upperRegEx.test(tar.value),
          lowerGood: regExes.lowerRegEx.test(tar.value),
          specialGood: regExes.specialRegEx.test(tar.value),
        });
        break;
      case "passwdConfirm":
        setPassConfirm(tar.value);
        if (tar.value !== passwd) {
          tar.setCustomValidity("Passwords don't match");
        }
        break;
    }
    if (form.checkValidity() === false) {
      console.log("Form is invalid");
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
      return;
    }
    if (passwd !== passConfirm) {
      console.log("Passwords don't match");
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
      return;
    }

    setValidated(true);
    console.log("Form is valid");
  };

  /**
   *
   * @param e Event for form submission
   */
  async function registerMe (e: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Registering user");
    console.log(
      `Registering ${firstName} ${lastName} with email ${email} and password ${passwd}`
    );
    const u_data = {
      username: `${firstName.toLocaleLowerCase()}_${lastName.toLocaleLowerCase()}`,
      name: `${firstName} ${lastName}`,
      email: email,
      password: passwd,
    };
    const session = await fetch(`${settingsServer}create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(u_data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    console.log(`session`, session);
    if (session.error) {
      setErrorMessage(session.error);
      setShowError(true);
      return session;
    }
    return session;
  };
  // Userfront.signup({
  //   method: "password",
  //   email: email,
  //   password: passwd,
  //   username: `${firstName}_${lastName}`,
  //   name: `${firstName} ${lastName}`,
  // })
  //   .then((response) => {
  //     console.log("User registered", response);
  //     setRegisterSuccess(true);
  //     const session = {
  //       customer: `${firstName}_${lastName}`,
  //       customer_details: {
  //         name: `${firstName} ${lastName}`,
  //         address: {
  //           state: "",
  //           line_1: "",
  //           city: "",
  //           zip: "",
  //         },
  //         email: email,
  //       },
  //     };
  //     axios
  //       .post(db_url, session)
  //       .then((response) => {
  //         console.log("User added to database", response);
  //       })
  //       .catch((error: Error) => {
  //         console.error("User not added to database", error);
  //       });

  //     // create new local user here
  //   })
  //   .catch((error: Error) => {
  //     console.error("Registration failed", error);
  //     setErrorMessage(error.message);
  //     setShowError(true);
  //   });
  // };

  /**
   * check if user is already logged in
   */
  useEffect(() => {
    Userfront.getSession()
      .then((session: SessionResponse) => {
        if (session) {
          console.log(`session`, session.isLoggedIn);
          setIsLoggedIn(session.isLoggedIn);
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        return false;
      });
  }, []);

  return (
    <>
      <div className="main-column">
        <div className="fullrow">
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h1>
              <img
                src={Logo}
                alt="QR Builder Logo"
                width={40}
                height={40}
              ></img>{" "}
              Create an Account
            </h1>
          </div>
        </div>
        <div className="fullrow">
          <PHunt />
        </div>
        {!isLoggedIn ? (
          <Form onSubmit={registerMe} noValidate>
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      First Name:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="firstName"
                      required
                      placeholder="Elmer"
                      value={firstName}
                      onChange={(e) => {
                        valueChanged(e);
                      }}
                      onBlur={(e) => {
                        checkName(e);
                      }}
                      isInvalid={!firstNameValid}
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
                  <div className="text-column">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="lastName"
                      required
                      value={lastName}
                      placeholder="Fudd"
                      onChange={(e) => {
                        valueChanged(e);
                      }}
                      onBlur={(e) => {
                        checkName(e);
                      }}
                      isInvalid={!lastNameValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid last name
                    </Form.Control.Feedback>
                  </div>
                </div>
              </div>
            </InputGroup>
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      Email:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column">
                    <Form.Group>
                      <Form.Control
                        size="lg"
                        type="email"
                        id="email"
                        value={email}
                        required
                        placeholder="wabbits@fudd.com"
                        onChange={(e) => {
                          valueChanged(e);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        We'll never share your email.
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </InputGroup>
            <InputGroup hasValidation>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      Password:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column">
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip
                          id="ssid-label-tooltip"
                          style={{ textAlign: "left" }}
                        >
                          <PassChecker
                            len={passGood.lengthGood}
                            num={passGood.numberGood}
                            upper={passGood.upperGood}
                            lower={passGood.lowerGood}
                            special={passGood.specialGood}
                            matches={passwd === passConfirm}
                          />
                        </Tooltip>
                      }
                    >
                      <InputGroup hasValidation>
                        <FloatingLabel label="Password">
                          <FormControl
                            size="lg"
                            required
                            type={!passwordShown ? "password" : "text"}
                            id="passwd"
                            placeholder="Enter password"
                            value={passwd}
                            autoComplete="password"
                            onChange={(e) => {
                              valueChanged(e);
                            }}
                            style={{
                              borderTopRightRadius: "0px",
                              borderBottomRightRadius: "0px",
                            }}
                            {...(passGood.lengthGood &&
                            passGood.numberGood &&
                            passGood.upperGood &&
                            passGood.lowerGood &&
                            passGood.specialGood
                              ? { isValid: true }
                              : { isInvalid: true })}
                          />
                        </FloatingLabel>
                        <InputGroup.Text
                          onClick={toggle}
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                            cursor: "pointer",
                          }}
                        >
                          {!passwordShown ? <EyeSlashFill /> : <Eye />}
                        </InputGroup.Text>
                      </InputGroup>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`field-label ${darkClass}`}>
                      Confirm Password:{" "}
                    </Form.Label>
                  </div>
                  <div className="text-column">
                    <OverlayTrigger
                      placement="auto"
                      delay={{ show: 250, hide: 300 }}
                      overlay={
                        <Tooltip id="ssid-label-tooltip">
                          Re-Enter Password
                          <PassChecker
                            len={passGood.lengthGood}
                            num={passGood.numberGood}
                            upper={passGood.upperGood}
                            lower={passGood.lowerGood}
                            special={passGood.specialGood}
                            matches={passwd === passConfirm}
                          />
                        </Tooltip>
                      }
                    >
                      <InputGroup hasValidation>
                        <FloatingLabel label="Re-enter Password">
                          <FormControl
                            required
                            type={!confPasswordShown ? "password" : "text"}
                            size="lg"
                            id="passwdConfirm"
                            placeholder="Confirm password"
                            value={passConfirm}
                            onChange={(e) => {
                              valueChanged(e);
                            }}
                            style={{
                              borderTopRightRadius: "0px",
                              borderBottomRightRadius: "0px",
                            }}
                            {...(passwd.length >= 6 &&
                            passConfirm.length >= 1 &&
                            passwd !== passConfirm
                              ? { isInvalid: true }
                              : {})}
                          />
                        </FloatingLabel>
                        <InputGroup.Text
                          onClick={confToggle}
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                            cursor: "pointer",
                          }}
                        >
                          {!confPasswordShown ? <EyeSlashFill /> : <Eye />}
                        </InputGroup.Text>
                      </InputGroup>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </InputGroup>
            <div className="fullrow">
              <p />{" "}
            </div>
            <div style={{ textAlign: "center", margin: "auto" }}>
              {errorMessage.length > 0 && showError ? (
                <Form.Text
                  style={{
                    color: "red",
                    fontSize: "larger",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  {errorMessage}
                </Form.Text>
              ) : (
                <Form.Text />
              )}
            </div>
            <div style={{ textAlign: "center", margin: "auto" }}>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        ) : (
          <div>
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
        <NewAccountModal
          show={registerSuccess}
          email={email}
          password={passwd}
          username={`${firstName}_${lastName}`}
        />
        <Footer />
      </div>
    </>
  );
}
