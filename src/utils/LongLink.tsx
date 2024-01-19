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
import { ActiveLink } from '../types';

export function makeLongLink(linkParts: ActiveLink): string {
  let tempLink: string = 'https://www.example.com/';
  tempLink = linkParts?.utm_target?.endsWith('/')
    ? linkParts?.utm_target
    : `${linkParts?.utm_target}/`;
  if (linkParts?.utm_campaign !== '' && linkParts?.utm_campaign !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?utm_campaign=${linkParts?.utm_campaign}`)
      : (tempLink += `&utm_source${linkParts?.utm_campaign}`);
  }
  if (linkParts?.utm_source !== '' && linkParts?.utm_source !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?utm_source=${linkParts?.utm_source}`)
      : (tempLink += `&utm_source=${linkParts?.utm_source}`);
  }
  if (linkParts?.utm_medium !== '' && linkParts?.utm_medium !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?utm_medium=${linkParts?.utm_medium}`)
      : (tempLink += `&utm_medium=${linkParts?.utm_medium}`);
  }
  if (linkParts?.utm_term !== '' && linkParts?.utm_term !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?utm_term=${linkParts?.utm_term}`)
      : (tempLink += `&utm_term=${linkParts?.utm_term}`);
  }
  if (linkParts?.utm_content !== '' && linkParts?.utm_content !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?utm_content=${linkParts?.utm_content}`)
      : (tempLink += `&utm_content=${linkParts?.utm_content}`);
  }
  if (linkParts?.utm_keyword !== '' && linkParts?.utm_keyword !== undefined) {
    tempLink = tempLink.endsWith('/')
      ? (tempLink += `?keyword=${linkParts?.utm_keyword}`)
      : (tempLink += `&keyword=${linkParts?.utm_keyword}`);
  }
  return tempLink;
}

export function makeWiFiLink(linkParts: ActiveLink): string {
  return `WIFI:S:${linkParts?.ssid};T:${linkParts?.encryption};P:${linkParts?.password};H:${linkParts?.hidden};;`;
}
