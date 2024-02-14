import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Envelope,
  Twitter,
  Linkedin,
  Mastodon,
} from "react-bootstrap-icons";
import Logo from "../images/NewLinkerLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

export default function PricingPage() {
  const navigate = useNavigate();
  const dark = useSelector((state: any) => state.dark.dark);
  const mainSet = useSelector((state: RootState) => state.main.settings);

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
              Download your QR Codes in <code>jpg</code>, <code>png</code>, or
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
          <Button variant="success" size={"sm"} onClick={go}>
            Start Using
          </Button>
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>
        {/* <section className="pricing py-5">
          <div className="container">
            <div className="row">
              {
                myPrices.map((obj) => {
                  return <Card data={obj}></Card>;
                }) // store data in myPrices map to card
              }
            </div>
          </div>
        </section> */}
        <Row>
          <Col size="sm8" style={{ fontSize: "24px", color: "grey" }}></Col>
          <Col size="sm1" style={{ fontSize: "24px", color: "grey" }}>
            Free
          </Col>
          <Col size="sm1" style={{ fontSize: "24px", color: "grey" }}>
            Basic
          </Col>
          <Col size="sm1" style={{ fontSize: "24px", color: "grey" }}>
            Pro
          </Col>
          <Col size="sm1" style={{ fontSize: "24px", color: "grey" }}>
            Enterprise
          </Col>
          <div className="fullrow">
            <hr style={{ marginLeft: "10%", width: "80%" }} />
          </div>
        </Row>
        <Row>
          <Col size="sm8" style={{ alignItems: "middle" }}>
            Simple URL Codes
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm8" style={{ alignItems: "middle" }}>
            WiFi codes to allow for automatic signon to your networks
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm1">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Encode your links for tracking
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Encode your links for tracking
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Customize the colors, 'eye' shape, appearance, etc. of QR Codes
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Choose which UTM Codes to enable
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            History of created links and codes
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Bit.ly integration to shorten links
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Save `svg` QR Codes with transparent background
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">Add custom logos to QR Codes</Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">Use custome bit.ly short domain</Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">
            Use free-form UTM Codes of pre-defined lists of values
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">Custom domain name</Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">Custom branding and logo for site</Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4">
            Customize all field-labels, tooltips, error messages, etc.
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-x" style={{ color: "red" }} />
          </Col>
          <Col size="sm4">
            <i className="bi-2x bi bi-check" style={{ color: "green" }} />
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>

        <Row style={{ fontSize: "2x", fontWeight: "bold" }}>
          <Col size="sm4">
            <strong>Price</strong>
          </Col>
          <Col size="sm4">Free forever</Col>
          <Col size="sm4">
            $9.99/mo
            <br />
            $99/yr
          </Col>
          <Col size="sm4">
            $19.99/mo
            <br />
            $199/yr
          </Col>
          <Col size="sm4">
            $49.99/mo
            <br />
            $499/yr
          </Col>
        </Row>
        {/* <stripe-pricing-table
          pricing-table-id="prctbl_1OgV8HGuKQxVPasTQ9Cm8EPf"
          publishable-key="pk_test_51OYEejGuKQxVPasTmIP0YpYi6bMc5YxPdbTODK6FO0quQ9clYbr9TC9Kihv3o2zV8ErBY2xRD4OwnLNoxgE265B600yqy7eDkN"
        ></stripe-pricing-table> */}
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
        <div className="fullrow" style={{ paddingBottom: "25px" }} />
        <p />
        <p />
      </>
    </div>
  );
}
