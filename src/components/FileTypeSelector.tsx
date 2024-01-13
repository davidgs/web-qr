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
import React, { JSX, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FiletypeSvg, FiletypeJpg, FiletypePng } from 'react-bootstrap-icons';

interface FileTypeProps {
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (selectedFileType: string) => void;
  // eslint-disable-next-line no-unused-vars
  fileType: string;
}

function FileTypeSelector(props: FileTypeProps): JSX.Element {
  const { onSelectionChange, fileType } = props;
  const [selectedFileType, setSelectedFileType] = useState(fileType);

  const handleSelectionChange = (event: React.MouseEvent<SVGSVGElement>) => {
    const selectedFileTypeValue = event.currentTarget.getAttribute(
      'data-value',
    ) as string;
    setSelectedFileType(selectedFileTypeValue);
    onSelectionChange(selectedFileTypeValue);
  };

  return (
    <div style={{ paddingTop: '10px' }}>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        rootClose
        overlay={
          <Tooltip id="qrcode-tooltip">
            Generate QR Code as an svg. SVGs can have a transparent background
          </Tooltip>
        }
      >
        <FiletypeSvg
          onClick={handleSelectionChange}
          data-value="svg"
          size={40}
          className={
            selectedFileType === 'svg'
              ? 'custom-radio selected'
              : 'custom-radio'
          }
          style={{
            cursor: 'pointer',
            marginRight: 10,
          }}
        />
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        rootClose
        overlay={
          <Tooltip id="qrcode-tooltip">
            Generate QR Code as a jpg image.
          </Tooltip>
        }
      >
        <FiletypeJpg
          onClick={handleSelectionChange}
          data-value="jpg"
          size={40}
          className={
            selectedFileType === 'jpg'
              ? 'custom-radio selected'
              : 'custom-radio'
          }
          style={{
            cursor: 'pointer',
            marginRight: 10,
          }}
        />
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        rootClose
        overlay={
          <Tooltip id="qrcode-tooltip">
            Generate QR Code as a png image.
          </Tooltip>
        }
      >
        <FiletypePng
          onClick={handleSelectionChange}
          data-value="png"
          size={40}
          className={
            selectedFileType === 'png'
              ? 'custom-radio selected'
              : 'custom-radio'
          }
          style={{
            cursor: 'pointer',
          }}
        />
      </OverlayTrigger>
    </div>
  );
}

export default FileTypeSelector;
