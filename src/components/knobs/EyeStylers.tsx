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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RootState } from "../../stores/store";
import { useSelector, useDispatch } from "react-redux";
import { updateEyeRadius } from "../../reducers/qr/qrCodeSettingsSlice";
import { CornerRadii } from "../../types";
import AdjusterKnob from "./AdjusterKnob";
import "../../css/EyeStylers.css";
import "../../css/MainConfig.css";

export default function EyeStylers() {
  const dispatch = useDispatch();
  const qConfig = useSelector((state: RootState) => state.qrCode.settings);
  /* Update properties when eye-radius values change */
  const handleEyeRadiusChange = (e: number, index: number, corner: number) => {
    const value = e;
    const newEyeRadius: [CornerRadii, CornerRadii, CornerRadii] =
      qConfig.eyeRadius;
    const newCorner: [number, number, number, number] = [
      ...(newEyeRadius[index] as [number, number, number, number]),
    ];
    newCorner[corner] = value;
    switch (index) {
      case 0:
        dispatch(
          updateEyeRadius([newCorner, newEyeRadius[1], newEyeRadius[2]])
        );
        break;
      case 1:
        dispatch(
          updateEyeRadius([newEyeRadius[0], newCorner, newEyeRadius[2]])
        );
        break;
      case 2:
        dispatch(
          updateEyeRadius([newEyeRadius[0], newEyeRadius[1], newCorner])
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="eye-styler">
      {/* Top Left & right knobs */}
      <div className="controls-row">
        <OverlayTrigger
          placement="auto"
          delay={{ show: 250, hide: 300 }}
          overlay={
            <Tooltip id="qr-tooltip">
              Adjust the shape of each corner of the upper-left eye component
            </Tooltip>
          }
        >
          <div className="styler-column">
            <div className="styler-title">Top Left:</div>
            <div className="fullrow">
              {/* Top Left /top left */}
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-0-0"
                  value={qConfig.eyeRadius[0][0]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 0, 0);
                  }}
                />
              </div>
              <div className="col10" />
              {/* Top Left /top right */}
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-0-1"
                  value={qConfig.eyeRadius[0][1]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 0, 1);
                  }}
                />
              </div>
            </div>
            <div className="fullrow">
              {/* Top Left /bottom left */}
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-0-3"
                  value={qConfig.eyeRadius[0][3]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 0, 3);
                  }}
                />
              </div>
              <div className="col10" />
              {/* Top Left /bottom right */}
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-0-2"
                  value={qConfig.eyeRadius[0][2]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 0, 2);
                  }}
                />
              </div>
            </div>
          </div>
        </OverlayTrigger>
        {/* Top Right knobs */}

        <OverlayTrigger
          placement="auto"
          delay={{ show: 250, hide: 300 }}
          overlay={
            <Tooltip id="qr-tooltip">
              Adjust the shape of each corner of the upper-right eye component
            </Tooltip>
          }
        >
          <div className="styler-column">
            <div className="styler-title">Top Right:</div>
            <div className="fullrow">
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-1-0"
                  value={qConfig.eyeRadius[1][0]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 1, 0);
                  }}
                />
              </div>
              <div className="col10" />
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-1-1"
                  value={qConfig?.eyeRadius[1][1]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 1, 1);
                  }}
                />
              </div>
            </div>
            <div className="fullrow">
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-1-3"
                  value={qConfig.eyeRadius[1][3]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 1, 3);
                  }}
                />
              </div>
              <div className="col10" />
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-1-2"
                  value={qConfig.eyeRadius[1][2]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 1, 2);
                  }}
                />
              </div>
            </div>
          </div>
        </OverlayTrigger>
      </div>
      {/* Bottom Left knob */}
      <div className="controls-row">
        <OverlayTrigger
          placement="auto"
          delay={{ show: 250, hide: 300 }}
          overlay={
            <Tooltip id="qr-tooltip">
              Adjust the shape of each corner of the lower-left eye component
            </Tooltip>
          }
        >
          <div className="styler-column">
            <div className="styler-title">Lower Left:</div>
            <div className="fullrow">
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-2-0"
                  value={qConfig.eyeRadius[2][0]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 2, 0);
                  }}
                />
              </div>
              <div className="col10" />
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-2-1"
                  value={qConfig.eyeRadius[2][1]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 2, 1);
                  }}
                />
              </div>
            </div>
            <div className="fullrow">
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-2-3"
                  value={qConfig.eyeRadius[2][3]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 2, 3);
                  }}
                />
              </div>
              <div className="col10" />
              <div className="eye-color-adjuster">
                <AdjusterKnob
                  name="eyeRadius-2-2"
                  value={qConfig.eyeRadius[2][2]}
                  min={0}
                  max={50}
                  step={1}
                  disabled={false}
                  callback={(value) => {
                    handleEyeRadiusChange(value, 2, 2);
                  }}
                />
              </div>
            </div>
          </div>
        </OverlayTrigger>
        <div className="styler-column"></div>
      </div>
    </div>
  );
}
