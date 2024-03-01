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
export type CornerRadii = [number, number, number, number];
// declare type InnerOuterRadii = {
//   inner: number | [number, number, number, number];
//   outer: number | [number, number, number, number];
// };
declare type EyeColor = string; // | InnerOuterEyeColor;
// declare type InnerOuterEyeColor = {
//   inner: string;
//   outer: string;
// };
export interface IProps {
  value: string;
  ecLevel: 'L' | 'M' | 'Q' | 'H';
  enableCORS: boolean;
  size: number;
  quietZone: number;
  bgColor: string;
  fgColor: string;
  logoImage: string;
  logoWidth: number;
  logoHeight: number;
  logoOpacity: number;
  logoOnLoad?: () => void;
  removeQrCodeBehindLogo: boolean;
  logoPadding: number;
  logoPaddingStyle: 'square' | 'circle' | 'none' | undefined;
  eyeRadius: [CornerRadii, CornerRadii, CornerRadii];
  eyeColor: EyeColor;
  qrStyle: 'squares' | 'dots';
  style: object;
  id: string;
}

export type ICountry = {
  id: string;
  name: string;
  flag: string;
  alpha2: string;
  alpha3: string;
  ioc: string;
};

export type UtmKeyValue = {
  key: string;
  value: string;
};

export type UtmObj = {
  useValue: boolean;
  isChooser: boolean;
  showName: boolean;
  label: string;
  ariaLabel: string;
  tooltip: string;
  error: string;
  value: UtmKeyValue[];
};

export type BitlyConfig = {
  useValue: boolean;
  label: string;
  ariaLabel: string;
  tooltip: string;
  error: string;
  bitlyToken: string;
  bitlyDomain: string;
  bitlyAddr: string;
  bitlyEnabled: boolean;
  type: string;
};

export type UtmParams = {
  utm_campaign: UtmObj;
  utm_target: UtmObj;
  utm_term: UtmObj;
  utm_medium: UtmObj;
  utm_source: UtmObj;
  utm_keyword: UtmObj;
  utm_content: UtmObj;
};

export type SessionProps = {
  id: number;
  login: string;
  stripe_id: string;
  first_name: string;
  last_name: string;
  organization?: string;
  active: boolean;
  email: string;
  license_type: string;
  expiry_date?: string | Date;
};

export const defaultSession: SessionProps = {
  id: 0,
  login: '',
  stripe_id: '',
  first_name: '',
  last_name: '',
  organization: '',
  active: false,
  email: '',
  license_type: 'enterprise',
  expiry_date: new Date().toDateString(),
};

export const defaultBitlyConfig: BitlyConfig = {
  useValue: false,
  label: 'Shorten Link',
  ariaLabel: 'Shorten Link with Bitly',
  tooltip: 'Shorten Link with Bitly',
  error: 'No Bitly Token Found',
  bitlyToken: '',
  bitlyDomain: '',
  bitlyAddr: 'https://api-ssl.bitly.com/v4/shorten',
  bitlyEnabled: false,
  type: 'bitly',
};

export const defaultUTMTarget: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'URL to encode',
  tooltip: 'Complete URL to encode',
  error: 'Please enter a valid URL',
  ariaLabel: 'This must be a valid URL',
  value: [{ key: '', value: '' }],
};

export const defaultUTMKeyword: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Keywords',
  tooltip: 'Additional keywords to append to the link',
  error: 'Please enter a valid Keyword',
  ariaLabel: 'Add any additional keywords',
  value: [{ key: '', value: '' }],
};

export const defaultUTMContent: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Content',
  tooltip: 'Additional content to append to the link',
  error: 'Please enter a valid content value',
  ariaLabel: 'Add any additional content',
  value: [{ key: '', value: '' }],
};

export const defaultUTMTerm: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Term',
  tooltip: `What's the Campaign Term?`,
  error: 'Please choose a valid Term',
  ariaLabel: `What's the Campaign Term?`,
  value: [
    { key: 'adwords', value: 'Adwords' },
    { key: 'angel', value: 'Angel' },
    { key: 'baidu', value: 'Baidu' },
    { key: 'bing', value: 'Bing' },
    { key: 'conf-talk', value: 'Conference Talk' },
    { key: 'discord', value: 'Discord' },
    { key: 'duckduckgo', value: 'Duck Duck Go' },
    { key: 'dev-to', value: 'Dev.To' },
    { key: 'dzone', value: 'DZone' },
    { key: 'facebook', value: 'Facebook' },
    { key: 'github', value: 'GitHub' },
    { key: 'gitlab', value: 'GitLab' },
    { key: 'google', value: 'Google' },
    { key: 'linkedin', value: 'LinkedIn' },
    { key: 'medium', value: 'Medium' },
    { key: 'meetup', value: 'Meetup' },
    { key: 'otta', value: 'Otta' },
    { key: 'reddit', value: 'Reddit' },
    { key: 'simplify', value: 'Simplify' },
    { key: 'slack', value: 'Slack' },
    { key: 'stack-overflow', value: 'Stack Overflow' },
    { key: 'techmeme', value: 'Techmeme' },
    { key: 'twitter', value: 'Twitter' },
    { key: 'youtube', value: 'YouTube' },
  ],
};

export const defaultUTMMedium: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Referral Medium',
  tooltip:
    "What kind of referral link is this? This is usually how you're distributing the link.",
  error: 'Please choose a valid referral medium',
  ariaLabel: 'Referral medium',
  value: [
    { key: 'cpc', value: 'Cost Per Click' },
    { key: 'direct', value: 'Direct' },
    { key: 'display', value: 'Display' },
    { key: 'email', value: 'Email' },
    { key: 'event', value: 'Event' },
    { key: 'organic', value: 'Organic' },
    { key: 'paid-search', value: 'Paid Search' },
    { key: 'paid-social', value: 'Paid Social' },
    { key: 'qr', value: 'QR Code' },
    { key: 'referral', value: 'Referral' },
    { key: 'retargeting', value: 'Retargeting' },
    { key: 'social', value: 'Social' },
    { key: 'ppc', value: 'Pay Per Click' },
    { key: 'linq', value: 'Linq' },
  ],
};

export const defaultUTMSource: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Referral Source',
  tooltip: 'Where will you be posting this link?',
  error: 'Please enter a valid referral source',
  ariaLabel: 'Referral Source',
  value: [{ key: '', value: '' }],
};

export const defaultUTMCampaign: UtmObj = {
  useValue: true,
  isChooser: false,
  showName: true,
  label: 'Campaign',
  tooltip: 'Enter a campaign name',
  error: 'Please enter a valid campaign name',
  ariaLabel: 'Campaign Name',
  value: [{ key: '', value: '' }],
};

export const defaultUTMParams: UtmParams = {
  utm_target: defaultUTMTarget,
  utm_campaign: defaultUTMCampaign,
  utm_term: defaultUTMTerm,
  utm_medium: defaultUTMMedium,
  utm_source: defaultUTMSource,
  utm_content: defaultUTMContent,
  utm_keyword: defaultUTMKeyword,
};

export type QRSettings = {
  QRType: string;
  XParent: boolean;
};

export type MainSettings = {
  brandImage?: string;
  brandHeight: number;
  brandWidth: number;
  brandOpacity: number;
  formType: 'simple' | 'encoded' | 'wifi';
};

export type WiFiSettings = {
  ssid: {
    label: string;
    tooltip: string;
    ariaLabel: string;
    error: string;
    value: string;
  };
  password: {
    label: string;
    tooltip: string;
    ariaLabel: string;
    error: string;
    value: string;
  };
  encryption: {
    label: string;
    tooltip: string;
    ariaLabel: string;
    error: string;
    value: 'WPA/WPA2' | 'WEP' | 'None' | '';
  };
  hidden: {
    label: string;
    tooltip: string;
    ariaLabel: string;
    error: string;
    value: boolean;
  };
};

export type ActiveLink = {
  utm_target?: string;
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  utm_keyword?: string;
  short_link?: string;
  ssid?: string;
  password?: string;
  encryption?: 'nopass' | 'WEP' | 'WPA/WPA2';
  hidden?: boolean;
};

export type utmLink = {
  utm_target?: string;
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  utm_keyword?: string;
  long_link: string;
  short_link?: string;
  uuid: string;
};

export type WiFiLink = {
  ssid: string;
  password: string;
  encryption: 'nopass' | 'WEP' | 'WPA/WPA2';
  hidden: boolean;
  uuid: string;
};

export type LinkData = {
  utm_link: utmLink[];
  wifi_link: WiFiLink[];
};

export const defaultActiveLink: ActiveLink = {
  utm_target: 'https://www.example.com/',
  utm_campaign: '',
  utm_source: '',
  utm_medium: '',
  utm_term: '',
  utm_content: '',
  utm_keyword: '',
  short_link: '',
  ssid: '',
  password: '',
  encryption: undefined,
  hidden: false,
};

export const defaultWiFiSettings: WiFiSettings = {
  ssid: {
    label: 'SSID',
    tooltip: 'The name of the WiFi network',
    ariaLabel: 'Enter the name of the WiFi network',
    error: 'Please enter a valid SSID',
    value: '',
  },
  password: {
    label: 'Password',
    tooltip: 'The password for the network',
    ariaLabel: 'The password for the network',
    error: 'Please enter a valid password',
    value: '',
  },
  encryption: {
    label: 'Encryption',
    tooltip: 'The encryption type for the network',
    ariaLabel: 'The encryption type for the network',
    error: 'Please choose a valid encryption type',
    value: '',
  },
  hidden: {
    label: 'Hidden Network',
    tooltip: 'Is this a hidden network?',
    ariaLabel: 'Is this a hidden network?',
    error: 'Please choose a valid option',
    value: false,
  },
};

export const DefaultQRStyle: IProps = {
  value: 'https://www.example.com/',
  ecLevel: 'H',
  size: 220,
  quietZone: 2,
  enableCORS: true,
  bgColor: 'rgba(255, 255, 255, 1)',
  fgColor: 'rgba(10, 28, 46, 1)',
  logoImage: '',
  logoWidth: 60,
  logoHeight: 60,
  logoOpacity: 1,
  removeQrCodeBehindLogo: false,
  qrStyle: 'squares',
  eyeColor: 'rgb(10, 28, 46, 1)',
  eyeRadius: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  logoPadding: 0,
  logoPaddingStyle: 'none',
  style: { height: '100%', width: '100%' },
  id: '',
};

export const defaultQRSettings: QRSettings = {
  QRType: 'png',
  XParent: false,
};

export const defaultMainSettings: MainSettings = {
  brandImage: '',
  brandHeight: 200,
  brandWidth: 200,
  brandOpacity: 1.0,
  formType: 'simple',
};

export const knobConfig = {
  knobSize: 65,
  knobStroke: 14,
};

export const brandImageSettings = {
  maxBrandHeight: 200,
  maxBrandWidth: 200,
  minHeight: 5,
  minWidth: 5,
  maxOpacity: 1.0,
  minOpacity: 0.0,
};

export const qrImageSettings = {
  maxQrHeight: 500,
  maxQrWidth: 500,
  minHeight: 50,
  minWidth: 50,
};
