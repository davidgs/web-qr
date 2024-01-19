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
import { defaultWiFiSettings } from '../../types';
import store from 'store2';

const initialState = {
  settings: defaultWiFiSettings,
};

export const wifiSlice = createSlice({
  name: 'wifi',
  initialState,
  reducers: {
    updateSSIDLabel: (state, action) => {
      state.settings.ssid.label = action.payload;
    },
    updateSSIDTooltip: (state, action) => {
      state.settings.ssid.tooltip = action.payload;
    },
    updateSSIDAriaLabel: (state, action) => {
      state.settings.ssid.ariaLabel = action.payload;
    },
    updateSSIDError: (state, action) => {
      state.settings.ssid.error = action.payload;
    },
    updateSSIDValue: (state, action) => {
      state.settings.ssid.value = action.payload;
    },
    updatePasswordLabel: (state, action) => {
      state.settings.password.label = action.payload;
    },
    updatePasswordTooltip: (state, action) => {
      state.settings.password.tooltip = action.payload;
    },
    updatePasswordAriaLabel: (state, action) => {
      state.settings.password.ariaLabel = action.payload;
    },
    updatePasswordError: (state, action) => {
      state.settings.password.error = action.payload;
    },
    updatePasswordValue: (state, action) => {
      state.settings.password.value = action.payload;
    },
    updateEncryptionLabel: (state, action) => {
      state.settings.encryption.label = action.payload;
    },
    updateEncryptionTooltip: (state, action) => {
      state.settings.encryption.tooltip = action.payload;
    },
    updateEncryptionAriaLabel: (state, action) => {
      state.settings.encryption.ariaLabel = action.payload;
    },
    updateEncryptionError: (state, action) => {
      state.settings.encryption.error = action.payload;
    },
    updateEncryptionValue: (state, action) => {
      state.settings.encryption.value = action.payload;
    },
    updateHiddenLabel: (state, action) => {
      state.settings.hidden.label = action.payload;
    },
    updateHiddenTooltip: (state, action) => {
      state.settings.hidden.tooltip = action.payload;
    },
    updateHiddenAriaLabel: (state, action) => {
      state.settings.hidden.ariaLabel = action.payload;
    },
    updateHiddenError: (state, action) => {
      state.settings.hidden.error = action.payload;
    },
    updateHiddenValue: (state, action) => {
      state.settings.hidden.value = action.payload;
    },
    updateEncryption: (state, action) => {
      state.settings.encryption = action.payload;
    },
    updateWifi: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const {
  updateSSIDLabel,
  updateSSIDTooltip,
  updateSSIDAriaLabel,
  updateSSIDError,
  updateSSIDValue,
  updatePasswordLabel,
  updatePasswordTooltip,
  updatePasswordAriaLabel,
  updatePasswordError,
  updatePasswordValue,
  updateEncryptionLabel,
  updateEncryptionTooltip,
  updateEncryptionAriaLabel,
  updateEncryptionError,
  updateEncryptionValue,
  updateHiddenLabel,
  updateHiddenTooltip,
  updateHiddenAriaLabel,
  updateHiddenError,
  updateHiddenValue,
  updateEncryption,
  updateWifi,
} = wifiSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default wifiSlice.reducer;
