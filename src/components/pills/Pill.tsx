/* eslint-disable react/no-danger */
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
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { JSX, SyntheticEvent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactId from '../../utils/ReactId';
import icon from '../../icons/link-logo.png';

interface PillProps {
  id: string;
  valKey: string;
  value: string;
  type: string;
  // eslint-disable-next-line no-unused-vars
  callback: (v: string, t: string) => void;
}
export default function Pill(props: PillProps): JSX.Element {
  const { id, valKey, value, type, callback } = props;
  const removeMe = (event: SyntheticEvent) => {
    if (event.target) {
      event.stopPropagation();
      callback(value, type);
    }
  };
  const tip = `<strong>Menu-Item:</strong> <i>${value}</i><br /> <strong>${type}:</strong> <i>${valKey}</i>`;
  return (
    <OverlayTrigger
      placement="auto"
      overlay={
        <Tooltip id={ReactId()}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: tip }} />
        </Tooltip>
      }
    >
      <button
        type="button"
        id={id}
        key={`${id}-button`}
        className="pill"
        style={{ cursor: 'default' }}
      >
        <img className="pillImage" key={`${id}-icon`} alt="icon" src={icon} />
        {value}
        <span
          role="button"
          className="close"
          id={`close-${id}`}
          key={`${id}-closer`}
          onClick={removeMe}
          onKeyPress={removeMe}
        />
      </button>
    </OverlayTrigger>
  );
}
