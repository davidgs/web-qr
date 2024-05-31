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

import Logo from "../images/NewLinkerLogo.png";
import { RootState } from "../stores/store";
import { useAppSelector } from "../stores/hooks";
import Footer from "../components/Footer";
import PHunt from "../components/PHunt";

export default function FAQPage() {
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";


  return (
    <div className={`main-column`}>
      <>
        <div className="fullrow">
          <div>
            <h1 style={{ margin: "auto", textAlign: "center" }}>
              <img src={Logo} alt="QR Builder Logo" width={40} height={40} />{" "}
              &nbsp; &nbsp;
              <strong>
                <span className={darkClass}>QR Builder FAQ</span>
              </strong>
            </h1>
            <div className="fullrow">
              <PHunt />
            </div>
            <p></p>
            <h4 style={{ margin: "auto", textAlign: "center" }}>
              Frequently Asked Questions
            </h4>
            <p></p>
            <h3>How do I use this?</h3>
            <p>
              Simply click on the "Create" link in the menu (left sidebar on
              desktop, in the menu at the top right on mobile). You can then
              enter the URL you want to encode, and the type of QR code you want
              to generate. You QR Code is generated in real-time as yuou enter
              data. You can then download the QR code as a <code>.png</code>{" "}
              image.
            </p>
            <h3>How do I buy this?</h3>
            <p>
              Click on the "Buy" link in the top right corner of the screen. You
              will be taken to a page where you can select a plan and pay for
              your subscription.
            </p>
            <h3>How do I contact support?</h3>
            <p>
              You can contact support by sending an email to{" "}
              <a href="mailto:info@qr-builder.io">Help</a>.
            </p>
            <h3>How do I report a bug?</h3>
            <p>You can report a bug by sending an email to </p>
            <h3>How do I request a feature?</h3>
            <p>You can request a feature by sending an email to </p>
            <h3>How do I contribute?</h3>
            <p>You can contribute by sending an email to </p>
            <h3>Why don't you collect statistics for me</h3>
            <p>
              We don't collect statistics because we don't want to track you.
            </p>
            <p>
              We want you to have the freedom to track your code scans in
              whatever way suits you best, which you can do by taking full
              advantage of the ability to embed UTM tracking codes in your QR
              Codes.
            </p>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
}
