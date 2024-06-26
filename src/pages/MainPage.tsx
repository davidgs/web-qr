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
import LinkToolbar from "../components/LinkToolbar";
import QCode from "../forms/QRCodeForm";
import URLForm from "../forms/URLForm";
import WifiForm from "../forms/WiFiForm";
import { RootState } from "../stores/store";
import { useAppSelector } from "../stores/hooks";

import Logo from "../images/NewLinkerLogo.png";
import Footer from "../components/Footer";
import PHunt from "../components/PHunt";

export default function MainPage() {
  const mainSet = useAppSelector((state: RootState) => state.main.settings);
  const name = useAppSelector((state: RootState) => state.userFront.settings.name);

  return (
    <>
      <div className={`main-column`}>
        <div className="fullrow">
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h2>
              <img
                src={Logo}
                alt="QR Builder Logo"
                width={40}
                height={40}
              ></img>{" "}
              &nbsp; &nbsp;
              <strong>
                QR Builder
                <span className="tr">&trade;</span>
              </strong>
            </h2>
          </div>
        </div>
        {name && (
          <div style={{ margin: "auto", textAlign: "center" }}>
            Welcome back {name}
          </div>
        )}
        <div className="fullrow">
          <PHunt />
        </div>
        <div className="link-form">
          <QCode />
          {/* {mainSet.sidebar !== "top" ? <QCode /> : <MobileQCode />} */}
          <hr />
          <LinkToolbar />
          <hr />
          {mainSet.formType === "wifi" ? <WifiForm /> : <URLForm />}
        </div>
        <Footer />
      </div>

      {/* W: {width} x H: {size.height} */}
      {/* <Analytics /> */}
    </>
  );
}
