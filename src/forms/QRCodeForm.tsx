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
import { RootState } from "../stores/store";
import ReactId from "../utils/ReactId";
import "../css/QRForm.css";
import { useAppSelector } from "../stores/hooks";

export default function QCode() {
  const [copied, setCopied] = useState<boolean>(false);
  const settings = useAppSelector((state: RootState) => state.main.settings);
  const qrSettings = useAppSelector((state: RootState) => state.qrCode.settings);
  const [qrState, setQrState] = useState<boolean>(false);
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  /**
   * Saving as an SVG is a pain in the ass, so we do (most)
   * of that here but it requires Node.js to actually accomplish it, for unknown reasons.
   */
  const saveSVG = () => {
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const params = {
      background: qrSettings.XParent ? "none" : qrSettings.bgColor,
      color: qrSettings.fgColor,
    };
    const dataURL = canvas?.toDataURL(`image/${qrSettings.QRType}`);
    // eslint-disable-next-line func-names
    potrace.trace(dataURL, params, function (err: any, svg: any) {
      if (err) throw err;
      const a = document.createElement("a");
      a.href = `data:image/svg+xml;base64,${btoa(svg)}`;
      a.download = `qrcode-${ReactId()}.svg`;
      a.click();
    });
  };

  console.log(`fgColor: ${qrSettings.fgColor}`);
  /**
   * Handle the 'download' click. and save the image
   */
  const onDownloadClick = (): void => {
    if (qrSettings.QRType === "svg") {
      saveSVG();
      return;
    }
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const dataURL = canvas?.toDataURL(`image/${qrSettings.QRType}`);
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `qrcode-${ReactId()}.${qrSettings.QRType}`;
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
    <div className="qr-code-form">
      {settings.formType !== "wifi" && (
        <>
          <div
            className="qr-icon-column"
            style={{ height: `${qrSettings?.size}px` }}
          >
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
                  className={`copy-icon ${darkClass}`}
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
                  className={`copy-icon ${darkClass}`}
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
          <div
            className="url-column"
            style={{ height: `${qrSettings?.size}px` }}
          >
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
        </>
      )}
      <div
        className="qr-code-column"
        id="qr-element"
        style={{ margin: settings.formType === "wifi" ? "auto" : "" }}
      >
        <OverlayTrigger
          placement="auto"
          delay={{ show: 250, hide: 300 }}
          rootClose
          overlay={
            <Tooltip id="qrcode-tooltip">
              Click the QR Code or the &lsquo;Download&rsquo; button to save the
              QR Code
            </Tooltip>
          }
        >
          <div
            onClick={onDownloadClick}
            onKeyDown={null as unknown as KeyboardEventHandler}
            role="button"
            tabIndex={-1}
            aria-label="Download QR Code"
          >
            <QRCode
              id="react-qrcode-logo"
              value={
                qrSettings.value ? qrSettings.value : "http://www.example.com/"
              }
              size={qrSettings.size}
              bgColor={qrSettings.bgColor}
              fgColor={qrSettings.fgColor}
              logoImage={qrSettings.logoImage}
              qrStyle={qrSettings.qrStyle}
              logoWidth={qrSettings.logoWidth}
              logoHeight={qrSettings.logoHeight}
              logoOpacity={qrSettings.logoOpacity}
              eyeColor={qrSettings.eyeColor}
              eyeRadius={qrSettings.eyeRadius}
              quietZone={qrSettings.quietZone}
              enableCORS={qrSettings.enableCORS}
              ecLevel={qrSettings.ecLevel}
              logoPadding={qrSettings.logoPadding}
              logoPaddingStyle={
                qrSettings.logoPaddingStyle !== "circle" &&
                qrSettings.logoPaddingStyle !== "square"
                  ? qrSettings.logoPaddingStyle
                  : undefined
              }
            />
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
}
