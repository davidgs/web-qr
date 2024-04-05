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
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LicenseProps, defaultLicense, settingsServer } from '../../types';

export interface LicenseState {
  settings: LicenseProps;
  loading: boolean;
  error: string | undefined;
}

const initialState: LicenseState = {
  settings: {
    license_type: defaultLicense.license_type,
    expire_date: defaultLicense.expire_date,
    license_key: defaultLicense.license_key,
    cust_id: defaultLicense.cust_id,
    active: defaultLicense.active,
    confirmed: defaultLicense.confirmed,
    license_status: defaultLicense.license_status,
  },
  loading: false,
  error: undefined,
};

export const fetchLicense = createAsyncThunk('license/fetchLicense',
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "license_settings" };
    if (username === "") {
      return defaultLicense as LicenseProps;
    }
    const session = fetch(`${settingsServer}user-data`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(`fetchLicense: ${JSON.stringify(data)}`)
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return defaultLicense as LicenseProps;
      });
    console.log(`fetchLicense: ${JSON.stringify(session)}`)
    return session;
  });

export const updateLicenseSettings = createAsyncThunk('license/updateLicenseSettings',
  async (props: LicenseProps) => {
    const data = { username: props.cust_id, data_update: "license_settings", data: props };
    const session = fetch(`${settingsServer}delete-license`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await session;
    const json = await response.json();
    console.log(`updateLicenseSettings: ${JSON.stringify(json)}`)
    return json;
  });

export const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    updateLicense: (state, action: PayloadAction<LicenseProps>) => {
      state.settings = action.payload;
    },
    updateLicenseType: (state, action: PayloadAction<string>) => {
      state.settings.license_type = action.payload;
    },
    updateLicenseExpiryDate: (state, action: PayloadAction<Date>) => {
      state.settings.expire_date = action.payload;
    },
    updateLicenseKey: (state, action: PayloadAction<string>) => {
      state.settings.license_key = action.payload;
    },
    updateLicenseCustId: (state, action: PayloadAction<string>) => {
      state.settings.cust_id = action.payload;
    },
    updateLicenseActive: (state, action: PayloadAction<boolean>) => {
      state.settings.active = action.payload;
    },
    updateLicenseConfirmed: (state, action: PayloadAction<boolean>) => {
      state.settings.confirmed = action.payload;
    },
    updateLicenseStatus: (state, action: PayloadAction<string>) => {
      state.settings.license_status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicense.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLicense.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchLicense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateLicense,
  updateLicenseType,
  updateLicenseExpiryDate,
  updateLicenseKey,
  updateLicenseCustId,
  updateLicenseActive,
  updateLicenseConfirmed,
} = licenseSlice.actions;

export default licenseSlice.reducer;