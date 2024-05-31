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
import PropTypes from "prop-types";
import { Check } from "react-bootstrap-icons";
import "../css/Account.css";

export default function PassChecker({
  len,
  num,
  upper,
  lower,
  special,
  matches,
}: {
  len: boolean;
  num: boolean;
  upper: boolean;
  lower: boolean;
  special: boolean;
  matches: boolean;
}): JSX.Element {
  const goodCheck = (
    <Check className="text-success" size={20} style={{ color: "green" }} />
  );

  const badCheck = (
    <Check
      className="text-danger"
      size={20}
      style={{ alignItems: "center", color: "red" }}
    />
  );

  return (
    <div style={{ textAlign: "left" }}>
      {len ? goodCheck : badCheck}{" "}
      <span className="pass-text  header-stuff-dark">
        8-16 characters long.
      </span>
      <br />
      {num ? goodCheck : badCheck}{" "}
      <span className="pass-text  header-stuff-dark">A number.</span>
      <br />
      {upper ? goodCheck : badCheck}{" "}
      <span className="pass-text header-stuff-dark">An uppercase letter.</span>
      <br />
      {lower ? goodCheck : badCheck}{" "}
      <span className="pass-text header-stuff-dark">A lowercase letter.</span>
      <br />
      {special ? goodCheck : badCheck}{" "}
      <span className="pass-text header-stuff-dark">A special character.</span>
      <br />
      {matches ? goodCheck : badCheck}{" "}
      <span className="pass-text header-stuff-dark">Passwords match.</span>
      <p />
    </div>
  );
}

PassChecker.propTypes = {
  len: PropTypes.bool.isRequired,
  num: PropTypes.bool.isRequired,
  upper: PropTypes.bool.isRequired,
  lower: PropTypes.bool.isRequired,
  special: PropTypes.bool.isRequired,
};
