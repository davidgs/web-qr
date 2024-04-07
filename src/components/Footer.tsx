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
import {
  Github,
  Envelope,
  Twitter,
  Linkedin,
  Mastodon,
} from "react-bootstrap-icons";
import { useAppSelector } from "../stores/hooks";
import { RootState } from "../stores/store";
import "../css/footer.css";

const Footer = () => {
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  return (
    <>
      <div className="footer">
        <div className="fullrow">
          <p></p>
          <hr style={{ width: "100%" }} />
        </div>
        <div className="fullrow">
          <strong>QR Builder</strong>&nbsp; is open source and licensed under
          the MIT license. The source code is available on &nbsp;
          <a href="https://github.com/davidgs/link-maker">
            <Github
              className={darkClass}
              style={{ height: "20px", width: "20px" }}
            />
          </a>
        </div>
        <div className="fullrow" style={{ marginTop: "-30px" }}>
          <div className="col40" style={{ paddingTop: "25px", marginLeft: "-8px" }}>
            <span>
              <strong>QR Builder</strong>&nbsp; is built by &nbsp;
              <a className={darkClass} href="https://qr-builder.io/">
                David G. Simmons
              </a>
            </span>
          </div>
          <div className="col2">
            <a href="mailto:davidgs@qr-builder.io">
              <Envelope
                className={darkClass}
                style={{ height: "20px", width: "20px" }}
              />
            </a>
            &nbsp; &nbsp;
          </div>
          <div className="col2">
            <a href="https://github.com/davidgs/">
              <Github
                className={darkClass}
                style={{ height: "20px", width: "20px" }}
              />
            </a>
            &nbsp; &nbsp;
          </div>
          <div className="col2">
            <a href="https://twitter.com/davidgsIoT">
              <Twitter
                className={darkClass}
                style={{ height: "20px", width: "20px" }}
              />
            </a>
            &nbsp; &nbsp;
          </div>
          <div className="col2">
            <a href="https://linkedin.com/in/davidgsimmons">
              <Linkedin
                className={darkClass}
                style={{ height: "20px", width: "20px" }}
              />
            </a>
            &nbsp; &nbsp;
          </div>
          <div className="col2">
            <a href="https://tty0.social/@davidgs">
              <Mastodon
                className={darkClass}
                style={{ height: "20px", width: "20px" }}
              />
            </a>
          </div>
          <div className="col60">
            {/* <a href="https://www.producthunt.com/posts/qr-builder?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-qr&#0045;builder" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=449193&theme=light" alt="Qr&#0032;Builder - The&#0032;modern&#0044;&#0032;easy&#0032;to&#0032;use&#0032;QR&#0032;Code&#0032;builder&#0032;tool | Product Hunt" style={{width: "250px", height: "54px"}} /></a> */}
            </div>
        </div>
        <div className="fullrow" style={{ paddingBottom: "25px" }} />
        <p />
        <p />
      </div>
    </>
  );
};

export default Footer;
