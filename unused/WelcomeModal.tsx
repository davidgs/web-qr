import React from "react";
import { Button, Modal } from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import qCode1 from "../images/qcode1.png";
import qCode2 from "../images/qcode2.png";
import qCode3 from "../images/qcode3.png";
import {
  Github,
  Envelope,
  Linkedin,
  Mastodon,
  Twitter,
} from "react-bootstrap-icons";
import { updateMainSettings } from "../src/reducers/main/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "store2";

export default function WelcomeModal({
  showMe,
  callback,
}: {
  showMe: boolean;
  callback: (res: boolean) => void;
}): React.JSX.Element {
  const dispatch = useDispatch();
  const mainSet = useSelector((state: any) => state.main.settings);
  const dark = useSelector((state: any) => state.main.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  const handleClose = () => {
    callback(false);
    const ms = { ...mainSet, firstRun: false };
    dispatch(updateMainSettings(ms));
    store.set("main-config", ms);
  };

  return (
    <Modal size="xl" show={showMe} onHide={handleClose}>
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
              Welcome to QR Builder
            </h1>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="fullrow">
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h1>
              <img
                src={Logo}
                alt="QR Builder Logo"
                width={40}
                height={40}
              ></img>{" "}
              &nbsp; &nbsp;
              <strong>Welcome to QR Builder</strong>
            </h1>
          </div>
        </div>
        <div className="fullrow" style={{ textWrap: "pretty" }}>
          <strong>QR Builder</strong>&nbsp;is a cross-platform application for
          creating QR Codes for things like URLs, WiFi Networks, etc. It is
          highly customizable and can be adapted for just about any need.
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }}></hr>
        </div>
        <div className="fullrow">
          <h4>Free features:</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>WiFi codes to allow for automatic signon to your networks</li>
            <li>Simple URL Codes</li>
            <li>
              Save your QR Codes in <code>jpg</code>, <code>png</code>, or
              &nbsp;
              <code>svg</code> format
            </li>
            <li> Encode your links for tracking</li>
            <ul>
              <li>
                <code>
                  https://qr-builder.io/?utm_campaign=intro-page&utm_source=qr-builder&utm_medium=web
                  &nbsp;
                </code>
              </li>
            </ul>
            <li>
              Create QR Codes for URLs <em>and</em> WiFi networks to allow for
              automatic signons to your networks
            </li>
          </ul>
        </div>
        <div className="fullrow">
          <Button variant="success" size={"sm"}>
            Start Using
          </Button>
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>
        <div className="fullrow">
          <h4>Basic License:</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>Use on up to 3 devices</li>
            <li>
              Customize the colors of your QR Codes and change almost any aspect
              of your QR Codes including the 'eye' shape, appearance, etc.
            </li>
            <div className="fullrow">
              <div>
                <img src={qCode1} width="100px" height="100px" alt="QR Code" />
              </div>
              <div className="col5" />
              <div>
                <img src={qCode2} width="100px" height="100px" alt="QR Code" />
              </div>
              {/* <div className="col25" /> */}
            </div>
            <li> Customize which 'UTM' codes you want to use</li>
            <li>
              Save any links you have previously encoded so you can get your QR
              Codes back
            </li>
            <li>
              <a href="https://Bit.ly/">Bit.ly</a> integration to shorten your
              custom links
            </li>
          </ul>
          <h4>Cost: $10/month or $100/year</h4>
        </div>
        <div className="fullrow">
          <Button
            variant="success"
            size={"sm"}
            disabled={true}
            onClick={() => {}}
          >
            Purchase
          </Button>
        </div>
        <div className="fullrow">
          <hr />
        </div>
        <div className="fullrow">
          <h4>Pro License:</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>Use on up to 3 devices</li>
            <li> Add your logo to your QR Codes</li>
            <img src={qCode3} width="100px" height="100px" alt="QR Code" />
            <li>Add your custom bit.ly short-domain</li>
            <li>
              Customize whether you want to enter codes free-form, or use a
              pre-defined list of choices for each one
            </li>
          </ul>
        </div>
        <div className="fullrow">
          <Button
            variant="success"
            size={"sm"}
            disabled={true}
            onClick={() => {}}
          >
            Purchase
          </Button>
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>
        <div className="fullrow">
          <h4>Enterprise License</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>Use on up to 10 devices</li>
            <li>
              Custom domain name (replace qr-builder.io with your own domain or
              sub-domain)
            </li>
            <li>Custom branding logo for the app</li>
          </ul>
        </div>
        <div className="fullrow">
          <Button variant="success" size={"sm"} disabled={true}>
            Contact us
          </Button>
        </div>
        <div className="fullrow">
          <p></p>
          <hr style={{ width: "100%" }} />
        </div>
        <div className="fullrow">
          <strong>QR Builder</strong>&nbsp; is open source and licensed under
          the MIT license. The source code is available on &nbsp;
          <a href="https://github.com/davidgs/web-qr">
            <Github
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
        </div>
        <div className="fullrow">
          <strong>QR Builder</strong>&nbsp; is built by &nbsp;
          <a className={darkClass} href="https://davidgs.com/">
            David G. Simmons.
          </a>
        </div>
        <div className="fullrow">
          <a href="mailto:davidgs@qr-builder.io">
            <Envelope
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://github.com/davidgs/">
            <Github
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://twitter.com/davidgsIoT">
            <Twitter
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://linkedin.com/in/davidgsimmons">
            <Linkedin
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://tty0.social/@davidgs">
            <Mastodon
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
