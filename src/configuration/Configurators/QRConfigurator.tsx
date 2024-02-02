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
import React, { SyntheticEvent, useState } from 'react';
import {
  Accordion,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { QRCode } from 'react-qrcode-logo';
import { brandImageSettings } from '../../types';
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
} from '../../reducers/qr/qrCodeSettingsSlice';
import { ColorResult, RGBColor } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';
import { updateQRType, updateXParent } from '../../reducers/qr/qrSlice';
import AdjusterKnob from '../../components/knobs/AdjusterKnob';
import Checker from '../../components/buttons/Checker';
import ColorPicker from '../../components/choosers/ColorPicker';
import EyeStylers from '../../components/knobs/EyeStylers';
import Locked from '../../components/Locked';
import OpacityAdjuster from '../../components/knobs/OpacityAdjuster';
import UnLocked from '../../components/Unlocked';
import { RootState } from '../../stores/store';
import FileTypeSelector from '../../components/FileTypeSelector';

export default function QRConfigurator() {
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';
  const [imgAspect, setImgAspec] = useState(1);
  const dispatch = useDispatch();
  const qrSettings = useSelector((state: RootState) => state.qrCode.settings);
  const qSet = useSelector((state: RootState) => state.qr.settings);
  const [isAspectLocked, setIsAspectLocked] = useState(false);
  const [showLogo, setShowLogo] = useState(qrSettings.logoImage !== '');
  const maxQrHeight = qrSettings.size * 0.3;
  const maxQrWidth = qrSettings.size * 0.3;
  const logoWidth = Math.round(qrSettings.logoWidth + 10);
  const session = useSelector((state: RootState) => state.session.settings);

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
    const frgb = color
      .substring(color.indexOf('(') + 1, color?.indexOf(')'))
      .split(',');
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
    const imH = height;  // qrSettings.logoHeight;
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
      return;
    }
    const newWidth = width > maxQrWidth ? maxQrWidth : width;
    const scaleW = newWidth === width ? 1 : newWidth / width;
    if (width !== height) {
      const newHeight = Math.round(height * scaleW);
      dispatch(updateLogoHeight(newHeight));
      dispatch(updateLogoWidth(newWidth));
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
          dispatch(updateQRType(fName.split('.').pop()));
          setAspectRatio(w, h);
          setIsAspectLocked(true);
          setShowLogo(true);
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
      case 'bgColor':
        dispatch(
          updateBgColor(
            `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
          ),
        );
        break;
      case 'eyeColor':
        dispatch(
          updateEyeColor(
            `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
          ),
        );
        break;
      case 'fgColor':
        dispatch(
          updateFgColor(
            `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
          ),
        );
        break;
      default:
        break;
    }
  };

  return (
    <Accordion.Body id="qr">
      {/* QR Colors */}
      <div className="fullrow">
        <Form.Label className={darkClass}>
          <strong>File Type:</strong>
        </Form.Label>
      </div>
      <div className="fullrow">
        <div className="col10" style={{ marginTop: "1rem" }}>
          <Form.Label className={darkClass}>File Extension: </Form.Label>
        </div>
        <div className="spacer" />
        <div className="spacer" />
        <div className={`col15 ${darkClass}`}>
          <FileTypeSelector
            onSelectionChange={(val) => {
              dispatch(updateQRType(val));
            }}
            fileType={qSet.QRType}
          />
        </div>
        <div className="spacer" />
        <div className="col5" />

        {(qSet?.QRType === "svg" && session.license_type !== 'free') ? (
          <>
            <div className="col20" style={{ paddingTop: "20px" }}>
              <Form.Label className={darkClass}>
                Transparent Background
              </Form.Label>
            </div>
            <div className="col5" style={{ paddingTop: "20px" }}>
              <Checker
                cState={qSet?.XParent}
                label=""
                tooltip="Set the svg background to transparent"
                disabled={false}
                callback={(value) => {
                  dispatch(updateXParent(value));
                }}
              />
            </div>
          </>
        ) : (
          <div className="col35" />
        )}
      </div>
      {session.license_type !== 'free' ? (
        <>
          <div className="fullrow">
          <Form.Label className={darkClass}>
            <strong>Colors:</strong>
          </Form.Label>
          </div>
          {/* Colors */}
          <div className="fullrow">
            {/* Foreground Colors */}
            <div className="col10" style={{ marginTop: ".25rem" }}>
              <Form.Label className={darkClass}>Foreground:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="fg-tooltip">
                Click to select a color for the QR Code elements
              </Tooltip>}
            >
              <div className="col8">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.fgColor)}
                  name="fgColor"
                  callback={handleColorChange} />
              </div>
            </OverlayTrigger>
            <div className="col10" />
            <div className="col5" />
            {/* QR Code Background Color */}
            <div className="col10" style={{ marginTop: ".25rem" }}>
              <Form.Label className={darkClass}>Background:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="bg-tooltip">
                Click to select a color for the QR Code background
              </Tooltip>}
            >
              <div className="col8">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.bgColor)}
                  name="bgColor"
                  callback={handleColorChange} />
              </div>
            </OverlayTrigger>
            <div className="col10" />
            <div className="col5" />
            {/* QR Code Eye Color */}
            <div className="col10" style={{ marginTop: ".25rem" }}>
              <Form.Label className={darkClass}>Eye Color:</Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="eye-tooltip">
                Click to select a color for the QR Code eyes
              </Tooltip>}
            >
              <div className="col8">
                <ColorPicker
                  pickColor={makeRGBAFromString(qrSettings.eyeColor as string)}
                  name="eyeColor"
                  callback={handleColorChange} />
              </div>
            </OverlayTrigger>
            <div className="col10" />
            <div className="spacer" />
          </div>
          <hr />
          {/* QR Code Style */}
          <div className="fullrow">
            <div className="col15">
              <Form.Label className={darkClass} style={{ marginTop: "0.5rem" }}>
                <strong>QR Code Style</strong>
              </Form.Label>
            </div>
            <div className="col15">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id="qr-style-tooltip">
                  Choose dots or squares for the QR Code data
                </Tooltip>}
              >
                <Form.Select
                  className={darkClass}
                  aria-label="Choose dots or squares for the code"
                  defaultValue={qrSettings.qrStyle as "dots" | "squares"}
                  onChange={(e) => {
                    const ds = e.target.value as "dots" | "squares";
                    dispatch(updateQrStyle(ds));
                  } }
                >
                  <option value="dots">Dots</option>
                  <option value="squares">Squares</option>
                </Form.Select>
              </OverlayTrigger>
            </div>
            <div className="col5" />

            {/* QR Code Error Correction Level */}
            <div className="col15">
              <Form.Label className={darkClass} style={{ marginTop: "0.5rem" }}>
                <strong>Error Correction: </strong>
              </Form.Label>
            </div>
            <div className="col15">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id="ec-tooltip">
                  Choose the error correction level for the QR Code (H is
                  reccomended)
                </Tooltip>}
              >
                <Form.Select
                  className={darkClass}
                  aria-label="Error correction selection"
                  onChange={(e) => {
                    const eq = e.target.value as "L" | "M" | "Q" | "H";
                    dispatch(updateECLevel(eq));
                  } }
                  defaultValue={qrSettings.ecLevel as "L" | "M" | "Q" | "H"}
                >
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30%)</option>
                </Form.Select>
              </OverlayTrigger>
            </div>
            <div className="col5" />
            <div className="col15" style={{ marginTop: ".75rem" }}>
              <Form.Label className={darkClass}>
                <strong>Enable CORS</strong>
              </Form.Label>
            </div>
            <div className="col15" style={{ marginTop: ".75rem" }}>
              <Checker
                cState={qrSettings.enableCORS}
                label=""
                tooltip="Enable Cross Origin Resource Sharing (CORS) for the QR Code"
                disabled={false}
                callback={(e) => {
                  dispatch(updateEnableCors(e));
                } } />
            </div>
          </div>
          {/* QR Code Size & Quiet Zone */}
          <div className="fullrow">
            <div className="col25">
              <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                <strong>QR Code Size:</strong>
              </Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="qr-size-tooltip">
                Set the size of the QR Code (the size of your QR Code Logo can
                change based on this value)
              </Tooltip>}
            >
              <div className="knobColumn">
                <AdjusterKnob
                  name="qrSize"
                  value={qrSettings.size as number}
                  min={100}
                  max={500}
                  step={10}
                  disabled={false}
                  callback={(e) => {
                    dispatch(updateSize(e));
                  } } />
              </div>
            </OverlayTrigger>
            <div className="col15" />
            <div className="col25">
              <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                <strong>Quiet Zone:</strong>
              </Form.Label>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="quiet-zone-tooltip">
                Set the size of the quiet zone (white space) around the QR Code
              </Tooltip>}
            >
              <div className="knobColumn">
                <AdjusterKnob
                  name="quietZone"
                  value={qrSettings.quietZone as number}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(e) => {
                    dispatch(updateQuietZone(e));
                  } } />
              </div>
            </OverlayTrigger>
            <div className="col15" />
          </div>
          <hr />
          <div className="fullrow">
            <Form.Label className={darkClass}>
              <strong>QR Eye Styles:</strong>
            </Form.Label>
          </div>
          <div className="fullrow">
            {/* Dynamic QR Code preview */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "59%",
                margin: "auto",
              }}
            >
              {/* QR Code */}
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id="qr-tooltip">
                  This is what your final QR Codes will look like
                </Tooltip>}
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
                    eyeColor={qrSettings.eyeColor as string | "#000000"}
                    eyeRadius={qrSettings.eyeRadius}
                    quietZone={qrSettings.quietZone as number | 0}
                    enableCORS={qrSettings.enableCORS as boolean | false}
                    ecLevel={qrSettings.ecLevel as "L" | "M" | "Q" | "H" | "L"}
                    logoPadding={qrSettings.logoPadding as number | 0}
                    logoPaddingStyle={(qrSettings.logoPaddingStyle !== "none"
                      ? qrSettings.logoPaddingStyle
                      : undefined) as "circle" | "square" | undefined} />
                </div>
              </OverlayTrigger>
              {/* QR Code Logo */}
            </div>
            {/* spacer */}
            <div className="spacer" />
            {/* Eye Stylers */}
            <EyeStylers />
          </div>
          <hr />
          <div className="fullrow">
            <Form.Label className={darkClass}>
              <strong>Qr Code Logo Image Options:</strong>
            </Form.Label>
          </div>
          {session.license_type === 'pro' && (
          <div className="fullrow">
            <div className="col60">
              {/* QR Code Logo File Input */}

              <div className="fullrow">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-tooltip">
                    Select a logo to use in the QR Code
                  </Tooltip>}
                >
                  <Form.Control
                    className={darkClass}
                    type="file"
                    id="input-qr-file"
                    onInput={(e) => {
                      setFileName(e);
                    } }
                    accept=".png,.jpg,.jpeg, .svg" />
                </OverlayTrigger>
              </div>
              {/* QR Code Show */}
              <div className="fullrow">
                <div className="col20">
                  <Form.Label className={darkClass}>Show Logo</Form.Label>
                </div>
                {/* Show QR Logo control */}
                <div className="col10">
                  <Checker
                    cState={showLogo}
                    disabled={qrSettings.logoImage === ""}
                    label=""
                    tooltip="Show the logo"
                    callback={(value) => setShowLogo(value)} />
                </div>
                {/* Hide QR Behind Logo */}
                <div className="col20">
                  <Form.Label className={darkClass}>Hide QR Behind Logo</Form.Label>
                </div>
                {/* Hide QR Behind Logo control */}
                <div className="col10">
                  <Checker
                    cState={qrSettings.removeQrCodeBehindLogo}
                    disabled={qrSettings.logoImage === "" || !showLogo}
                    label=""
                    tooltip="Hide QR Code behind the logo"
                    callback={(value) => {
                      dispatch(updateRemoveQrCodeBehindLogo(value));
                    } } />
                </div>
                {qrSettings.logoImage !== "" &&
                  qrSettings.logoImage !== null &&
                  qrSettings.logoImage !== undefined ? (
                  <>
                    <div className="col20">
                      <Form.Label className={darkClass}>
                        Delete QR Code Logo
                      </Form.Label>
                    </div>
                    <div className="col10">
                      <Checker
                        cState={false}
                        disabled={false}
                        label=""
                        tooltip="Delete QR Code Logo"
                        callback={() => {
                          dispatch(updateLogoImage(""));
                          setShowLogo(false);
                        } } />
                    </div>
                  </>
                ) : (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <></>
                )}
              </div>
              {/* QR Code Logo Size */}
              <div className="fullrow">
                <div className="col25">
                  <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                    Logo Height
                  </Form.Label>
                </div>
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-height-tooltip">
                    Set the height of the QR Code Logo (The allowed size will
                    change based on the overall size of the QR Code)
                  </Tooltip>}
                >
                  <div className="col15">
                    <AdjusterKnob
                      name="qrLogoHeight"
                      value={qrSettings.logoHeight as number}
                      min={10}
                      max={maxQrHeight}
                      step={1}
                      disabled={!showLogo}
                      callback={(e) => {
                        if (qrSettings.logoWidth >= maxQrWidth &&
                          e > qrSettings.logoHeight) {
                          return;
                        }
                        setImageSize(e, qrSettings.logoWidth as number);
                      } } />
                  </div>
                </OverlayTrigger>
                <div className="col5" />
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-aspect-tooltip">
                    {isAspectLocked ? "Unlock" : "Lock"} Aspect Ratio
                  </Tooltip>}
                >
                  <div className="col15">
                    <Button
                      className={darkClass}
                      variant="outline-secondary"
                      style={{ width: "100%", fontSize: "0.6rem" }}
                      onClick={setLockAspectRatio}
                      disabled={!showLogo}
                    >
                      {isAspectLocked ? <Locked /> : <UnLocked />} <br />
                      Aspect Ratio
                    </Button>
                  </div>
                </OverlayTrigger>
                <div className="col5" />
                <div className="col25">
                  <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                    Logo Width
                  </Form.Label>
                </div>
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-width-tooltip">
                    Set the width of the QR Code Logo (The allowed size will
                    change based on the overall size of the QR Code)
                  </Tooltip>}
                >
                  <div className="col15">
                    <AdjusterKnob
                      name="qrLogoWidth"
                      value={qrSettings.logoWidth as number}
                      min={brandImageSettings.minWidth}
                      max={maxQrWidth}
                      step={1}
                      disabled={!showLogo || isAspectLocked}
                      callback={(e) => {
                        if (e > maxQrWidth ||
                          qrSettings.logoHeight >= maxQrHeight) {
                          return;
                        }
                        setImageSize(qrSettings.logoHeight as number, e);
                      } } />
                  </div>
                </OverlayTrigger>
              </div>
              {/* Logo Opacity & Padding */}
              <div className="fullrow">
                {/* Logo Opacity */}
                <div className="col25">
                  <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                    Logo Opacity
                  </Form.Label>
                </div>
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-opacity-tooltip">
                    Set the opacity of the QR Code Logo
                  </Tooltip>}
                >
                  <div className="col15">
                    <OpacityAdjuster
                      val={qrSettings.logoOpacity}
                      disabled={showLogo}
                      callback={(value) => {
                        dispatch(updateLogoOpacity(value));
                      } } />
                  </div>
                </OverlayTrigger>
                <div className="col5" />
                <div className="col15" />
                <div className="col5" />
                {/* Logo Padding */}
                <div className="col25">
                  <Form.Label className={darkClass} style={{ marginTop: "1rem" }}>
                    Logo Padding
                  </Form.Label>
                </div>
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-padding-tooltip">
                    Set the padding around the QR Code Logo
                  </Tooltip>}
                >
                  <div className="col15">
                    <AdjusterKnob
                      name="qrLogoPadding"
                      value={qrSettings.logoPadding as number}
                      min={0}
                      max={50}
                      step={1}
                      disabled={!showLogo}
                      callback={(e) => {
                        dispatch(updateLogoPadding(e));
                      } } />
                  </div>
                </OverlayTrigger>
              </div>
              {/* Padding Style */}
              <div className="fullrow">
                <div className="col30">
                  <Form.Label className={darkClass}>Padding Style</Form.Label>
                </div>
                <div className="col25">
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 300 }}
                    overlay={<Tooltip id="qr-logo-padding-style-tooltip">
                      Set the padding style around the QR Code Logo
                    </Tooltip>}
                  >
                    <Form.Select
                      className={darkClass}
                      aria-label="Padding style (round or square) around the QR Code Logo"
                      onChange={(e) => {
                        let eq = e.target.value as string | undefined;
                        if (eq === "None") {
                          eq = undefined;
                        }
                        dispatch(updateLogoPaddingStyle(eq));
                        if (eq !== undefined && qrSettings.logoPadding === 0) {
                          dispatch(updateLogoPadding(5));
                        } else if (eq === undefined) {
                          dispatch(updateLogoPadding(0));
                        }
                      } }
                      disabled={!showLogo}
                      defaultValue={qrSettings.logoPaddingStyle === undefined
                        ? "None"
                        : qrSettings.logoPaddingStyle}
                    >
                      <option value={undefined}>None</option>
                      <option value="circle">Circle</option>
                      <option value="square">Square</option>
                    </Form.Select>
                  </OverlayTrigger>
                </div>
                <div className="col45" />
              </div>
            </div>
            <div className="spacer" />
            {/* QR Code Logo preview */}
            <div className="col40">
              {showLogo ? (
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="qr-logo-preview-tooltip">
                    This is what your QR Code Logo will look like
                  </Tooltip>}
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
                      }} />
                  </div>
                </OverlayTrigger>
              ) : null}
            </div>
            </div>
          )}

        </>
      ) : (
      <div className="fullrow" /> )
      }
      {/*End Fence */}
    </Accordion.Body>
  );
}
