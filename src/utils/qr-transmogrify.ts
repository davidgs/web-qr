import { CornerRadii, DefaultQRStyle, QProps } from "../types";

interface Incoming {
  value: string;
  ec_level: 'L' | 'M' | 'Q' | 'H';
  enable_CORS: boolean;
  size: number;
  quiet_zone: number;
  bg_color: string;
  fg_color: string;
  logo_image: string;
  logo_width: number;
  logo_height: number;
  logo_opacity: number;
  remove_qr_code_behind_logo: boolean;
  logo_padding: number;
  logo_padding_style: 'square' | 'circle' | undefined;
  top_l_eye_radius: number[];
  top_r_eye_radius: number[];
  bottom_l_eye_radius: number[];
  eye_color: string;
  qr_style: 'squares' | 'dots';
  qr_type: "png" | "svg" | "jpg";
  x_parent: boolean;
  style: { height: string; width: string };
  id: string;
}

export function toQRProps(incoming: string) {
  const q = JSON.parse(incoming) as Incoming;
  const qrResp: QProps = {
    value: q.value,
    ecLevel: q.ec_level as "L" | "M" | "Q" | "H",
    size: q.size,
    quietZone: q.quiet_zone,
    bgColor: q.bg_color,
    fgColor: q.fg_color,
    logoImage: q.logo_image,
    logoWidth: q.logo_width,
    logoHeight: q.logo_height,
    logoOpacity: q.logo_opacity,
    removeQrCodeBehindLogo: q.remove_qr_code_behind_logo,
    eyeColor: q.eye_color,
    eyeRadius: [q.top_l_eye_radius as CornerRadii, q.top_r_eye_radius as CornerRadii, q.bottom_l_eye_radius as CornerRadii],
    logoPadding: q.logo_padding,
    logoPaddingStyle: q.logo_padding_style,
    qrStyle: q.qr_style as "squares" | "dots",
    style: q.style ? q.style : { height: "100%", width: "100%" },
    id: q.id,
    XParent: q.x_parent,
    enableCORS: q.enable_CORS,
    QRType: q.qr_type as "png" | "svg" | "jpg",
  };
  return qrResp;
};

export function fromQRProps(q: QProps) {
  const iq = q as unknown as Incoming;
  const qrResp: Incoming = {
    value: q.value,
    ec_level: q.ecLevel,
    size: q.size,
    quiet_zone: q.quietZone,
    bg_color: q.bgColor,
    fg_color: q.fgColor,
    logo_image: q.logoImage,
    logo_width: q.logoWidth,
    logo_height: q.logoHeight,
    logo_opacity: q.logoOpacity,
    remove_qr_code_behind_logo: q.removeQrCodeBehindLogo,
    eye_color: q.eyeColor,
    top_l_eye_radius: q.eyeRadius[0],
    top_r_eye_radius: q.eyeRadius[1],
    bottom_l_eye_radius: q.eyeRadius[2],
    logo_padding: q.logoPadding,
    logo_padding_style: q.logoPaddingStyle,
    qr_style: q.qrStyle,
    qr_type: q.QRType,
    style: { height: "100%", width: "100%" },
    x_parent: q.XParent,
    id: q.id,
    enable_CORS: q.enableCORS,
  };
  return JSON.stringify(qrResp);
}