/* eslint-disable no-console */
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
/* eslint-disable no-case-declarations */
import { JSX, useState, memo } from "react";
import { Accordion, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import "primereact/resources/primereact.min.css";
import { useSelector } from "react-redux";
import "../css/hyde.css";
import BitlyConfigurator from "../configuration/Configurators/BitlyConfigurator";
import MainValuesConfigurator from "../configuration/Configurators/MainValuesConfigurator";
import UTMConfigurator from "../configuration/Configurators/UTMConfigurator";
import QRConfigurator from "../configuration/Configurators/QRConfigurator";
import { RootState } from "../stores/store";

function ConfigPage(): JSX.Element {
  const [targetValidated] = useState(false);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const session = useSelector((state: RootState) => state.session.settings);

  return (
    <>
      <div className="main-column">
        <Row>
          <h2 style={{ margin: "auto", paddingBottom: "10px" }}>
            Configuration Editor
          </h2>
        </Row>
        {session.license_type === "free" && (
          <Row>
            <h2 style={{ margin: "auto" }}>
              No Changeable settings for Free version
            </h2>
          </Row>
        )}
        <Accordion>
          {/* Fence off for Basic/Enterprise license */}
          {/* General Config */}
          {session.license_type !== "free" &&
            session.license_type === "enterprise" && (
              <Accordion.Item eventKey="0">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="general-tooltip">
                      Configuration settings for Bit.ly integration
                    </Tooltip>
                  }
                >
                  <Accordion.Header className={darkClass}>
                    <strong>General Configuration</strong>
                  </Accordion.Header>
                </OverlayTrigger>
                <Accordion.Body id="general">
                  <Accordion>
                    {/* Bitly Configuration */}
                    <BitlyConfigurator eKey="0" />
                    {/* Fence off for Enterprise License */}
                    {/* UI Images */}
                    <MainValuesConfigurator targetValidated={targetValidated} />
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            )}
          {(session.license_type === "basic" ||
            session.license_type === "pro") && (
            <Accordion>
              <BitlyConfigurator eKey="0" />
            </Accordion>
          )}
          {/* End fence */}
          {/* Fence off for Basic/Enterprise License */}
          {/* QR Code Configuration */}
          {session.license_type !== "free" && (
            <Accordion.Item eventKey="1">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="qr-tooltip">
                    Configuration settings for the QR Code
                  </Tooltip>
                }
              >
                <Accordion.Header className={darkClass}>
                  <strong>QR Code Configuration</strong>
                </Accordion.Header>
              </OverlayTrigger>
              <QRConfigurator />
            </Accordion.Item>
          )}
          {/* End fence */}
          {/* UTM Codes */}
          {session.license_type !== "free" && (
            <Accordion.Item eventKey="2">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="utm-tooltip">
                    Configuration settings for the UTM Codes and how they are
                    used
                  </Tooltip>
                }
              >
                <Accordion.Header>
                  <strong>UTM Code Configuration</strong>
                </Accordion.Header>
              </OverlayTrigger>
              <UTMConfigurator />
            </Accordion.Item>
          )}
          {/* End fence */}
        </Accordion>
        {/* </ThemeContext.Provider> */}
      <div className="fullrow" style={{ paddingBottom: "25px" }} />
      <p />
        <p />
      </div>

    </>
  );
}
export default memo(ConfigPage);
