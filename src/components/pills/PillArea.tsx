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
import { JSX } from 'react';
import ReactId from '../../utils/ReactId';
import Pill from './Pill';
import { UtmKeyValue } from '../../types';

interface ICallback {
  // eslint-disable-next-line no-unused-vars
  (value: string, type: string): void;
}
interface PillAreaProps {
  pills: UtmKeyValue[];
  type: string;
  callback: ICallback;
}

export default function PillArea(props: PillAreaProps): JSX.Element {
  const { pills, type, callback } = props;
  const myUUID: string = ReactId();
  const removePill = (id: string) => {
    callback(id, type);
  };

  return (
    <div
      className="pillArea"
      key={`${myUUID}-pillArea`}
      style={{ paddingTop: '0.5rem' }}
    >
      {pills.length > 0
        ? pills.map((pill) => {
            return pill.key !== '' && pill.value !== '' ? (
              <Pill
                id={`${pill.key}-${type}`}
                valKey={`${pill.key}`}
                type={type}
                value={pill.value}
                callback={removePill}
              />
            ) : null;
          })
        : null}
    </div>
  );
}
