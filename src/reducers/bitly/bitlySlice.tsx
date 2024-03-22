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
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BitlyConfig, defaultBitlyConfig, settingsServer } from "../../types";

const db_url = "http://localhost:4242/user-data";

export interface BitlyState {
  loading: boolean;
  settings: BitlyConfig;
  error: string | undefined;
}

const initialState: BitlyState = {
  settings: {
    bitly_enabled: defaultBitlyConfig.bitly_enabled,
    bitly_addr: defaultBitlyConfig.bitly_addr,
    bitly_token: defaultBitlyConfig.bitly_token,
    bitly_domain: defaultBitlyConfig.bitly_domain,
    label: defaultBitlyConfig.label,
    tooltip: defaultBitlyConfig.tooltip,
    aria_label: defaultBitlyConfig.aria_label,
    error: defaultBitlyConfig.error,
    use_value: defaultBitlyConfig.use_value,
    type: defaultBitlyConfig.type,
  },
  loading: false,
  error: undefined,
};

export const fetchBitly = createAsyncThunk(
  "bitly/fetchBitly",
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "bitly_settings" };
    if (username === "") {
      return defaultBitlyConfig;
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
        console.log("bitly data", data);
        return data;
      })
      .catch((err) => {
        console.error("getting bitly user error", err);
        return err;
      });
    return session;
  }
);

export const saveBitly = createAsyncThunk(
  "bitly/saveBitly",
  async ({
    username,
    settings,
  }: {
    username: string;
    settings: BitlyConfig;
  }) => {
    const data = { username: username, settings: settings };
    const session = fetch(`${settingsServer}update-bitly-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data.bitly_settings;
      })
      .catch((err) => {
        console.error("saving bitly user error", err);
        return err;
      });
    return session;
  }
);

export const bitlySlice = createSlice({
  name: "bitly",
  initialState,
  reducers: {
    check: (state) => {
      state.settings.bitly_enabled = !state.settings.bitly_enabled;
    },
    updateURL: (state, action: PayloadAction<string>) => {
      state.settings.bitly_addr = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.settings.bitly_token = action.payload;
    },
    updateLabel: (state, action: PayloadAction<string>) => {
      state.settings.label = action.payload;
    },
    updateTooltip: (state, action: PayloadAction<string>) => {
      state.settings.tooltip = action.payload;
    },
    updateAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.aria_label = action.payload;
    },
    updateError: (state, action: PayloadAction<string>) => {
      state.settings.error = action.payload;
    },
    updateDomain: (state, action: PayloadAction<string>) => {
      state.settings.bitly_domain = action.payload;
    },
    updateUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.use_value = action.payload;
    },
    updateType: (state, action: PayloadAction<string>) => {
      state.settings.type = action.payload;
    },
    updateEnableBitly: (state, action: PayloadAction<boolean>) => {
      state.settings.bitly_enabled = action.payload;
    },
    updateBitlySettings: (state, action: PayloadAction<BitlyConfig>) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBitly.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBitly.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as BitlyConfig;
    });
    builder.addCase(fetchBitly.rejected, (state, action) => {
      state.loading = false;
      state.settings = defaultBitlyConfig;
      state.error = action.error.message as string | undefined;
    });
    builder.addCase(saveBitly.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveBitly.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as BitlyConfig;
    });
    builder.addCase(saveBitly.rejected, (state, action) => {
      state.loading = false;
      state.settings = defaultBitlyConfig;
      state.error = action.error.message as string | undefined;
    });
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
