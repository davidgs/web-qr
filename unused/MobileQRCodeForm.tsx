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
import { useState, KeyboardEventHandler } from "react";
import { QRCode } from "react-qrcode-logo";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ClipboardData, Clipboard2CheckFill } from "react-bootstrap-icons";
import potrace from "potrace";
import { useSelector } from "react-redux";
import { RootState } from "../src/stores/store";
import ReactId from "../src/utils/ReactId";

export default function MobileQCode() {
  const [copied, setCopied] = useState<boolean>(false);
  const qSet = useSelector((state: RootState) => state.qr.settings);
  const settings = useSelector((state: RootState) => state.main.settings);
  const qrSettings = useSelector((state: RootState) => state.qrCode);
  const [qrState, setQrState] = useState<boolean>(false);
  const dark = useSelector((state: RootState) => state.main.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const darkIconClass = dark
    ? "copy-icon header-stuff-dark"
    : "copy-icon header-stuff";
  /**
   * Saving as an SVZG is a pain in the ass, so we do (most)
   * of that here but it requires Node.js to actually accomplish it, for unknown reasons.
   */
  const saveSVG = () => {
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const params = {
      background: qSet.XParent ? "none" : qrSettings.bgColor,
      color: qrSettings.fgColor,
    };
    const dataURL = canvas?.toDataURL(`image/${qSet.QRType}`);
    // eslint-disable-next-line func-names
    potrace.trace(dataURL, params, function (err: any, svg: any) {
      if (err) throw err;
      const a = document.createElement("a");
      a.href = `data:image/svg+xml;base64,${btoa(svg)}`;
      a.download = `qrcode-${ReactId()}.svg`;
      a.click();
    });
  };

  /**
   * Handle the 'download' click. and save the image
   */
  const onDownloadClick = (): void => {
    if (qSet.QRType === "svg") {
      saveSVG();
      return;
    }
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const dataURL = canvas?.toDataURL(`image/${qSet.QRType}`);
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `qrcode-${ReactId()}.${qSet.QRType}`;
    a.click();
  };

  /**
   * Copy link to the clipboard and change the icon to a checkmark
   * */
  function copyMe(): void {
    setQrState(true);
    setCopied(!copied);
    if (qrSettings?.value) {
      navigator.clipboard
        .writeText(qrSettings?.value)
        .then(null, null)
        // eslint-disable-next-line no-console
        .catch((err) => console.error("Error: ", err));
    }
  }

  return (
    <>
      <div className="fullrow">
        <div id="qr-element" style={{ margin: "auto" }}>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 300 }}
            rootClose
            overlay={
              <Tooltip id="qrcode-tooltip">
                Click the QR Code or the &lsquo;Download&rsquo; button to save
                the QR Code
              </Tooltip>
            }
          >
            <div
              onClick={onDownloadClick}
              onKeyDown={null as unknown as KeyboardEventHandler}
              role="button"
              tabIndex={-1}
              aria-label="Download QR Code"
              style={{ margin: "auto" }}
            >
              <QRCode
                id="react-qrcode-logo"
                value={
                  qrSettings?.value
                    ? qrSettings?.value
                    : "http://www.example.com/"
                }
                size={qrSettings?.size}
                bgolor={qrSettings?.bgColor}
                fgColor={qrSettings?.fgColor}
                logoImage={qrSettings?.logo_image}
                qrStyle={qrSettings?.qrStyle}
                logoWidth={qrSettings?.logo_width}
                logoHeight={qrSettings?.logo_height}
                logoOpacity={qrSettings?.logoOpacity}
                eyeColor={qrSettings?.eyeColor}
                eyeRadius={qrSettings?.eyeRadius}
                quietZone={qrSettings?.quietZone}
                enableCORS={qrSettings?.enableCORS}
                ecLevel={qrSettings?.ecLevel}
                logoPadding={qrSettings?.logoPadding}
                logoPaddingStyle={
                  qrSettings?.logoPaddingStyle !== "none"
                    ? qrSettings?.logoPaddingStyle
                    : undefined
                }
              />
            </div>
          </OverlayTrigger>
        </div>
      </div>
      {settings.formType !== "wifi" && (
        <div className="fullrow" style={{ height: "80px" }}>
          <div className="col45">
            {copied && (
              <OverlayTrigger
                delay={{ show: 250, hide: 300 }}
                rootClose
                overlay={
                  <Tooltip id="alert-tooltip">
                    You have successfully copied the link!
                  </Tooltip>
                }
              >
                <Clipboard2CheckFill
                  className={darkIconClass}
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </OverlayTrigger>
            )}
            {!copied && (
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                rootClose
                overlay={
                  <Tooltip id="alert-copied-tooltip">
                    Click here to copy your link!
                  </Tooltip>
                }
              >
                <ClipboardData
                  className={darkIconClass}
                  style={{
                    fontSize: "2rem",
                  }}
                  tabIndex={0}
                  cursor="pointer"
                  role="button"
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={copyMe}
                  // eslint-disable-next-line react/jsx-no-bind
                  onKeyDown={null as unknown as KeyboardEventHandler}
                  title="Click to copy your link!"
                />
              </OverlayTrigger>
            )}
          </div>
          <div className="col5" />
          <div className="urlCol">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              rootClose
              overlay={
                <Tooltip id="alert-copy-link-tooltip">
                  {qrState
                    ? "This data is encoded in the QR Code"
                    : "Click here to copy your link!"}
                </Tooltip>
              }
            >
              <div
                onClick={copyMe}
                onKeyDown={null as unknown as KeyboardEventHandler}
                role="button"
                tabIndex={0}
              >
                <strong style={{ cursor: "pointer" }} className={darkClass}>
                  {qrSettings?.value}
                </strong>
              </div>
            </OverlayTrigger>
          </div>
        </div>
      )}
    </>
  );
}
