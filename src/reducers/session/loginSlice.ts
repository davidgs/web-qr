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
import Userfront from '@userfront/core';
export interface LoginState {
  login: boolean;
  loading: boolean;
  error: string | undefined;
  settingsUpdated: boolean;
}
const initialState: LoginState = {
  login: false,
  loading: false,
  error: undefined,
  settingsUpdated: false,
};

export const fetchLogin = createAsyncThunk('login/fetchLogin', async () => {
  Userfront.init("xbp876mb");
  const l = Userfront.getSession()
    .then((session) => {
      console.log(`Logged In: ${session.isLoggedIn}`);
      return session.isLoggedIn;
    })
    .catch((err) => {
      return null;
    });
  return l;
}
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    setSettingsUpdated: (state, action: PayloadAction<boolean>) => {
      state.settingsUpdated = action.payload;
    }
  },
    extraReducers: (builder) => {
      builder.addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload as boolean;
      });
      builder.addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.login = false;
        state.error = action.error.message as string | undefined;
      });
  },
});

export const { setLogin, setSettingsUpdated } = loginSlice.actions;

export default loginSlice.reducer;