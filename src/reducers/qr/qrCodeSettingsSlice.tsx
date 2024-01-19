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
import { CornerRadii, DefaultQRStyle, IProps } from '../../types';
import store from 'store2';

const initialState = {
  settings: DefaultQRStyle,
};

export const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState,
  reducers: {
    updateQRValue: (state, action) => {
      state.settings.value = action.payload as string;
    },
    updateECLevel: (state, action) => {
      state.settings.ecLevel = action.payload as 'L' | 'M' | 'Q' | 'H';
    },
    updateSize: (state, action) => {
      state.settings.size = action.payload as number;
    },
    updateQuietZone: (state, action) => {
      state.settings.quietZone = action.payload as number;
    },
    updateBgColor: (state, action) => {
      state.settings.bgColor = action.payload as string;
    },
    updateFgColor: (state, action) => {
      state.settings.fgColor = action.payload as string;
    },
    updateLogoImage: (state, action) => {
      state.settings.logoImage = action.payload as string;
    },
    updateLogoWidth: (state, action) => {
      state.settings.logoWidth = action.payload as number;
    },
    updateLogoHeight: (state, action) => {
      state.settings.logoHeight = action.payload as number;
    },
    updateLogoOpacity: (state, action) => {
      state.settings.logoOpacity = action.payload as number;
    },
    updateRemoveQrCodeBehindLogo: (state, action) => {
      state.settings.removeQrCodeBehindLogo = action.payload as boolean;
    },
    updateQrStyle: (state, action) => {
      state.settings.qrStyle = action.payload as 'squares' | 'dots';
    },
    updateEyeColor: (state, action) => {
      state.settings.eyeColor = action.payload as string;
    },
    updateEyeRadius: (state, action) => {
      state.settings.eyeRadius = action.payload as [
        CornerRadii,
        CornerRadii,
        CornerRadii,
      ];
    },
    updateLogoPadding: (state, action) => {
      state.settings.logoPadding = action.payload as number;
    },
    updateLogoPaddingStyle: (state, action) => {
      state.settings.logoPaddingStyle = action.payload as
        | 'square'
        | 'circle'
        | 'none';
    },
    updateStyle: (state, action) => {
      state.settings.style = action.payload;
    },
    updateId: (state, action) => {
      state.settings.id = action.payload;
    },
    updateEnableCors: (state, action) => {
      state.settings.enableCORS = action.payload as boolean;
    },
    updateQRStyleSettings: (state, action) => {
      state.settings = action.payload as IProps;
    },
  },
});

export const {
  updateQRValue,
  updateECLevel,
  updateSize,
  updateQuietZone,
  updateEnableCors,
  updateBgColor,
  updateFgColor,
  updateLogoImage,
  updateLogoWidth,
  updateLogoHeight,
  updateLogoOpacity,
  updateRemoveQrCodeBehindLogo,
  updateQrStyle,
  updateEyeColor,
  updateEyeRadius,
  updateLogoPadding,
  updateLogoPaddingStyle,
  updateStyle,
  updateId,
  updateQRStyleSettings,
} = qrCodeSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default qrCodeSlice.reducer;
