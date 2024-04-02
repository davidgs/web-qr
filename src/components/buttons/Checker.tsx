/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { JSX } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactId from "../../utils/ReactId";
import { RootState } from "../../stores/store";
import { useAppSelector } from "../../stores/hooks";

interface ICallback {
  // eslint-disable-next-line no-unused-vars
  (value: boolean): void;
}

interface CheckerProps {
  cState: boolean;
  label: string;
  tooltip: string;
  disabled: boolean;
  callback: ICallback;
}
export default function Checker(props: CheckerProps): JSX.Element {
  const { cState, label, tooltip, disabled, callback } = props;
  const myuid = ReactId();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "auto",
          fontSize: "14px",
          paddingTop: "2px",
        }}
        className={darkClass}
      >
        <strong>{label}</strong>
      </div>
      <div
        className="darkClass"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "20px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "auto",
        }}
        className={darkClass}
      >
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id={`tooltip-${myuid}`}>{tooltip}</Tooltip>}
        >
          <div className={`${darkClass} round`}>
            <input
              type="checkbox"
              checked={cState}
              id={`checkbox-${myuid}`}
              disabled={disabled}
              onChange={(e) => {
                callback(e.target.checked);
              }}
            />
            <label htmlFor={`checkbox-${myuid}`} />
          </div>
        </OverlayTrigger>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "20px",
        }}
      />
    </div>
  );
}
