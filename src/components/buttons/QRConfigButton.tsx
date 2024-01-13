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
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Gear, GearFill } from 'react-bootstrap-icons';
import QRConfigForm from '../../configuration/QRConfigForm';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';

export default function QRConfigButton(): React.JSX.Element {
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';

  /**
   * Show the configuration window
   */
  const showConfigWindow = () => {
    setShowConfig(!showConfig);
  };

  return (
    <div>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="adjust-qr-tooltip">Adjust your QR Code</Tooltip>}
      >
        <Button
          variant={dark ? 'icon-only-dark' : 'icon-only'}
          size="sm"
          onClick={showConfigWindow}
          className={darkClass}
        >
          {dark ? (
            <Gear className={darkClass} />
          ) : (
            <GearFill className={darkClass} />
          )}
        </Button>
      </OverlayTrigger>
      <QRConfigForm show={showConfig} onHide={showConfigWindow} />
    </div>
  );
}
