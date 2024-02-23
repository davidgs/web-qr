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
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Envelope,
  Twitter,
  Linkedin,
  Mastodon,
} from "react-bootstrap-icons";
import Logo from "../images/NewLinkerLogo.png";
import qCode1 from "../images/qcode1.png";
import qCode2 from "../images/qcode2.png";
import qCode3 from "../images/qcode3.png";
import { useSelector } from "react-redux";

export default function WelcomePage() {
  const navigate = useNavigate();
  const dark = useSelector((state: any) => state.dark.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  const go = () => {
    navigate("/build");
  };

  const gobuy = () => {
    navigate("/buy");
  };

  return (
    <div className={`main-column`}>
      <>
        <div className="fullrow">
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h1>
              <img src={Logo} alt="QR Builder Logo" width={40} height={40} />{" "}
              &nbsp; &nbsp;
              <strong>
                Welcome to QR Builder<span className="tr">&trade;</span>
              </strong>
            </h1>
          </div>
        </div>
        <div>
          <b style={{ textWrap: "nowrap" }}>QR Builder </b> is a cross-platform
          application for creating QR Codes for things like URLs, WiFi Networks,
          etc. It is highly customizable and can be adapted for just about any
          need.
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }}></hr>
        </div>
        <div className="fullrow">
          <h4>Free features:</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>
              Create QR Codes for URLs <em>and</em> WiFi networks to allow for
              automatic signons to your networks
            </li>
            <li>Simple URL Codes</li>
            <li>Encode your links for tracking</li>
            <ul>
              <li>
                <code>
                  https://qr-builder.io/?utm_campaign=intro-page&utm_source=qr-builder&utm_medium=web
                  &nbsp;
                </code>
              </li>
            </ul>
            <li>WiFi codes to allow for automatic signon to your networks</li>
            <li>
              Download your QR Codes in <code>jpg</code>, <code>png</code>, or
              &nbsp;
              <code>svg</code> format
            </li>
          </ul>
        </div>
        <div className="fullrow">
          <Button variant="success" size={"sm"} onClick={go}>
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
            <li>
              <code>svg</code> QR Codes can be saved with a transparent
              background
            </li>

            <li>
              <h5>Cost: $10/month or $100/year</h5>
            </li>
          </ul>
        </div>
        <div className="fullrow">
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 300 }}
            overlay={
              <Tooltip id="basic-coming-soon-tooltip">
                Coming Soon! Basic License
              </Tooltip>
            }
          >
            <Button
              variant="success"
              size={"sm"}
              onClick={gobuy}
              disabled={true}
            >
              Purchase
            </Button>
          </OverlayTrigger>
        </div>
        <div className="fullrow">
          <hr />
        </div>
        <div className="fullrow">
          <h4>Pro License:</h4>
        </div>
        <div className="fullrow">
          <ul>
            <li>Use on up to 5 devices</li>
            <li> Add your logo to your QR Codes</li>
            <img src={qCode3} width="100px" height="100px" alt="QR Code" />
            <li>Add your custom bit.ly short-domain</li>
            <li>
              Customize whether you want to enter codes free-form, or use a
              pre-defined list of choices for each one
            </li>
            <li>
              <h5>Cost: $19.99/month or $200/year</h5>
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
            <li>Customize all field labels, tooltips, etc.</li>
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
          <a href="https://github.com/davidgs/link-maker">
            <Github
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
        </div>
        <div className="fullrow">
          <strong>QR Builder</strong>&nbsp; is built by &nbsp;
          <a className={darkClass} href="https://qr-builder.io/">
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
        <div className="fullrow" style={{ paddingBottom: "30px" }}>
          <p></p>
        </div>
      </>
    </div>
  );
}
