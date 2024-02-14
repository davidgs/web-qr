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
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BuyPage() {
  const navigate = useNavigate();
  const dark = useSelector((state) => state.dark.dark);
  const mainSet = useSelector((state) => state.main.settings);

  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  // Paste the stripe-pricing-table snippet in your React component
  return (
    <div
      className={`main-column`}
      style={{
        backgroundColor: "#131518",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px",
        boxShadow: "0 0 10px 0 #000",
      }}
    >
      <stripe-pricing-table
        pricing-table-id="prctbl_1OgV8HGuKQxVPasTQ9Cm8EPf"
        publishable-key="pk_test_51OYEejGuKQxVPasTmIP0YpYi6bMc5YxPdbTODK6FO0quQ9clYbr9TC9Kihv3o2zV8ErBY2xRD4OwnLNoxgE265B600yqy7eDkN"
      ></stripe-pricing-table>
    </div>
  );
}
