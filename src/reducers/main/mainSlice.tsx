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
import { MainSettings, defaultMainSettings } from '../../types';
import store from 'store2';

const initialState = {
  settings: defaultMainSettings,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateBrandImage: (state, action) => {
      state.settings.brandImage = action.payload as string;
    },
    updateHeight: (state, action) => {
      state.settings.brandHeight = action.payload as number;
    },
    updateWidth: (state, action) => {
      state.settings.brandWidth = action.payload as number;
    },
    updateBrandOpacity: (state, action) => {
      state.settings.brandOpacity = action.payload as number;
    },
    updateFormType: (state, action) => {
      state.settings.formType = action.payload as 'wifi' | 'simple' | 'encoded';
    },
    updateSidebar: (state, action) => {
      state.settings.sidebar = action.payload as 'open' | 'closed';
    },
    updateFirstRun: (state, action) => {
      state.settings.firstRun = action.payload as boolean;
    },
    updateMainSettings: (state, action) => {
      const mSet: MainSettings = action.payload;
      state.settings = mSet;
    },
    returnMainSettings: (state) => {
      return state.settings as any;
    },
  },
});

export const {
  updateBrandImage,
  updateHeight,
  updateWidth,
  updateBrandOpacity,
  updateFormType,
  updateSidebar,
  updateMainSettings,
  updateFirstRun,
  returnMainSettings,
} = mainSlice.actions;

export default mainSlice.reducer;
