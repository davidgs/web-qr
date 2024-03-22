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
import { useEffect, useState } from "react";
import { Knob, KnobChangeEvent } from "primereact/knob";
import { useDebounce } from "@uidotdev/usehooks";
import { knobConfig } from "../../types";
import ReactId from "../../utils/ReactId";
import { RootState } from "../../stores/store";
import store from "store2";
import { useAppSelector } from "../../stores/hooks";

export default function AdjusterKnob({
  name,
  value,
  min,
  max,
  step,
  disabled,
  callback,
}: {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  callback: (arg0: number) => void;
}) {
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const [thisVal, setThisVal] = useState<number>(value);
  const debouncedValue = useDebounce((thisVal ? thisVal : 0 ), 100);

  useEffect(() => {
    callback(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Knob
      id={ReactId()}
      size={knobConfig.knobSize}
      name={name}
      className={`${disabled ? "not-allowed" : "allowed"} p-knob ${darkClass}`}
      style={{
        margin: "auto",
        cursor: disabled ? "not-allowed !important" : "pointer",
      }}
      step={step}
      value={debouncedValue}
      min={min}
      max={max}
      strokeWidth={knobConfig.knobStroke}
      textColor={
        // eslint-disable-next-line no-nested-ternary
        dark
          ? disabled
            ? "grey"
            : "#adb5bd"
          : disabled
          ? "#adb5bd"
          : "#0B3665"
      }
      valueColor="#0B3665"
      rangeColor="#21C6DC"
      onChange={(e: KnobChangeEvent) => {
        setThisVal(e.value);
      }}
      disabled={disabled}
    />
  );
}
