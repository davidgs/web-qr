import { KeyboardEventHandler } from "react";
import { QRCode } from "react-qrcode-logo";
import { useAppSelector } from "../stores/hooks";
import ReactId from "../utils/ReactId";
import potrace from "potrace";


export default function QRCodeArea() {
  const qrSettings = useAppSelector((state) => state.qrCode.settings);

  /**
   * Saving as an SVG is a pain in the ass, so we do (most)
   * of that here but it requires Node.js to actually accomplish it, for unknown reasons.
   */
  const saveSVG = () => {
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const params = {
      background: qrSettings.XParent ? "none" : qrSettings.bgColor,
      color: qrSettings.fgColor,
    };
    const dataURL = canvas?.toDataURL(`image/${qrSettings.QRType}`);
    // eslint-disable-next-line func-names
    potrace.trace(dataURL, params, function (err: any, svg: any) {
      if (err) throw err;
      const a = document.createElement("a");
      a.href = `data:image/svg+xml;base64,${btoa(svg)}`;
      a.download = `qrcode-${ReactId()}.svg`;
      a.click();
    });
  };
  const onDownloadClick = (): void => {
    if (qrSettings.QRType === "svg") {
      saveSVG();
      return;
    }
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const dataURL = canvas?.toDataURL(`image/${qrSettings.QRType}`);
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `qrcode-${ReactId()}.${qrSettings.QRType}`;
    a.click();
  };

  return (
    <div
      onClick={onDownloadClick}
      onKeyDown={null as unknown as KeyboardEventHandler}
      role="button"
      tabIndex={-1}
      aria-label="Download QR Code"
    >
      <QRCode
        id="react-qrcode-logo"
        value={qrSettings.value ? qrSettings.value : "http://www.example.com/"}
        size={qrSettings.size}
        bgColor={qrSettings.bgColor}
        fgColor={qrSettings.fgColor}
        logoImage={qrSettings.logoImage}
        qrStyle={qrSettings.qrStyle}
        logoWidth={qrSettings.logoWidth}
        logoHeight={qrSettings.logoHeight}
        logoOpacity={qrSettings.logoOpacity}
        eyeColor={qrSettings.eyeColor}
        eyeRadius={qrSettings.eyeRadius}
        quietZone={qrSettings.quietZone}
        enableCORS={qrSettings.enableCORS}
        ecLevel={qrSettings.ecLevel}
        logoPadding={qrSettings.logoPadding}
        logoPaddingStyle={
          qrSettings.logoPaddingStyle !== "circle" &&
          qrSettings.logoPaddingStyle !== "square"
            ? qrSettings.logoPaddingStyle
            : undefined
        }
      />
    </div>
  );
}