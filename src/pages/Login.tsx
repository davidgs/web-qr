
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
import { InputGroup, Form, Button } from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import { RootState } from "../stores/store";
import "../css/MainConfig.css";
import "../css/AccountModal.css";
import { useEffect, useState } from "react";
import Userfront from "@userfront/core";
import { setLogin } from "../reducers/session/loginSlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import ResetPassword from "../components/Modals/PasswordReset";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);

  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";
  const loggedIn = useAppSelector((state: RootState) => state.login.login);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [showMe, setShowMe] = useState(false);

const [params] = useSearchParams();
const uuid = params.get("uuid");
const token = params.get("token");
const type = params.get("type");
console.log(`uuid`, uuid);
console.log(`token`, token);


  async function resetPassword() {
    const payload = {
    token: token,
    uuid: uuid,
};
    const response = await fetch(
      "https://api.userfront.com/v0/tenants/xbp876mb/auth/link",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`data`, data);
        return data;
      })
      .catch((error) => {
        console.error(`error`, error);
      });
    console.log(`response`, response);
  }
  useEffect(() => {
    if (uuid && token) {
      resetPassword();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, token]);

  const toggleModal = (show: boolean) => {
    setShowMe(show);
  };
  const toggle = () => {
    setShowPass(!showPass);
  };
  const valueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tar: HTMLInputElement = e.target as HTMLInputElement;
    if (tar.id === "username") {
      if (tar.value.includes("@")) {
        setEmail(tar.value);
      }
      setUserName(tar.value);
    } else {
      setPassword(tar.value);
    }
  };

  const tryLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Userfront.login({
      method: "password",
      username: (email === "" ? userName : userName),
      password: password,
    })
      .then((session) => {
        console.log(`session`, session);
        dispatch(setLogin(true));
        Userfront.redirectIfLoggedIn();
      })
      .catch((err) => {
        setErrorText(`${err}`);
        setShowError(true);
        console.log(`err`, err);
      });
  };

  return (
    <><div className="main-column">
      <div className="fullrow">
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h1>
            <img src={Logo} alt="QR Builder Logo" width={40} height={40}></img>{" "}
            Login to your account
          </h1>
        </div>
      </div>
      {!loggedIn ? (
        <>
          <Form onSubmit={tryLogin}>
            <InputGroup>
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="text-label">
                    <Form.Label className={`${darkClass} field-label`}>
                      Email or Username:
                    </Form.Label>
                  </div>
                  <div className="controls-row">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="username"
                      value={userName}
                      onChange={valueChanged} />
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
                        type={showPass ? "text" : "password"}
                        style={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                        value={password}
                        onChange={valueChanged} />
                      <InputGroup.Text
                        onClick={toggle}
                        style={{
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "0px",
                          cursor: "pointer",
                        }}
                      >
                        {showPass ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </InputGroup.Text>
                    </div>
                  </div>
                </div>
              </InputGroup>
              {showError && (
                <div className="main-settings-row">
                  <Form.Text
                    className={`${darkClass}`}
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontSize: "larger",
                    }}
                  >
                    {errorText}
                  </Form.Text>
                </div>
              )}
            </Form.Group>
            <div className="fullrow" style={{ justifyContent: "right" }}>
              <div className="col70" />
              <div className="col15">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={userName === "" || password === ""}
                >
                  Login
                </Button>
              </div>
              <div className="col10" />
              <div className="col25">
                <Button variant="secondary" onClick={(e) => {
                  console.log(`showMe`, showMe);
                  setShowMe(true);
                } }>Forgot Password</Button>
              </div>
            </div>
          </Form>
          <div className="fullrow">
            <p></p>
            <div className="account">
              Don't have an account?&nbsp; <a href="/account">Create one</a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fullrow" />
          <h2>You are already logged in.</h2>
          <div className="main-settings-row">
            <div className="controls-row">
              <div className="controls-row">
                <Button variant="danger" onClick={() => Userfront.logout()}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
      <ResetPassword show={showMe} callback={toggleModal} />
    </div></>
  );
}
