import Userfront from "@userfront/core";
import { useSearchParams } from "react-router-dom";
import { Button, FloatingLabel, Form, FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Logo from "../images/NewLinkerLogo.png";
import { useAppSelector } from "../stores/hooks";
import { RootState } from "../stores/store";
import { SyntheticEvent, useState } from "react";
import { EyeSlashFill, Eye } from "react-bootstrap-icons";
import PassChecker from "../components/PassChecker";

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

export default function ResetPage() {
  Userfront.init("xbp876mb");
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass: string = dark ? "header-stuff-dark" : "header-stuff";
  const [params] = useSearchParams();
  const [passwd, setPasswd] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confPasswordShown, setConfPasswordShown] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passGood, setPassGood] = useState<goodBad>({
    lengthGood: false,
    numberGood: false,
    upperGood: false,
    lowerGood: false,
    specialGood: false,
  });
  const [validated, setValidated] = useState(false);

  const uuid = params.get("uuid");
  const token = params.get("token");
  const type = params.get("type");
  console.log(`uuid`, uuid);
  console.log(`token`, token);

  const payload = {
    token: token,
    uuid: uuid,
  };
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
 const valueChanged = (e: SyntheticEvent) => {
   const tar = e.target as HTMLInputElement;
   const form = e.currentTarget as HTMLFormElement;
   switch (tar.id) {
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
  async function resetPassword() {
    if (!uuid || !token || !passwd) {
      setErrorMessage("Invalid reset request");
      setShowError(true);
      return;
    }
    Userfront.resetPassword({
      password: passwd,
      token: token,
      uuid: uuid,
    });
    Userfront.redirectIfLoggedIn();
  }

  return (
    <div>
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
              Reset your password
            </h1>
          </div>
        </div>
        <Form onSubmit={resetPassword}>
          <InputGroup hasValidation>
            <div className="main-settings-row">
              <div className="controls-row">
                <div className="text-label">
                  <Form.Label className={`field-label ${darkClass}`}>
                    New Password:{" "}
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
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
