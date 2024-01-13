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
import { createSlice } from '@reduxjs/toolkit';
import { defaultUTMParams } from '../../types';

const initialState = {
  settings: defaultUTMParams.utm_content,
};

export const utmContentSlice = createSlice({
  name: 'utmContent',
  initialState,
  reducers: {
    updateUseValue: (state, action) => {
      state.settings.useValue = action.payload as boolean;
    },
    updateIsChooser: (state, action) => {
      state.settings.isChooser = action.payload as boolean;
    },
    updateShowName: (state, action) => {
      state.settings.showName = action.payload as boolean;
    },
    updateLabel: (state, action) => {
      state.settings.label = action.payload as string;
    },
    updateTooltip: (state, action) => {
      state.settings.tooltip = action.payload as string;
    },
    updateAriaLabel: (state, action) => {
      state.settings.ariaLabel = action.payload as string;
    },
    updateError: (state, action) => {
      state.settings.error = action.payload as string;
    },
    updateValue: (state, action) => {
      state.settings.value = action.payload;
    },
    updateUTMContentSettings: (state, action) => {
      const uSet = action.payload;
      state.settings = uSet;
    },
  },
});

export const {
  updateUseValue,
  updateIsChooser,
  updateShowName,
  updateLabel,
  updateTooltip,
  updateAriaLabel,
  updateError,
  updateValue,
  updateUTMContentSettings,
} = utmContentSlice.actions;

export default utmContentSlice.reducer;
