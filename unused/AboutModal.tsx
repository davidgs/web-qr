import React from "react";
import { Button, Modal } from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import qCode1 from "../images/qcode1.png";
import qCode2 from "../images/qcode2.png";
import qCode3 from "../images/qcode3.png";
import { RootState } from "../src/stores/store";
import { useSelector } from "react-redux";
import {
  Github,
  Envelope,
  Linkedin,
  Mastodon,
  Twitter,
} from "react-bootstrap-icons";

/**
 *
 * @returns const options = {
    applicationName: 'QR Code Builder',
    applicationVersion: currentVersion,
    copyright: '© 2023',
    version: currentBuild,
    credits: 'Credits:\n\t• David G. Simmons\n\t• Electron React Boilerplate',
    authors: ['David G. Simmons'],
    website: 'https://github.com/davidgs/link-maker',
    iconPath: getAssetPath('icon.png'),
  };
 */
export default function AboutModal({
  showMe,
  callback,
}: {
  showMe: boolean;
  callback: (res: boolean) => void;
}): React.JSX.Element {
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  const handleClose = () => {
    callback(false);
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
              About to QR Builder<span className="tr">&trade;</span>
            </h1>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>QR Builder</strong> is a cross-platform application for
          creating QR Codes for things like URLs, WiFi Networks, etc.
        </p>
        <p>
          <h4>Free features:</h4>
          <ul>
            <li>WiFi codes to allow for automatic signon to your networks</li>
            <li>Simple URL Codes</li>
            <li>
              Save your QR Codes in <code>jpg</code>, <code>png</code>, or{" "}
              <code>svg</code> format
            </li>
            <li> Encode your links for tracking</li>
            <ul>
              <li>
                <code>
                  https://qr-builder.io/?utm_campaign=intro-page&utm_source=qr-builder&utm_medium=web{" "}
                </code>
              </li>
            </ul>
            <li>
              Create QR Codes for URLs <em>and</em> WiFi networks to allow for
              automatic signons to your networks
            </li>
          </ul>
          <h4>Basic License:</h4>
          <ul>
            <li>
              Customize the colors of your QR Codes and change almost any aspect
              of your QR Codes including the 'eye' shape, appearance, etc.
            </li>
            <img src={qCode1} width="100px" height="100px" alt="QR Code" />
            &nbsp;
            <img src={qCode2} width="100px" height="100px" alt="QR Code" />
            <li> Customize which 'UTM' codes you want to use</li>
            <li>
              Save any links you have previously encoded so you can get your QR
              Codes back
            </li>
            <li>
              <a href="https://Bit.ly/">Bit.ly</a> integration to shorten your
              custom links
            </li>
            <Button
              variant="success"
              size={"sm"}
              onClick={() => callback(false)}
            >
              Purchase
            </Button>
          </ul>
          <h4>Enterprise License:</h4>
          <ul>
            <li> Add your logo to your QR Codes</li>
            <img src={qCode3} width="100px" height="100px" alt="QR Code" />
            <li>Custom domain name (for the web-hosted version)</li>
            <li>Custom bit.ly short-domain</li>
            <li>Custom branding logo for the app</li>
            <li>
              Customize whether you want to enter codes free-form, or use a
              pre-defined list of choices for each one
            </li>
            <Button
              variant="success"
              size={"sm"}
              onClick={() => callback(false)}
            >
              Contact us
            </Button>
          </ul>
          <strong>QR Builder</strong> is open source and licensed under the MIT
          license. The source code is available on{" "}
          <a href="https://github.com/davidgs/link-maker">
            <Github
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
        </p>
        <p>
          <strong>QR Builder</strong> is built by{" "}
          <a className={darkClass} href="https://davidgs.com/">
            David G. Simmons.
          </a>
        </p>
        <p>
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
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
