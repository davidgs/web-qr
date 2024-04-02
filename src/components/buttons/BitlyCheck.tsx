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
import { RootState } from "../../stores/store";
import { check } from "../../reducers/bitly/bitlySlice";
import axios from "axios";
import { makeLongLink } from "../../utils/LongLink";
import { setActiveLink } from "../../reducers/history/historySlice";
import { updateQRValue } from "../../reducers/qr/qrCodeSettingsSlice";
import Checker from "./Checker";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";

export default function BitlyCheck(): JSX.Element {
  const dispatch = useAppDispatch();
  const bitlyConfig = useAppSelector((state: RootState) => state.bitly.settings);
  const activeLink = useAppSelector(
    (state: RootState) => state.history.activeLink
  );

  const bitlyChecked = (isChecked: boolean) => {
    dispatch(check(isChecked as any));
    if (isChecked) {
      // only call bitly if the link is complete.
      const headers = {
        Authorization: `Bearer ${bitlyConfig.bitly_token}`,
        Accept: "application/json",
        ContentType: "application/json; charset=utf-8",
      };
      const bDom =
        bitlyConfig &&
        bitlyConfig.bitly_domain &&
        bitlyConfig.bitly_domain !== ""
          ? `"domain": "${bitlyConfig.bitly_domain}"`
          : null;
      const link = makeLongLink(activeLink);
      const data =
        bDom !== null
          ? JSON.parse(`{"long_url": "${link}", ${bDom}}`)
          : JSON.parse(`{"long_url": "${link}"}`);
      axios
        .post(`${bitlyConfig.bitly_addr}`, data, {
          headers,
        })
        .then((response: any) => {
          if (response.data.link === undefined) {
            // eslint-disable-next-line no-console
            console.log(`Error: ${response.data}`);
            return;
          }
          const tempLink = response.data.link;
          dispatch(setActiveLink({ ...activeLink, short_link: tempLink }));
          dispatch(updateQRValue(tempLink));
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.log(`Error: ${error}`);
        });
    }
    dispatch(check(false as any));
  };

  return (
    <div>
      <Checker
        cState={false}
        label={bitlyConfig.label}
        tooltip={
          activeLink.short_link && activeLink.short_link !== ""
            ? "Your link appears to already be shortened. Don't shorten it again!"
            : bitlyConfig.tooltip
        }
        disabled={bitlyConfig.bitly_enabled}
        callback={bitlyChecked}
      />
    </div>
  );
}
