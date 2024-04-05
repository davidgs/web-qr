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
import React, { SyntheticEvent, useState } from "react";
import {
  Accordion,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
} from "react-bootstrap";
import { QRCode } from "react-qrcode-logo";
import { brandImageSettings } from "../../types";
import {
  updateFgColor,
  updateBgColor,
  updateEyeColor,
  updateLogoHeight,
  updateLogoWidth,
  updateLogoOpacity,
  updateLogoImage,
  updateECLevel,
  updateEnableCors,
  updateSize,
  updateQuietZone,
  updateRemoveQrCodeBehindLogo,
  updateLogoPadding,
  updateLogoPaddingStyle,
  updateQrStyle,
  updateQRType,
  updateXParent,
} from "../../reducers/qr/qrCodeSettingsSlice";
import { ColorResult, RGBColor } from "react-color";
import AdjusterKnob from "../../components/knobs/AdjusterKnob";
import Checker from "../../components/buttons/Checker";
import ColorPicker from "../../components/choosers/ColorPicker";
import EyeStylers from "../../components/knobs/EyeStylers";
import OpacityAdjuster from "../../components/knobs/OpacityAdjuster";
import { RootState } from "../../stores/store";
import FileTypeSelector from "../../components/FileTypeSelector";
import "../../css/QRConfig.css";
import "../../css/MainConfig.css";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { setSettingsUpdated } from "../../reducers/session/loginSlice";

export default function QRConfigurator() {
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const [imgAspect, setImgAspec] = useState(1);
  const dispatch = useAppDispatch();
  const qrSettings = useAppSelector(
    (state: RootState) => state.qrCode.settings
  );
  const [isAspectLocked, setIsAspectLocked] = useState(false);
  const [showLogo, setShowLogo] = useState(qrSettings.logoImage !== "");
  const maxQrHeight = qrSettings.size * 0.3;
  const maxQrWidth = qrSettings.size * 0.3;
  const logoWidth = Math.round(qrSettings.logoWidth + 10);
  const session = useAppSelector((state: RootState) => state.license.settings);

  /**
   *  set the aspect ratio of the image
   *  @param: width: the width of the image.
   *  @param: height: the height of the image.
   */
  const setAspectRatio = (width: number, height: number) => {
    setImgAspec(width / height);
  };

  /* lock/unlock the aspect ratio of the qr logo */
  const setLockAspectRatio = () => {
    setIsAspectLocked(!isAspectLocked);
  };

  const hexToRgb = (hex: string): RGBColor => {
    if (hex === undefined) {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      };
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex
    ) as RegExpExecArray;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255,
    };
  };
  /**
   * make an rgba() color from a string
   * @param color the color to convert to an RGBColor
   * @returns the RGBColor
   * */
  const makeRGBAFromString = (color: string): RGBColor => {
    if (color === undefined) {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      };
    }
    if (color.indexOf("rgb") === -1) {
      return hexToRgb(color);
    }
    const frgb = color
      .substring(color.indexOf("(") + 1, color?.indexOf(")"))
      .split(",");
    return {
      r: parseInt(frgb[0], 10),
      g: parseInt(frgb[1], 10),
      b: parseInt(frgb[2], 10),
      a: parseInt(frgb[3], 10),
    };
  };

  /**
   * Set the image height and width
   * @param height
   * @param width
   * @param im
   * @returns
   */
  const setImageSize = (height: number, width: number) => {
    const imH = height; // qrSettings.logoHeight;
    const sc = height / imH;
    let newH = height;
    let newW = width;
    if (isAspectLocked) {
      if (height > maxQrHeight) {
        newH = maxQrHeight;
        newW = Math.round(maxQrHeight * imgAspect);
      }
      if (width > maxQrWidth) {
        newW = maxQrWidth;
        newH = Math.round(maxQrWidth * imgAspect);
      } else {
        newH = height;
        newW = Math.round(width * sc * imgAspect);
      }
      dispatch(updateLogoHeight(newH));
      dispatch(updateLogoWidth(newW));
      dispatch(setSettingsUpdated(true));
      return;
    }
    const newWidth = width > maxQrWidth ? maxQrWidth : width;
    const scaleW = newWidth === width ? 1 : newWidth / width;
    if (width !== height) {
      const newHeight = Math.round(height * scaleW);
      dispatch(updateLogoHeight(newHeight));
      dispatch(updateLogoWidth(newWidth));
      dispatch(setSettingsUpdated(true));
    }
  };

  /* handle saving the qr logo file for branding
      @param: result: the result of the file read
  */
  const setFileName = (result: SyntheticEvent) => {
    const ev = result as React.ChangeEvent<HTMLInputElement>;
    const read = new FileReader();
    const foo = ev.target.files;
    if (foo) {
      const f = foo[0];
      const fName = f.name;
      read.readAsDataURL(f);
      read.onloadend = () => {
        const fi = new Image();
        fi.src = read.result as string;
        fi.onload = () => {
          const h = fi.height;
          const w = fi.width;
          setImageSize(h, w);
          dispatch(updateLogoImage(fi.src));
          dispatch(updateLogoOpacity(1.0));
          dispatch(
            updateQRType(fName.split(".").pop() as "png" | "jpg" | "svg")
          );
          setAspectRatio(w, h);
          setIsAspectLocked(true);
          setShowLogo(true);
          dispatch(setSettingsUpdated(true));
        };
      };
    }
  };

  /** Handle the Color Changes
   * @param: color: the color that was selected
   * @param: name: the name of the field that was selected
   * */
  const handleColorChange = (color: ColorResult, name: string) => {
    switch (name) {
      case "bgColor":
        dispatch(
          updateBgColor(color.hex === undefined ? "#ffffff" : `${color.hex}`)
        );
        dispatch(setSettingsUpdated(true));
        break;
      case "eyeColor":
        dispatch(
          updateEyeColor(color.hex === undefined ? "#000000" : `${color.hex}`)
        );
        dispatch(setSettingsUpdated(true));
        break;
      case "fgColor":
        dispatch(
          updateFgColor(color.hex === undefined ? "#000000" : `${color.hex}`)
        );
        dispatch(setSettingsUpdated(true));
        break;
      default:
        break;
    }
  };

  return (
    <Accordion.Body id="qr">
      {/* QR Colors */}
      <div className="qr-section">File Type</div>
      <div className="main-settings-row">
        <div className="main-settings-settings">
          <div className="main-settings-row">
            <div className="controls-row">
              <div className="label-column">
                <Form.Label className={darkClass}>File Extension: </Form.Label>
              </div>
              <div className={`qr-control ${darkClass}`}>
                <FileTypeSelector
                  onSelectionChange={(val) => {
                    if (val !== qrSettings.QRType) {
                      dispatch(setSettingsUpdated(true));
                    }
                    dispatch(updateQRType(val as "png" | "svg" | "jpg"));
                  }}
                  fileType={qrSettings.QRType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {qrSettings.QRType === "svg" && (
        <>
          <div className="main-settings-row">
            <div className="main-settings-settings">
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="label-column">
                    <Form.Label className={darkClass}>
                      Transparent Background
                    </Form.Label>
                  </div>
                  <div className="control-column">
                    <Checker
                      cState={qrSettings.XParent}
                      label=""
                      tooltip="Set the svg background to transparent"
                      disabled={session.license_type === "free"}
                      callback={(value) => {
                        if (qrSettings.XParent !== value)
                          dispatch(setSettingsUpdated(true));
                        dispatch(updateXParent(value));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="qr-section-hr" />
        </>
      )}
      <>
        <div className="qr-section">Colors</div>
        {/* Colors */}
        <div className="main-settings-row">
          <div className="controls-row">
            {/* Foreground Colors */}
            <div className="label-column">
              <Form.Label className={darkClass}>Foreground:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                session.license_type !== "free" ? (
                  <Tooltip id="fg-tooltip">
                    Click to select a color for the QR Code elements
                  </Tooltip>
                ) : (
                  <Tooltip id="fg-tooltip">
                    Color changes are only available with a paid subscription
                  </Tooltip>
                )
              }
            >
              <div className="control-column">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.fgColor)}
                  name="fgColor"
                  callback={handleColorChange}
                />
              </div>
            </OverlayTrigger>
          </div>
          {/* QR Code Background Color */}
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass}>Background:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                session.license_type !== "free" ? (
                  <Tooltip id="bg-tooltip">
                    Click to select a color for the QR Code background
                  </Tooltip>
                ) : (
                  <Tooltip id="bg-tooltip">
                    Color changes are only available with a paid subscription
                  </Tooltip>
                )
              }
            >
              <div className="control-column">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.bgColor)}
                  name="bgColor"
                  callback={handleColorChange}
                />
              </div>
            </OverlayTrigger>
          </div>
          {/* QR Code Eye Color */}
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass}>Eye Color:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                session.license_type !== "free" ? (
                  <Tooltip id="eye-tooltip">
                    Click to select a color for the QR Code eyes
                  </Tooltip>
                ) : (
                  <Tooltip id="eye-tooltip">
                    Color changes are only available with a paid subscription
                  </Tooltip>
                )
              }
            >
              <div className="control-column">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.eyeColor as string)}
                  name="eyeColor"
                  callback={handleColorChange}
                />
              </div>
            </OverlayTrigger>
          </div>
        </div>
        <hr />

        <div className="qr-section">QR Code Adjustments</div>
        <div className="main-settings-row">
          {/* QR Code Style */}
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass} style={{ marginTop: "0.5rem" }}>
                <strong>QR Code Style</strong>
              </Form.Label>
            </div>
            <div className="control-column">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  session.license_type !== "free" ? (
                    <Tooltip id="qr-style-tooltip">
                      Choose dots or squares for the QR Code data
                    </Tooltip>
                  ) : (
                    <Tooltip id="qr-style-tooltip">
                      QR Code style changes are only available with a paid
                      subscription
                    </Tooltip>
                  )
                }
              >
                <Form.Select
                  className={darkClass}
                  disabled={session.license_type === "free"}
                  aria-label="Choose dots or squares for the code"
                  defaultValue={qrSettings.qrStyle as "dots" | "squares"}
                  onChange={(e) => {
                    const ds = e.target.value as "dots" | "squares";
                    if (e.target.value !== qrSettings.qrStyle)
                      dispatch(setSettingsUpdated(true));
                    dispatch(updateQrStyle(ds));
                  }}
                >
                  <option value="dots">Dots</option>
                  <option value="squares">Squares</option>
                </Form.Select>
              </OverlayTrigger>
            </div>
          </div>
          {/* QR Code Error Correction Level */}
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass} style={{ marginTop: "0.5rem" }}>
                <strong>Error Correction: </strong>
              </Form.Label>
            </div>
            <div className="control-column">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  session.license_type !== "free" ? (
                    <Tooltip id="ec-tooltip">
                      Choose the error correction level for the QR Code (H is
                      reccomended)
                    </Tooltip>
                  ) : (
                    <Tooltip id="ec-tooltip">
                      Error correction changes are only available with a paid
                      subscription
                    </Tooltip>
                  )
                }
              >
                <Form.Select
                  className={darkClass}
                  disabled={session.license_type === "free"}
                  aria-label="Error correction selection"
                  onChange={(e) => {
                    const eq = e.target.value as "L" | "M" | "Q" | "H";
                    if (e.target.value !== qrSettings.ecLevel)
                      dispatch(setSettingsUpdated(true));
                    dispatch(updateECLevel(eq));
                  }}
                  defaultValue={qrSettings.ecLevel as "L" | "M" | "Q" | "H"}
                >
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30%)</option>
                </Form.Select>
              </OverlayTrigger>
            </div>
          </div>
          {/* Cors Enablement */}
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass}>
                <strong>Enable CORS</strong>
              </Form.Label>
            </div>
            <div className="controls-column">
              <Checker
                cState={qrSettings.enableCORS}
                label=""
                tooltip={
                  session.license_type === "free"
                    ? "Changes to CORS only for paid subscriptions"
                    : "Enable Cross Origin Resource Sharing (CORS) for the QR Code"
                }
                disabled={false}
                callback={(e) => {
                  if (e !== qrSettings.enableCORS)
                    dispatch(setSettingsUpdated(true));
                  dispatch(updateEnableCors(e));
                }}
              />
            </div>
          </div>
        </div>
        {/* QR Code Size & Quiet Zone */}
        <div className="main-settings-row">
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                <strong>QR Code Size:</strong>
              </Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                session.license_type !== "free" ? (
                  <Tooltip id="qr-size-tooltip">
                    Set the size of the QR Code (the size of your QR Code Logo
                    can change based on this value)
                  </Tooltip>
                ) : (
                  <Tooltip id="qr-size-tooltip">
                    QR Code size changes are only available with a paid
                    subscription
                  </Tooltip>
                )
              }
            >
              <div className="knobColumn">
                <AdjusterKnob
                  name="qrSize"
                  value={qrSettings.size as number}
                  min={100}
                  max={500}
                  step={10}
                  disabled={session.license_type === "free"}
                  callback={(e) => {
                    if (e !== qrSettings.size)
                      dispatch(setSettingsUpdated(true));
                    dispatch(updateSize(e));
                  }}
                />
              </div>
            </OverlayTrigger>
          </div>
          <div className="controls-row">
            <div className="label-column">
              <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                <strong>Quiet Zone:</strong>
              </Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                session.license_type !== "free" ? (
                  <Tooltip id="quiet-zone-tooltip">
                    Set the size of the quiet zone (white space) around the QR
                    Code
                  </Tooltip>
                ) : (
                  <Tooltip id="quiet-zone-tooltip">
                    Quiet zone changes are only available with a paid
                    subscription
                  </Tooltip>
                )
              }
            >
              <div className="knobColumn">
                <AdjusterKnob
                  name="quietZone"
                  value={qrSettings.quietZone as number}
                  min={0}
                  max={50}
                  step={1}
                  disabled={session.license_type === "free"}
                  callback={(e) => {
                    if (e !== qrSettings.quietZone)
                      dispatch(setSettingsUpdated(true));
                    dispatch(updateQuietZone(e));
                  }}
                />
              </div>
            </OverlayTrigger>
          </div>
        </div>
        <hr />
        {/* QR Eye Styles */}
        <div className="qr-section">QR Eye Styles</div>
        <div className="main-settings-row">
          {/* Dynamic QR Code preview */}
          <div className="qr-preview">
            {/* QR Code */}
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="qr-tooltip">
                  This is what your final QR Codes will look like
                </Tooltip>
              }
            >
              <div
                style={{
                  marginTop: "2rem",
                  margin: "auto",
                  display: "flex",
                }}
              >
                <QRCode
                  id="react-qrcode-logo"
                  value={qrSettings.value as string | "https://www.google.com"}
                  size={qrSettings.size as number | 200}
                  bgColor={qrSettings.bgColor as string | "#FFFFFF"}
                  fgColor={qrSettings.fgColor as string | "#000000"}
                  logoImage={showLogo ? qrSettings.logoImage : ""}
                  qrStyle={qrSettings.qrStyle as "dots" | "squares"}
                  logoWidth={qrSettings.logoWidth as number | 80}
                  logoHeight={qrSettings.logoHeight as number | 80}
                  logoOpacity={qrSettings.logoOpacity as number | 1}
                  eyeColor={qrSettings.eyeColor}
                  eyeRadius={qrSettings.eyeRadius}
                  quietZone={qrSettings.quietZone as number | 0}
                  enableCORS={qrSettings.enableCORS as boolean | false}
                  ecLevel={qrSettings.ecLevel as "L" | "M" | "Q" | "H" | "L"}
                  logoPadding={qrSettings.logoPadding as number | 0}
                  logoPaddingStyle={
                    (qrSettings.logoPaddingStyle !== undefined
                      ? qrSettings.logoPaddingStyle
                      : undefined) as "circle" | "square" | undefined
                  }
                />
              </div>
            </OverlayTrigger>
            {/* QR Code Logo */}
          </div>
          {/* Eye Stylers */}
          <EyeStylers />
        </div>
        <hr />
        <>
          <div className="qr-section">QR Image Options</div>
          <div className="main-settings-row">
            {/* QR Code Logo File Input */}
            <div className="main-settings-settings">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  session.license_type === "pro" ||
                  session.license_type === "enterprise" ? (
                    <Tooltip id="qr-logo-tooltip">
                      Select a logo to use in the QR Code
                    </Tooltip>
                  ) : (
                    <Tooltip id="qr-logo-tooltip">
                      Logo changes are only available with a Pro or Enterprise
                      subscription
                    </Tooltip>
                  )
                }
              >
                <Form.Control
                  className={darkClass}
                  type="file"
                  disabled={
                    session.license_type === "free" ||
                    session.license_type === "basic"
                  }
                  id="input-qr-file"
                  onInput={(e) => {
                    setFileName(e);
                  }}
                  accept=".png,.jpg,.jpeg, .svg"
                />
              </OverlayTrigger>
              {/* QR Code Show */}
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="label-column">
                    <Form.Label className={darkClass}>Show Logo</Form.Label>
                  </div>
                  {/* Show QR Logo control */}
                  <div className="check-column">
                    <Checker
                      cState={showLogo}
                      disabled={
                        qrSettings.logoImage === "" ||
                        session.license_type === "free" ||
                        session.license_type === "basic"
                      }
                      label=""
                      tooltip={
                        session.license_type === "free" ||
                        session.license_type === "basic"
                          ? "Changes to Logo only for paid subscriptions"
                          : "Show the logo"
                      }
                      callback={(value) => setShowLogo(value)}
                    />
                  </div>
                </div>
              </div>
              {/* Hide QR Behind Logo */}
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="label-column">
                    <Form.Label className={darkClass}>
                      Hide QR Behind Logo
                    </Form.Label>
                  </div>
                  {/* Hide QR Behind Logo control */}
                  <div className="check-column">
                    <Checker
                      cState={qrSettings.removeQrCodeBehindLogo}
                      disabled={
                        (qrSettings.logoImage === "" || !showLogo) &&
                        (session.license_type === "free" ||
                          session.license_type === "basic")
                      }
                      label=""
                      tooltip={
                        session.license_type === "free" ||
                        session.license_type === "basic"
                          ? "Changes to Logo only for paid subscriptions"
                          : "Hide QR Code behind the logo"
                      }
                      callback={(value) => {
                        if (value !== qrSettings.removeQrCodeBehindLogo)
                          dispatch(setSettingsUpdated(true));
                        dispatch(updateRemoveQrCodeBehindLogo(value));
                      }}
                    />
                  </div>
                </div>
              </div>
              {qrSettings.logoImage !== "" &&
              qrSettings.logoImage !== null &&
              qrSettings.logoImage !== undefined ? (
                <div className="main-settings-row">
                  <div className="controls-row">
                    <div className="label-column">
                      <Form.Label className={darkClass}>
                        Delete QR Code Logo
                      </Form.Label>
                    </div>
                    <div className="check-column">
                      <Checker
                        cState={false}
                        disabled={
                          session.license_type === "free" ||
                          session.license_type === "basic"
                        }
                        label=""
                        tooltip={
                          session.license_type === "free" ||
                          session.license_type === "basic"
                            ? "Changes to Logo only for paid subscriptions"
                            : "Delete QR Code Logo"
                        }
                        callback={() => {
                          if (qrSettings.logoImage !== "")
                            dispatch(setSettingsUpdated(true));
                          dispatch(updateLogoImage(""));
                          setShowLogo(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              )}

              {/* QR Code Logo Size */}
              <div className="main-settings-row">
                <div className="controls-row">
                  <div className="adjuster-label">
                    <Form.Label
                      className={darkClass}
                      style={{ marginTop: "1rem" }}
                    >
                      Logo Height
                    </Form.Label>
                  </div>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      session.license_type === "free" ||
                      session.license_type === "basic" ? (
                        <Tooltip id="qr-logo-height-tooltip">
                          Changes to Logo only for paid subscriptions
                        </Tooltip>
                      ) : (
                        <Tooltip id="qr-logo-height-tooltip">
                          Set the height of the QR Code Logo (The allowed size
                          will change based on the overall size of the QR Code)
                        </Tooltip>
                      )
                    }
                  >
                    <div className="adjuster-control">
                      <AdjusterKnob
                        name="qrLogoHeight"
                        value={qrSettings.logoHeight as number}
                        min={10}
                        max={maxQrHeight}
                        step={1}
                        disabled={!showLogo}
                        callback={(e) => {
                          if (
                            qrSettings.logoWidth >= maxQrWidth &&
                            e > qrSettings.logoHeight
                          ) {
                            return;
                          }
                          setImageSize(e, qrSettings.logoWidth as number);
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
                {/* Lock Aspect Ratio */}
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    session.license_type === "free" ||
                    session.license_type === "basic" ? (
                      <Tooltip id="qr-aspect-tooltip">
                        Changes to Logo only for paid subscriptions
                      </Tooltip>
                    ) : (
                      <Tooltip id="qr-aspect-tooltip">
                        {isAspectLocked ? "Unlock" : "Lock"} Aspect Ratio
                      </Tooltip>
                    )
                  }
                >
                  <div className="controls-row">
                    <Button
                      className="aspect-button" //{darkClass}
                      variant="outline-secondary"
                      onClick={setLockAspectRatio}
                      disabled={
                        !showLogo ||
                        session.license_type === "free" ||
                        session.license_type === "basic"
                      }
                    >
                      {isAspectLocked ? (
                        <i className="bi bi-lock" />
                      ) : (
                        <i className="bi bi-unlock" />
                      )}{" "}
                    </Button>
                  </div>
                </OverlayTrigger>
                <div className="controls-row">
                  <div className="adjuster-label">
                    <Form.Label
                      className={darkClass}
                      style={{ marginTop: "1rem" }}
                    >
                      Logo Width
                    </Form.Label>
                  </div>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      session.license_type === "free" ||
                      session.license_type === "basic" ? (
                        <Tooltip id="qr-logo-width-tooltip">
                          Changes to Logo only for paid subscriptions
                        </Tooltip>
                      ) : (
                        <Tooltip id="qr-logo-width-tooltip">
                          Set the width of the QR Code Logo (The allowed size
                          will change based on the overall size of the QR Code)
                        </Tooltip>
                      )
                    }
                  >
                    <div className="adjuster-control">
                      <AdjusterKnob
                        name="qrLogoWidth"
                        value={qrSettings.logoWidth as number}
                        min={brandImageSettings.minWidth}
                        max={maxQrWidth}
                        step={1}
                        disabled={!showLogo || isAspectLocked}
                        callback={(e) => {
                          if (
                            e > maxQrWidth ||
                            qrSettings.logoHeight >= maxQrHeight
                          ) {
                            return;
                          }
                          setImageSize(qrSettings.logoHeight as number, e);
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
              </div>
              {/* Logo Opacity & Padding */}
              <div className="main-settings-row">
                <div className="controls-row">
                  {/* Logo Opacity */}
                  <div className="adjuster-label">
                    <Form.Label
                      className={darkClass}
                      style={{ marginTop: "1rem" }}
                    >
                      Logo Opacity
                    </Form.Label>
                  </div>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      session.license_type === "free" ||
                      session.license_type === "basic" ? (
                        <Tooltip id="qr-logo-opacity-tooltip">
                          Changes to Logo only for paid subscriptions
                        </Tooltip>
                      ) : (
                        <Tooltip id="qr-logo-opacity-tooltip">
                          Set the opacity of the QR Code Logo
                        </Tooltip>
                      )
                    }
                  >
                    <div className="adjuster-control">
                      <OpacityAdjuster
                        val={qrSettings.logoOpacity}
                        disabled={showLogo}
                        callback={(value) => {
                          if (value !== qrSettings.logoOpacity)
                            dispatch(setSettingsUpdated(true));
                          dispatch(updateLogoOpacity(value));
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="controls-row-invisible">
                  <div className="aspect-button">&nbsp;</div>
                </div>
                {/* Logo Padding */}
                <div className="controls-row">
                  <div className="adjuster-label">
                    <Form.Label
                      className={darkClass}
                      style={{ marginTop: "1rem" }}
                    >
                      Logo Padding
                    </Form.Label>
                  </div>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      session.license_type === "free" ||
                      session.license_type === "basic" ? (
                        <Tooltip id="qr-logo-padding-tooltip">
                          Changes to Logo only for paid subscriptions
                        </Tooltip>
                      ) : (
                        <Tooltip id="qr-logo-padding-tooltip">
                          Set the padding around the QR Code Logo
                        </Tooltip>
                      )
                    }
                  >
                    <div className="adjuster-control">
                      <AdjusterKnob
                        name="qrLogoPadding"
                        value={qrSettings.logoPadding as number}
                        min={0}
                        max={50}
                        step={1}
                        disabled={
                          !showLogo ||
                          session.license_type === "free" ||
                          session.license_type === "basic"
                        }
                        callback={(e) => {
                          if (e !== qrSettings.logoPadding)
                            dispatch(setSettingsUpdated(true));
                          dispatch(updateLogoPadding(e));
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
              </div>
              {/* Padding Style */}
              <div className="controls-row">
                <div className="label-column">
                  <Form.Label className={darkClass}>Padding Style</Form.Label>
                </div>
                <div className="control-column">
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      session.license_type === "free" ||
                      session.license_type === "basic" ? (
                        <Tooltip id="qr-logo-padding-style-tooltip">
                          Changes to Logo only for paid subscriptions
                        </Tooltip>
                      ) : (
                        <Tooltip id="qr-logo-padding-style-tooltip">
                          Set the padding style around the QR Code Logo
                        </Tooltip>
                      )
                    }
                  >
                    <Form.Select
                      className={darkClass}
                      aria-label="Padding style (round or square) around the QR Code Logo"
                      onChange={(e) => {
                        let eq = e.target.value as string | undefined;
                        if (eq === "None") {
                          eq = undefined;
                        }
                        dispatch(
                          updateLogoPaddingStyle(
                            eq as "circle" | "square" | undefined
                          )
                        );
                        if (eq !== undefined && qrSettings.logoPadding === 0) {
                          dispatch(updateLogoPadding(5));
                        } else if (eq === undefined) {
                          dispatch(updateLogoPadding(0));
                        }
                        dispatch(setSettingsUpdated(true));
                      }}
                      disabled={
                        !showLogo ||
                        session.license_type === "free" ||
                        session.license_type === "basic"
                      }
                      defaultValue={
                        qrSettings.logoPaddingStyle === undefined
                          ? "None"
                          : qrSettings.logoPaddingStyle
                      }
                    >
                      <option value={undefined}>None</option>
                      <option value="circle">Circle</option>
                      <option value="square">Square</option>
                    </Form.Select>
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            {/* QR Code Logo preview */}
            <div className="col40">
              {showLogo ? (
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="qr-logo-preview-tooltip">
                      This is what your QR Code Logo will look like
                    </Tooltip>
                  }
                >
                  <div style={{ width: `${logoWidth}px`, margin: "auto" }}>
                    <img
                      src={qrSettings.logoImage as string}
                      alt="QR Code logo"
                      style={{
                        width: `${qrSettings.logoWidth}px`,
                        height: `${qrSettings.logoHeight}px`,
                        opacity: qrSettings.logoOpacity
                          ? qrSettings.logoOpacity
                          : 1,
                      }}
                    />
                  </div>
                </OverlayTrigger>
              ) : null}
            </div>
          </div>
        </>
      </>

      {/*End Fence */}
    </Accordion.Body>
  );
}
