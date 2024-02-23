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
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { brandImageSettings, defaultMainSettings } from "../../types";
import AdjusterKnob from "../../components/knobs/AdjusterKnob";
import {
  updateBrandImage,
  updateHeight,
  updateMainSettings,
  updateWidth,
} from "../../reducers/main/mainSlice";
import Checker from "../../components/buttons/Checker";
import ImgElement from "../../components/ImgElement";
import { RootState } from "../../stores/store";
import "../../css/MainConfig.css";
export default function BrandingConfigurator({
  targetValidated,
}: {
  targetValidated: boolean;
}) {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.main.settings);
  const [showMainLogo, setShowMainLogo] = useState<boolean>(
    settings.brandImage !== undefined &&
      settings.brandImage !== null &&
      settings.brandImage !== ""
  );
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const [isMainAspectLocked, setIsMainAspectLocked] = useState<boolean>(true);
  const [aspect, setAspect] = useState<number>(1);

  /* lock/unlock the aspect ratio of the qr logo */
  const setLockMainAspectRatio = () => {
    setIsMainAspectLocked(!isMainAspectLocked);
  };
  /**
   * Set the image size based on the aspect ratio, and withing min/max
   * @param height
   * @param width
   * @returns
   */
  const setImageSize = (height: number, width: number) => {
    const imH = settings.brandHeight;
    const sc = height / imH;
    let newH = height;
    let newW = width;
    if (isMainAspectLocked) {
      if (height > brandImageSettings.maxBrandHeight) {
        newH = brandImageSettings.maxBrandHeight;
        newW = Math.round(
          (brandImageSettings.maxBrandWidth * aspect * 1e2) / 1e2
        );
      }
      if (width > brandImageSettings.maxBrandWidth) {
        newW = brandImageSettings.maxBrandWidth;
        newH = Math.round(
          (brandImageSettings.maxBrandHeight * aspect * 1e2) / 1e2
        );
      } else {
        newH = height;
        newH = Math.round((height * sc * 1e2) / 1e2);
      }
      dispatch(updateHeight(newH));
      dispatch(updateWidth(newW));
      return;
    }
    const newWidth =
      width > brandImageSettings.maxBrandWidth
        ? brandImageSettings.maxBrandWidth
        : width;
    const scaleW = newWidth === width ? 1 : newWidth / width;
    if (width !== height) {
      const newHeight = Math.round((height * scaleW * 1e2) / 1e2);
      dispatch(updateHeight(newHeight));
      dispatch(updateWidth(newWidth));
    }
  };

  /* handle saving the main logo file for branding
      @param: result: the result of the file read
  */
  const setMainImg = (result: SyntheticEvent) => {
    const ev = result as React.ChangeEvent<HTMLInputElement>;
    const read = new FileReader();
    const fileName = ev.target.files;
    if (fileName) {
      const f = fileName[0];
      if (f) {
        read.readAsDataURL(f);
        read.onloadend = () => {
          const fi = new Image();
          fi.src = read.result as string;
          fi.onload = () => {
            let h: number = fi.height;
            let w: number = fi.width;
            setAspect(w / h);
            if (
              h < brandImageSettings.minHeight ||
              w < brandImageSettings.minWidth
            ) {
              setImageSize(
                brandImageSettings.minHeight,
                brandImageSettings.minWidth * aspect
              );
              h = brandImageSettings.minHeight;
              w = Math.round(brandImageSettings.minWidth * aspect * 1e2) / 1e2;
            } else if (
              h > brandImageSettings.maxBrandHeight ||
              w > brandImageSettings.maxBrandWidth
            ) {
              setImageSize(
                brandImageSettings.maxBrandHeight,
                brandImageSettings.maxBrandWidth * aspect
              );
              h = brandImageSettings.maxBrandHeight;
              w =
                Math.round(brandImageSettings.maxBrandWidth * aspect * 1e2) /
                1e2;
            } else {
              setImageSize(h, w);
            }
            dispatch(updateBrandImage(fi.src as string));
            setAspect(w / h);
            setIsMainAspectLocked(true);
            setShowMainLogo(true);
          };
        };
      }
    }
  };

  /**
   * Delete the main logo
   */
  const deleteMainLogo = () => {
    dispatch(
      updateMainSettings({
        ...settings,
        brandImage: "",
        brandHeight: defaultMainSettings.brandHeight,
        brandWidth: defaultMainSettings.brandWidth,
        brandOpacity: defaultMainSettings.brandOpacity,
      })
    );

    setShowMainLogo(false);
  };
  return (
    <Accordion.Item eventKey="1">
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 300 }}
        overlay={
          <Tooltip id="brand-tooltip">
            Settings for overall branding, like the image in the left column,
            etc.
          </Tooltip>
        }
      >
        <Accordion.Header className={darkClass}>
          <strong>Branding Configuration</strong>
        </Accordion.Header>
      </OverlayTrigger>
      <Accordion.Body id="images">
        <Form noValidate validated={targetValidated}>
          {/* Main Logo */}
          <div className="section-header">Overall Branding Image</div>
          <div className="main-settings-row">
            <div className="main-settings-settings">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="main-logo-tooltip">
                    Click to select a logo for the App
                  </Tooltip>
                }
              >
                <Form.Control
                  className={darkClass}
                  type="file"
                  id="input-main-file"
                  onInput={(e) => {
                    setMainImg(e);
                  }}
                  accept=".png,.jpg,.jpeg, .svg"
                />
              </OverlayTrigger>

              <div className="main-settings-row">
                {/* Show Main Logo */}
                <div className="controls-row">
                  <div className="label-column">
                    <Form.Label className={darkClass}>Show Logo?</Form.Label>
                  </div>
                  <div className="check-column">
                    <Checker
                      cState={showMainLogo}
                      disabled={false}
                      label=""
                      tooltip="Show the logo"
                      callback={(value) => setShowMainLogo(value)}
                    />
                  </div>
                </div>
                {settings.brandImage !== undefined &&
                settings.brandImage !== null &&
                settings.brandImage !== "" ? (
                  <div className="controls-row">
                    <div className="label-column">
                      <Form.Label className={darkClass}>
                        Remove Custom Logo?
                      </Form.Label>
                    </div>
                    <div className="check-column">
                      <Checker
                        cState={false}
                        disabled={false}
                        label=""
                        tooltip="Show the logo"
                        callback={() => deleteMainLogo()}
                      />
                    </div>
                  </div>
                ) : (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <></>
                )}
              </div>

              {/* Main Logo Height/ width */}
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
                    placement="top"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      <Tooltip id="qr-size-tooltip">
                        Adjust the height of the logo
                      </Tooltip>
                    }
                  >
                    <div className="adjuster-control">
                      <AdjusterKnob
                        name="brandHeight"
                        value={settings.brandHeight}
                        min={brandImageSettings.minHeight}
                        max={brandImageSettings.maxBrandHeight}
                        step={1}
                        disabled={!showMainLogo}
                        callback={(value) => {
                          dispatch(updateHeight(value));
                          setImageSize(value, settings.brandWidth);
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="controls-row">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      <Tooltip id="qr-aspect-tooltip">
                        {isMainAspectLocked ? "Unlock" : "Lock"} Image Aspect
                        Ratio
                      </Tooltip>
                    }
                  >
                    <Button
                      className="aspect-button"
                      variant="outline-secondary"
                      // style={{ width: "100%", fontSize: "0.6rem" }}
                      onClick={setLockMainAspectRatio}
                      disabled={!showMainLogo}
                    >
                      {isMainAspectLocked ? <i className="bi bi-lock-fill" /> : <i className="bi bi-unlock-fill" />}
                        {/* <Locked /> : <UnLocked />} */}
                      {/* <br />
                      Aspect Ratio */}
                    </Button>
                  </OverlayTrigger>
                </div>
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
                    placement="top"
                    delay={{ show: 250, hide: 300 }}
                    overlay={
                      <Tooltip id="qr-size-tooltip">
                        Adjust the width of the logo
                      </Tooltip>
                    }
                  >
                    <div className="adjuster-control">
                      <AdjusterKnob
                        name="brandWidth"
                        value={settings.brandWidth}
                        min={brandImageSettings.minWidth}
                        max={brandImageSettings.maxBrandWidth}
                        step={1}
                        disabled={!showMainLogo || isMainAspectLocked}
                        callback={(value) => {
                          dispatch(updateWidth(value));
                          setImageSize(settings.brandHeight, value);
                        }}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="image-preview">
              {settings.brandImage !== undefined &&
              settings.brandImage !== null &&
              settings.brandImage !== "" &&
              showMainLogo ? (
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="brand-tooltip">
                      Preview of your branding image.
                    </Tooltip>
                  }
                >
                  <div>
                    <ImgElement
                      byteString={settings.brandImage as string}
                      width={settings.brandWidth as number}
                      height={settings.brandHeight as number}
                      alt="UTM Linker Logo"
                    />
                  </div>
                </OverlayTrigger>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              )}
            </div>
          </div>
          {/* </div> */}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
} // end of function
