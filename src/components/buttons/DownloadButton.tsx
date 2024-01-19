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
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';
import potrace from 'potrace';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';
import ReactId from '../../utils/ReactId';

export default function DownloadButton() {
  const qrConf = useSelector((state: RootState) => state.qr.settings);
  const qrCodeConf = useSelector((state: RootState) => state.qrCode.settings);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';

  const saveSVG = () => {
    const canvas = document.getElementById(
      'react-qrcode-logo',
    ) as HTMLCanvasElement;
    const params = {
      background: qrConf.XParent ? 'none' : qrCodeConf.bgColor,
      color: qrCodeConf.fgColor,
    };
    const dataURL = canvas?.toDataURL(`image/${qrConf.QRType}`);
    // eslint-disable-next-line func-names
    potrace.trace(dataURL, params, function (err: any, svg: any) {
      if (err) throw err;
      const a = document.createElement('a');
      a.href = `data:image/svg+xml;base64,${btoa(svg)}`;
      a.download = `qrcode-${ReactId()}.svg`;
      a.click();
    });
  };

  const onDownloadClick = () => {
    if (qrConf.QRType === 'svg') {
      saveSVG();
      return;
    }
    const canvas = document.getElementById(
      'react-qrcode-logo',
    ) as HTMLCanvasElement;
    const dataURL = canvas?.toDataURL(`image/${qrConf.QRType}`);
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `qrcode-${ReactId()}.${qrConf.QRType}`;
    a.click();
  };

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 300 }}
      overlay={
        <Tooltip id="download-qr-tooltip">Download your QR Code</Tooltip>
      }
    >
      <Button
        variant={dark ? "icon-only-dark" : "icon-only"}
        size="sm"
        onClick={onDownloadClick}
        className={darkClass}
        style={{ float: "right", alignItems: "center" }}
      >
        <Download className={darkClass} color={dark ? "#adb5bd" : "#0B263E"} />
      </Button>
    </OverlayTrigger>
  );
}
