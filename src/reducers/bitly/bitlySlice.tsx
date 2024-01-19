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
import { defaultBitlyConfig } from '../../types';
import store from 'store2';

const initialState = {
  settings: defaultBitlyConfig,
};

export const bitlySlice = createSlice({
  name: 'bitly',
  initialState,
  reducers: {
    check: (state) => {
      state.settings.bitlyEnabled = !state.settings.bitlyEnabled as boolean;
    },
    updateURL: (state, action) => {
      state.settings.bitlyAddr = action.payload as string;
    },
    updateToken: (state, action) => {
      state.settings.bitlyToken = action.payload as string;
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
    updateDomain: (state, action) => {
      state.settings.bitlyDomain = action.payload as string;
    },
    updateUseValue: (state, action) => {
      state.settings.useValue = action.payload as boolean;
    },
    updateType: (state, action) => {
      state.settings.type = action.payload as string;
    },
    updateEnableBitly: (state, action) => {
      state.settings.bitlyEnabled = action.payload as boolean;
    },
    updateBitlySettings: (state, action) => {
      state.settings = action.payload as any;
    },
  },
});

export const {
  check,
  updateURL,
  updateToken,
  updateAriaLabel,
  updateDomain,
  updateError,
  updateLabel,
  updateTooltip,
  updateType,
  updateUseValue,
  updateEnableBitly,
  updateBitlySettings,
} = bitlySlice.actions;

export default bitlySlice.reducer;
