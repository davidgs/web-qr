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

import { Col, Row } from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import { PricingTable } from "../components/StripePricing";
import "../css/Pricing.css";
import Footer from "../components/Footer";
import PHunt from "../components/PHunt";

export default function PricingPage() {

  // const gobuy = () => {
  //   navigate("/buy");
  // };

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
              <strong>
                Welcome to QR Builder<span className="tr">&trade;</span>
              </strong>
            </h1>
          </div>
        </div>
        <div className="fullrow">
          <PHunt />
        </div>
        <div>
          <strong>QR Builder</strong>&nbsp;is a cross-platform application for
          creating QR Codes for things like URLs, WiFi Networks, etc. It is
          highly customizable and can be adapted for just about any need.
        </div>
        <div className="fullrow">
          <hr style={{ width: "100%" }}></hr>
        </div>
        <div className="fullrow">&nbsp;</div>
        <PricingTable />
        {/* Free & Basic Cards */}
        {/* <div className="fullrow" style={{ justifyContent: "center" }}>

          <div className="col45">
            <FreeCard />
          </div>
          <div className="col5" />
          <div className="col45">
            <BasicCard />
          </div>
        </div> */}
        {/* <div className="fullrow">

          </div> */}
        {/* </div> */}
        {/* <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div> */}
        {/* <div className="fullrow">
          <div className="col45">
            <ProCard />
          </div>
          <div className="col5"/>
          <div className="col45">
            <EnterpriseCard />
          </div>
        </div> */}
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>
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
            Code Scans
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm8" style={{ alignItems: "middle" }}>
            Simple URL Codes
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
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
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm1">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ marginLeft: "10%", width: "80%" }} />
        </div>
        <Row>
          <Col size="sm4" style={{ alignItems: "middle" }}>
            Encoded links for tracking
          </Col>
          <Col size="sm4">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm4">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm4">
            <span style={{ color: "green" }}>Unlimited</span>
          </Col>
          <Col size="sm4">
            <span style={{ color: "green" }}>Unlimited</span>
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
        <Row className="justify-content-md-center">
          <Col md="auto" style={{ fontSize: "24px", color: "grey" }}>
            Coming features
          </Col>
        </Row>
        <div className="fullrow">
          <hr style={{ width: "100%" }} />
        </div>
        <Row>
          <Col size="sm4">API Access</Col>
          <Col size="sm4">Limited</Col>
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
          <Col size="sm4">
            <a href="https://dub.co" target="_blank" rel="noreferrer">
              dub.co
            </a>{" "}
            Link Shortener
          </Col>
          <Col size="sm4">
            {" "}
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
        {/* <div className="fullrow">&nbsp;</div>
        <PricingTable /> */}
        {/* // pricing-table-id="prctbl_1OgV8HGuKQxVPasTQ9Cm8EPf"
          // publishable-key="pk_test_51OYEejGuKQxVPasTmIP0YpYi6bMc5YxPdbTODK6FO0quQ9clYbr9TC9Kihv3o2zV8ErBY2xRD4OwnLNoxgE265B600yqy7eDkN"
        // ></StripePricing> */}
        <Footer />
      </>
    </div>
  );
}
