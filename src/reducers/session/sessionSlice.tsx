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
import { SessionProps, defaultSession } from '../../types';

const initialState = {
  settings: defaultSession,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateSession: (state, action) => {
      const newSession: SessionProps = action.payload;
      state.settings = newSession;
    },
    returnSession: (state) => {
      return state.settings as any;
    },
    updateSessionId: (state, action) => {
      state.settings.id = action.payload;
    },
    updateSessionLogin: (state, action) => {
      state.settings.login = action.payload;
    },
    updateSessionStripeId: (state, action) => {
      state.settings.stripe_id = action.payload;
    },
    updateSessionFirstName: (state, action) => {
      state.settings.first_name = action.payload;
    },
    updateSessionLastName: (state, action) => {
      state.settings.last_name = action.payload;
    },
    updateSessionOrganization: (state, action) => {
      state.settings.organization = action.payload;
    },
    updateSessionActive: (state, action) => {
      state.settings.active = action.payload;
    },
    updateSessionEmail: (state, action) => {
      state.settings.email = action.payload;
    },
    updateSessionLicenseType: (state, action) => {
      state.settings.license_type = action.payload;
    },
    updateSessionExpiryDate: (state, action) => {
      state.settings.expiry_date = action.payload;
    },
  }
});

export const {
  updateSession,
  returnSession,
  updateSessionId,
  updateSessionLogin,
  updateSessionStripeId,
  updateSessionFirstName,
  updateSessionLastName,
  updateSessionOrganization,
  updateSessionActive,
  updateSessionEmail,
  updateSessionLicenseType,
  updateSessionExpiryDate
} = sessionSlice.actions;

export default sessionSlice.reducer;
