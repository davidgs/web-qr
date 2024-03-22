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
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WiFiSettings, defaultWiFiSettings } from '../../types';

const initialState: WiFiSettings = {
    ssid: {
      label: defaultWiFiSettings.ssid.label,
      tooltip: defaultWiFiSettings.ssid.tooltip,
      ariaLabel: defaultWiFiSettings.ssid.ariaLabel,
      error: defaultWiFiSettings.ssid.error,
      value: defaultWiFiSettings.ssid.value,
    },
    password: {
      label: defaultWiFiSettings.password.label,
      tooltip: defaultWiFiSettings.password.tooltip,
      ariaLabel: defaultWiFiSettings.password.ariaLabel,
      error: defaultWiFiSettings.password.error,
      value: defaultWiFiSettings.password.value,
    },
    encryption: {
      label: defaultWiFiSettings.encryption.label,
      tooltip: defaultWiFiSettings.encryption.tooltip,
      ariaLabel: defaultWiFiSettings.encryption.ariaLabel,
      error: defaultWiFiSettings.encryption.error,
      value: defaultWiFiSettings.encryption.value,
    },
    hidden: {
      label: defaultWiFiSettings.hidden.label,
      tooltip: defaultWiFiSettings.hidden.tooltip,
      ariaLabel: defaultWiFiSettings.hidden.ariaLabel,
      error: defaultWiFiSettings.hidden.error,
      value: defaultWiFiSettings.hidden.value,
    },
};

export const wifiSlice = createSlice({
  name: "wifi",
  initialState,
  reducers: {
    updateSSIDLabel: (state, action: PayloadAction<string>) => {
      state.ssid.label = action.payload;
    },
    updateSSIDTooltip: (state, action: PayloadAction<string>) => {
      state.ssid.tooltip = action.payload;
    },
    updateSSIDAriaLabel: (state, action: PayloadAction<string>) => {
      state.ssid.ariaLabel = action.payload;
    },
    updateSSIDError: (state, action: PayloadAction<string>) => {
      state.ssid.error = action.payload;
    },
    updateSSIDValue: (state, action: PayloadAction<string>) => {
      state.ssid.value = action.payload;
    },
    updatePasswordLabel: (state, action: PayloadAction<string>) => {
      state.password.label = action.payload;
    },
    updatePasswordTooltip: (state, action: PayloadAction<string>) => {
      state.password.tooltip = action.payload;
    },
    updatePasswordAriaLabel: (state, action: PayloadAction<string>) => {
      state.password.ariaLabel = action.payload;
    },
    updatePasswordError: (state, action: PayloadAction<string>) => {
      state.password.error = action.payload;
    },
    updatePasswordValue: (state, action: PayloadAction<string>) => {
      state.password.value = action.payload;
    },
    updateEncryptionLabel: (state, action: PayloadAction<string>) => {
      state.encryption.label = action.payload;
    },
    updateEncryptionTooltip: (state, action: PayloadAction<string>) => {
      state.encryption.tooltip = action.payload;
    },
    updateEncryptionAriaLabel: (state, action: PayloadAction<string>) => {
      state.encryption.ariaLabel = action.payload;
    },
    updateEncryptionError: (state, action: PayloadAction<string>) => {
      state.encryption.error = action.payload;
    },
    updateEncryptionValue: (
      state,
      action: PayloadAction<"" | "WPA/WPA2" | "WEP" | "None"
      >
    ) => {
      state.encryption.value = action.payload;
    },
    updateHiddenLabel: (state, action: PayloadAction<string>) => {
      state.hidden.label = action.payload;
    },
    updateHiddenTooltip: (state, action: PayloadAction<string>) => {
      state.hidden.tooltip = action.payload;
    },
    updateHiddenAriaLabel: (state, action: PayloadAction<string>) => {
      state.hidden.ariaLabel = action.payload;
    },
    updateHiddenError: (state, action: PayloadAction<string>) => {
      state.hidden.error = action.payload;
    },
    updateHiddenValue: (state, action: PayloadAction<boolean>) => {
      state.hidden.value = action.payload;
    },
    updateEncryption: (
      state,
      action: PayloadAction<{
        label: string;
        tooltip: string;
        ariaLabel: string;
        error: string;
        value: "" | "WPA/WPA2" | "WEP" | "None"
      }>
    ) => {
      state.encryption = action.payload;
    },
    updateWifi: (state, action: PayloadAction<WiFiSettings>) => {
      state = action.payload;
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
