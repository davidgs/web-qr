import { IProps } from "react-qrcode-logo";

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
export interface QProps extends IProps {
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
  logoPaddingStyle: 'square' | 'circle' | undefined;
  eyeRadius: [CornerRadii, CornerRadii, CornerRadii];
  eyeColor: EyeColor;
  qrStyle: 'squares' | 'dots';
  style: object;
  id: string;
  QRType: "png" | "svg" | "jpg";
  XParent: boolean;
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
  use_value: boolean;
  is_chooser: boolean;
  show_name: boolean;
  label: string;
  aria_label: string;
  tooltip: string;
  error: string;
  value: UtmKeyValue[];
};

export type BitlyConfig = {
  use_value: boolean;
  label: string;
  aria_label: string;
  tooltip: string;
  error: string;
  bitly_token: string;
  bitly_domain: string;
  bitly_addr: string;
  bitly_enabled: boolean;
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

export type License = {
  username: string;
  license: string;
  fingerprint: string;
  platform: string;
  name: string;
  id: string;
}

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
  expiry_date?: Date | undefined;
  license_token?: string;
  updated_at?: Date | undefined;
};


export type UserfrontProps = {
  mode: string,
  userId: number,
  userUuid: string,
  username: string,
  email: string,
  name: string,
  image: string,
  phoneNumber: string,
  data: {},
  locked: boolean,
  isMfaRequired: boolean,
  preferredFirstFactor: {
    channel: string,
    strategy: string,
  },
  preferredSecondFactor: {
    channel: string,
    strategy: string
  },
  isEmailConfirmed: boolean,
  isPhoneNumberConfirmed: boolean,
  lastActiveAt: string,
  createdAt: string,
  updatedAt: string,
  tenant: {
    tenantId: string,
    name: string,
    image: string,
    loginRedirectPath: string,
    logoutRedirectPath: string
  },
  authorization: {},
  tenantId: string,
  isConfirmed: boolean,
  uuid: string,
  authentication: {
    firstFactors: [
      {
        channel: string,
        strategy: string
      },
      {
        channel: string,
        strategy: string
      }
    ],
    secondFactors: [{}]
  },
  chatHmac: string,
  requestParams: {}
}

export type LicenseProps = {
  cust_id: string;
  license_type: string;
  license_key: string;
  active: boolean;
  confirmed: boolean;
  expire_date: Date;
  license_status: string;
  machines: string[];
}

export const defaultLicense: LicenseProps = {
  cust_id: '',
  license_type: 'free',
  license_key: '',
  active: false,
  confirmed: false,
  expire_date: new Date(),
  license_status: 'no license',
  machines: [],
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
  license_type: 'pro',
  expiry_date: undefined,
  license_token: '',
  updated_at: undefined,
};

export const defaultBitlyConfig: BitlyConfig = {
  use_value: false,
  label: 'Shorten',
  aria_label: 'Shorten Link with Bitly',
  tooltip: 'Shorten Link with Bitly',
  error: 'No Bitly Token Found',
  bitly_token: '',
  bitly_domain: '',
  bitly_addr: 'https://api-ssl.bitly.com/v4/shorten',
  bitly_enabled: false,
  type: 'bitly',
};

export const defaultUTMTarget: UtmObj = {
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'URL to encode',
  tooltip: 'Complete URL to encode',
  error: 'Please enter a valid URL',
  aria_label: 'This must be a valid URL',
  value: [{ key: '', value: '' }],
};

export const defaultUTMKeyword: UtmObj = {
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Keywords',
  tooltip: 'Additional keywords to append to the link',
  error: 'Please enter a valid Keyword',
  aria_label: 'Add any additional keywords',
  value: [{ key: '', value: '' }],
};

export const defaultUTMContent: UtmObj = {
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Content',
  tooltip: 'Additional content to append to the link',
  error: 'Please enter a valid content value',
  aria_label: 'Add any additional content',
  value: [{ key: '', value: '' }],
};

export const defaultUTMTerm: UtmObj = {
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Term',
  tooltip: `What's the Campaign Term?`,
  error: 'Please choose a valid Term',
  aria_label: `What's the Campaign Term?`,
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
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Referral Medium',
  tooltip:
    "What kind of referral link is this? This is usually how you're distributing the link.",
  error: 'Please choose a valid referral medium',
  aria_label: 'Referral medium',
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
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Referral Source',
  tooltip: 'Where will you be posting this link?',
  error: 'Please enter a valid referral source',
  aria_label: 'Referral Source',
  value: [{ key: '', value: '' }],
};

export const defaultUTMCampaign: UtmObj = {
  use_value: true,
  is_chooser: false,
  show_name: true,
  label: 'Campaign',
  tooltip: 'Enter a campaign name',
  error: 'Please enter a valid campaign name',
  aria_label: 'Campaign Name',
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

// export type QRSettings = {
//   QRType: string;
//   XParent: boolean;
// };

export type UserSettings = {
  login: string;
  stripe_id: string;
  userfront_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  active: boolean;
  confirmed: boolean;
  email: string;
  updated_at?: Date | undefined;
}

export type MainSettings = {
  brandImage?: string;
  brandHeight: number;
  brandWidth: number;
  brandOpacity: number;
  formType: 'simple' | 'encoded' | 'wifi';
  dark: boolean;
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

export const defaultUserSettings: UserSettings = {
  login: '',
  stripe_id: '',
  userfront_id: '',
  first_name: '',
  last_name: '',
  created_at: '',
  organization: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  active: false,
  confirmed: false,
  email: '',
  updated_at: undefined,
};
export const DefaultQRStyle: QProps = {
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
  logoPaddingStyle: undefined,
  style: { height: '100%', width: '100%' },
  id: '',
  QRType: 'png',
  XParent: false,
};

// export const defaultQRSettings: QRSettings = {
//   QRType: 'png',
//   XParent: false,
// };

export const defaultMainSettings: MainSettings = {
  brandImage: '',
  brandHeight: 200,
  brandWidth: 200,
  brandOpacity: 1.0,
  formType: 'simple',
  dark: false,
};

export const defaultUserFront: UserfrontProps = {
  mode: 'test',
  userId: 0,
  userUuid: '',
  username: '',
  email: '',
  name: '',
  image: '',
  phoneNumber: '',
  data: {},
  locked: false,
  isMfaRequired: false,
  preferredFirstFactor: {
    channel: '',
    strategy: ''
  },
  preferredSecondFactor: {
    channel: '',
    strategy: ''
  },
  isEmailConfirmed: false,
  isPhoneNumberConfirmed: false,
  lastActiveAt: '',
  createdAt: '',
  updatedAt: '',
  tenant: {
    tenantId: '',
    name: '',
    image: '',
    loginRedirectPath: '',
    logoutRedirectPath: ''
  },
  authorization: {},
  tenantId: '',
  isConfirmed: false,
  uuid: '',
  authentication: {
    firstFactors: [
      {
        channel: '',
        strategy: ''
      },
      {
        channel: '',
        strategy: ''
      }
    ],
    secondFactors: [{}]
  },
  chatHmac: '',
  requestParams: {}
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

export const settingsServer = "http://localhost:4242/api/";
