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
export default function TermsOfService() {
  return (
    <><div className={`main-column`}>
      <h1 style={{ textAlign: "center" }}>
        QR Builder<span className="tr">&trade;</span> Terms of Service
      </h1>
      <p>
        These terms and conditions outline the rules and regulations for the use
        of QR Builder, located at{" "}
        <a href="https://qr-builder.io">https://qr-builder.io</a>.
      </p>
      <p>
        By accessing this website we assume you accept these terms and
        conditions. Do not continue to use QR Builder if you do not agree to
        accept all of the terms and conditions stated on this page.
      </p>
      <p>
        The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this website and compliant to
        the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the
        process of our assistance to the Client in the most appropriate manner
        for the express purpose of meeting the Client’s needs in respect of
        provision of the Company’s stated services, in accordance with and
        subject to, prevailing law of Netherlands. Any use of the above
        terminology or other words in the singular, plural, capitalization
        and/or he/she or they, are taken as interchangeable and therefore as
        referring to same.
      </p>
      <h2>Cookies</h2>
      <p>
        We employ the use of cookies. By accessing QR Builder, you agreed to use
        cookies in agreement with the QR Builder's Privacy Policy.
      </p>
      <p>
        Most interactive websites use cookies to let us retrieve the user’s
        details for each visit. Cookies are used by our website to enable the
        functionality of certain areas to make it easier for people visiting our
        website. We do not use cookies for tracking or advertising purposes, and
        we will never sell any of your data to anyone, ever.
      </p>
      <h2>License</h2>
      <p>
        Unless otherwise stated, QR Builder and/or its licensors own the
        intellectual property rights for all material on qr-builder.io. All
        intellectual property rights are reserved.
      </p>
      <p>You must not:</p>
      <ul>
        <li>Republish material from qr-builder.io</li>
        <li>Sell, rent or sub-license material from qr-builder.io</li>
        <li>
          Reproduce, duplicate or copy material from qr-builder.io other than QR
          Codes that you have created.
        </li>
        <li>
          Redistribute content from qr-builder.io other than QR Codes that you
          have created using qr-builder.io
        </li>
      </ul>
      <p>This Agreement shall begin on the date hereof.</p>
      <h2>Offensive material:</h2>
      <p>
        We do not allow the creation of QR Codes that link to offensive
        material, including but not limited to hate speech, racially or sexually
        offensive material, anti-LGBTQ+, anti-trans, anti-semitic, or any other
        material that could be considered offensive. We reserve the right to
        remove access to QR Builder for any user who creates QR Codes that link
        to offensive material. If you have a paid license to QR Builder and are
        removed for this reason, you will not be refunded.
      </p>
      <Footer />
    </div></>
  );
}
