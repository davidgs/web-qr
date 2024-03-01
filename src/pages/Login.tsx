import { InputGroup, Form, Button } from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import "../css/MainConfig.css";
import "../css/AccountModal.css";
import { useEffect, useState } from "react";
import Userfront from "@userfront/core";

export default function Login() {
  const dark: boolean = useSelector((state: RootState) => state.dark.dark);
  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  Userfront.init("xbp876mb");

  useEffect(() => {
    const loggedn = Userfront.getSession();
    loggedn.then((session) => {
      console.log(`Logged In: ${session.isLoggedIn}`);
      setLoggedIn(session.isLoggedIn);
    });
  }, []);

  const toggle = () => {
    setShowPass(!showPass);
  };
  const valueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tar: HTMLInputElement = e.target as HTMLInputElement;
    if (tar.id === "username") {
      setUserName(tar.value);
    } else {
      setPassword(tar.value);
    }
  };

  const tryLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`userName`, userName);
    console.log(`password`, password);
    Userfront.login({
      method: "password",
      username: userName,
      password: password,
    })
      .then((session) => {
        console.log(`session`, session);
        setLoggedIn(true);
      })
      .catch((err) => {
        setErrorText(`${err}`);
        setShowError(true);
        console.log(`err`, err);
      });
  };

  return (
    <div className="main-column">
      <div className="fullrow">
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h1>
            <img src={Logo} alt="QR Builder Logo" width={40} height={40}></img>{" "}
            Login to your account
          </h1>
        </div>
      </div>
      {!loggedIn ? (
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
                    onChange={valueChanged}
                  />
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
                      onChange={valueChanged}
                    />
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
              style={{ color: "red", textAlign: "center", fontSize: "larger" }}
            >
              {errorText}
              </Form.Text>
              </div>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={userName === "" || password === ""}
          >
            Login
          </Button>
        </Form>
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
    </div>
  );
}
