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

import Footer from "../components/Footer";
import Logo from "../images/NewLinkerLogo.png";
import PHunt from "../components/PHunt";

export default function Privacy() {
  return (
    <>
      <div className={`main-column`}>
        <div className="fullrow">
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h1>
              <img
                src={Logo}
                alt="QR Builder Logo"
                width={40}
                height={40}
              ></img>{" "}
              QR Builder<span className="tr">&trade;</span> Privacy Policy
            </h1>
          </div>
        </div>
        <div className="fullrow">
          <PHunt />
        </div>
        <p>
          Your privacy is important to us. It is QR Builder's policy to respect
          your privacy regarding any information we may collect from you across
          our website, <a href="https://qr-builder.io">https://qr-builder.io</a>
          , and other sites we own and operate.
        </p>
        <p>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
        <p>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </p>
        <p>
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </p>
        <p>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
        <p>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p>This policy is effective as of 1 January 2024.</p>
        <div className="fullrow" style={{ paddingBottom: "25px" }} />
        <p />
        <p />
        <Footer />
      </div>
    </>
  );
}
