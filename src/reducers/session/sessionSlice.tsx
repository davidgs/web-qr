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
import { SessionProps, defaultSession } from '../../types';

const initialState: SessionProps = {
  id: defaultSession.id,
  login: defaultSession.login,
  stripe_id: defaultSession.stripe_id,
  first_name: defaultSession.first_name,
  last_name: defaultSession.last_name,
  organization: defaultSession.organization,
  active: defaultSession.active,
  email: defaultSession.email,
  license_type: defaultSession.license_type,
  expiry_date: defaultSession.expiry_date,
  license_token: defaultSession.license_token,

};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<SessionProps>) => {
      state = action.payload;
    },
    returnSession: (state) => {
      return state as SessionProps;
    },
    updateSessionId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    updateSessionLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    updateSessionStripeId: (state, action: PayloadAction<string>) => {
      state.stripe_id = action.payload;
    },
    updateSessionFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    updateSessionLastName: (state, action: PayloadAction<string>) => {
      state.last_name = action.payload;
    },
    updateSessionOrganization: (state, action: PayloadAction<string>) => {
      state.organization = action.payload;
    },
    updateSessionActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    updateSessionEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateSessionLicenseType: (state, action: PayloadAction<string>) => {
      state.license_type = action.payload;
    },
    updateSessionExpiryDate: (
      state,
      action: PayloadAction<Date | undefined>
    ) => {
      state.expiry_date = action.payload;
    },
    updateSessionLicenseToken: (state, action: PayloadAction<string>) => {
      state.license_token = action.payload;
    }
  },
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
  updateSessionExpiryDate,
  updateSessionLicenseToken,
} = sessionSlice.actions;

export default sessionSlice.reducer;
