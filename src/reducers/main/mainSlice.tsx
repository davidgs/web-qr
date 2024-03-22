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
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainSettings, defaultMainSettings, settingsServer } from "../../types";


interface MainSliceSettings {
  settings: MainSettings;
  loading: boolean;
  error: string | undefined;
}
const initialState: MainSliceSettings = {
  settings: {
    brandImage: defaultMainSettings.brandImage,
    brandHeight: defaultMainSettings.brandHeight,
    brandWidth: defaultMainSettings.brandWidth,
    brandOpacity: defaultMainSettings.brandOpacity,
    formType: defaultMainSettings.formType,
    dark: false,
  },
  loading: false,
  error: undefined,
};

export const fetchMain = createAsyncThunk(
  "bitly/fetchMain",
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "main_settings" };
    if (username === "") {
      return defaultMainSettings as MainSettings;
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
      })
      .catch((err) => {
        return err;
      });
    return session;
  }
);

export const saveMain = createAsyncThunk(
  "main/saveMain",
  async ({ settings, username }: { settings: MainSettings, username: string }) => {
    const data = { username: username, settings: settings };
    const session = fetch(`${settingsServer}update-main-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    return session;
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateBrandImage: (state, action: PayloadAction<string>) => {
      state.settings.brandImage = action.payload;
    },
    updateHeight: (state, action: PayloadAction<number>) => {
      state.settings.brandHeight = action.payload;
    },
    updateWidth: (state, action: PayloadAction<number>) => {
      state.settings.brandWidth = action.payload as number;
    },
    updateBrandOpacity: (state, action: PayloadAction<number>) => {
      state.settings.brandOpacity = action.payload as number;
    },
    updateFormType: (
      state,
      action: PayloadAction<"wifi" | "simple" | "encoded">
    ) => {
      state.settings.formType = action.payload;
    },
    updateMainSettings: (state, action: PayloadAction<MainSettings>) => {
      state.settings = action.payload;
    },
    updateDark: (state, action: PayloadAction<boolean>) => {
      state.settings.dark = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMain.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as MainSettings;
    });
    builder.addCase(fetchMain.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | undefined;
    });
    builder.addCase(saveMain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveMain.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as MainSettings;
    });
    builder.addCase(saveMain.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | undefined;
    });
  },
});

export const {
  updateBrandImage,
  updateHeight,
  updateWidth,
  updateBrandOpacity,
  updateFormType,
  updateMainSettings,
  updateDark,
} = mainSlice.actions;
// export const userSelector = (state: RootState) => state.mainSliceReducer;

export default mainSlice.reducer;
