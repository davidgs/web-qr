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
import { UserSettings, defaultUserSettings, settingsServer } from '../../types';

export interface UserState {
  settings: UserSettings;
  loading: boolean;
  error: string | undefined;
}
const initialState: UserState = {
  settings: {
    login: defaultUserSettings.login,
    stripe_id: defaultUserSettings.stripe_id,
    userfront_id: defaultUserSettings.userfront_id,
    first_name: defaultUserSettings.first_name,
    last_name: defaultUserSettings.last_name,
    organization: defaultUserSettings.organization,
    address: defaultUserSettings.address,
    city: defaultUserSettings.city,
    state: defaultUserSettings.state,
    zip: defaultUserSettings.zip,
    active: defaultUserSettings.active,
    email: defaultUserSettings.email,
    created_at: defaultUserSettings.created_at,
    confirmed: defaultUserSettings.confirmed,
    updated_at: undefined,
  },
  loading: false,
  error: undefined,
};

export const fetchUser = createAsyncThunk('user/fetchUser',
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "user_settings" };
    if (username === "") {
      return defaultUserSettings as UserSettings;
    }
    const session = fetch(`${settingsServer}user-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return session;
  }
);

export const saveUserSettings = createAsyncThunk('user/saveUser', async ({ username, settings }: { username: string, settings: UserSettings }) => {
  if (username === "") {
    return defaultUserSettings as UserSettings;
  }
  const data = { username: username, data_fetch: "user_settings", settings: settings };
  const s = JSON.stringify(data).length;
  console.log(`Data Size: ${s}`);
  const session = fetch(`${settingsServer}save-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  return session;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.settings.login = action.payload;
    },
    setStripeId: (state, action: PayloadAction<string>) => {
      state.settings.stripe_id = action.payload;
    },
    setUserfrontId: (state, action: PayloadAction<string>) => {
      state.settings.userfront_id = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.settings.first_name = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.settings.last_name = action.payload;
    },
    setOrganization: (state, action: PayloadAction<string>) => {
      state.settings.organization = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.settings.address = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.settings.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.settings.state = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.settings.zip = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.settings.active = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.settings.email = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<string>) => {
      state.settings.created_at = action.payload;
    },
    setConfirmed: (state, action: PayloadAction<boolean>) => {
      state.settings.confirmed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as UserSettings;
      state.error = undefined;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      // state.login = false;
      state.error = action.error.message as string | undefined;
    });
    builder.addCase(saveUserSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveUserSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as UserSettings;
      state.error = undefined;
    });
    builder.addCase(saveUserSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | undefined;
    });
  },
});

export const {
  setLogin,
  setStripeId,
  setUserfrontId,
  setFirstName,
  setLastName,
  setOrganization,
  setAddress,
  setCity,
  setState,
  setZip,
  setActive,
  setEmail,
  setCreatedAt,
  setConfirmed,
 } = userSlice.actions;

export default userSlice.reducer;