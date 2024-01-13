/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { ColorResult, SketchPicker, RGBColor } from 'react-color';
import { useState } from 'react';

interface ColorPickerProps {
  pickColor: RGBColor;
  name: string;
  // eslint-disable-next-line no-unused-vars
  callback: (arg0: ColorResult, name: string) => void;
}
export default function ColorPicker(props: ColorPickerProps) {
  const { pickColor, name, callback } = props;
  const [showPicker, setShowPicker] = useState(false);
  const handleClick = () => {
    setShowPicker(!showPicker);
  };
  const handleClose = () => {
    setShowPicker(false);
  };
  const handleChange = (myColor: ColorResult) => {
    callback(myColor, name);
  };

  return (
    <div>
      <div
        style={{
          width: '45px',
          height: '40px',
          padding: '3px',
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0 0 0 1px rgba(66,11,95,.5)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: '80%',
            height: '80%',
            margin: 'auto',
            borderRadius: '2px',
            marginTop: '3px',
            border: '1px solid #000',
            backgroundColor: `rgba(${pickColor.r}, ${pickColor.g}, ${pickColor.b}, ${pickColor.a})`,
            alignContent: 'middle',
          }}
        />
      </div>
      {showPicker ? (
        <div style={{ zIndex: 2, position: 'absolute' }}>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <SketchPicker color={pickColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}
