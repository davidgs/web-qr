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
import {
  CornerRadii,
  DefaultQRStyle,
  QProps,
  settingsServer,
} from "../../types";
import { fromQRProps, toQRProps } from "../../utils/qr-transmogrify";

export interface QRCodeState {
  settings: QProps;
  loading: boolean;
  error: string | undefined;
}
const initialState: QRCodeState = {
  settings: {
    value: DefaultQRStyle.value,
    ecLevel: DefaultQRStyle.ecLevel,
    size: DefaultQRStyle.size,
    quietZone: DefaultQRStyle.quietZone,
    bgColor: DefaultQRStyle.bgColor,
    fgColor: DefaultQRStyle.fgColor,
    logoImage: DefaultQRStyle.logoImage,
    logoWidth: DefaultQRStyle.logoWidth,
    logoHeight: DefaultQRStyle.logoHeight,
    logoOpacity: DefaultQRStyle.logoOpacity,
    removeQrCodeBehindLogo: DefaultQRStyle.removeQrCodeBehindLogo,
    qrStyle: DefaultQRStyle.qrStyle,
    eyeColor: DefaultQRStyle.eyeColor,
    eyeRadius: DefaultQRStyle.eyeRadius,
    logoPadding: DefaultQRStyle.logoPadding,
    logoPaddingStyle: DefaultQRStyle.logoPaddingStyle,
    style: DefaultQRStyle.style,
    id: DefaultQRStyle.id,
    XParent: DefaultQRStyle.XParent,
    enableCORS: DefaultQRStyle.enableCORS,
    QRType: DefaultQRStyle.QRType,
  },
  loading: false,
  error: undefined,
};

export const fetchQrCodeSettings = createAsyncThunk(
  "qr/fetchQrSettings",
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "qr_settings" };
    if (username === "") {
      return DefaultQRStyle;
    }
    const session = fetch(`${settingsServer}user-data`, {
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
  }
);

export const saveQrCodeSettings = createAsyncThunk(
  "qr/saveQrSettings",
  async ({ username, settings }: { username: string; settings: QProps }) => {
    if (username === "") {
      return settings;
    }
    const props = fromQRProps(settings);
    console.log(`Props: ${props}`);
    const data = { username: username, settings: JSON.parse(props) };
    const s = JSON.stringify(data).length;
    console.log(`Data Size: ${s}`);
    const session = fetch(`${settingsServer}update-qr-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        return json.qrSettings;
      });
    return session;
  }
);

export const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState,
  reducers: {
    updateQRValue: (state, action: PayloadAction<string>) => {
      state.settings.value = action.payload;
    },
    updateECLevel: (state, action: PayloadAction<"L" | "M" | "Q" | "H">) => {
      state.settings.ecLevel = action.payload;
    },
    updateSize: (state, action: PayloadAction<number>) => {
      state.settings.size = action.payload;
    },
    updateQuietZone: (state, action: PayloadAction<number>) => {
      state.settings.quietZone = action.payload;
    },
    updateBgColor: (state, action: PayloadAction<string>) => {
      state.settings.bgColor = action.payload;
    },
    updateFgColor: (state, action: PayloadAction<string>) => {
      console.log(`updateFgColor: ${action.payload}`);
      state.settings.fgColor = action.payload;
    },
    updateLogoImage: (state, action: PayloadAction<string>) => {
      state.settings.logoImage = action.payload;
    },
    updateLogoWidth: (state, action: PayloadAction<number>) => {
      state.settings.logoWidth = action.payload;
    },
    updateLogoHeight: (state, action: PayloadAction<number>) => {
      state.settings.logoHeight = action.payload;
    },
    updateLogoOpacity: (state, action: PayloadAction<number>) => {
      state.settings.logoOpacity = action.payload;
    },
    updateRemoveQrCodeBehindLogo: (state, action: PayloadAction<boolean>) => {
      state.settings.removeQrCodeBehindLogo = action.payload;
    },
    updateQrStyle: (state, action: PayloadAction<"squares" | "dots">) => {
      state.settings.qrStyle = action.payload;
    },
    updateEyeColor: (state, action: PayloadAction<string>) => {
      state.settings.eyeColor = action.payload;
    },
    updateEyeRadius: (
      state,
      action: PayloadAction<[CornerRadii, CornerRadii, CornerRadii]>
    ) => {
      state.settings.eyeRadius = action.payload;
    },
    updateLogoPadding: (state, action: PayloadAction<number>) => {
      state.settings.logoPadding = action.payload;
    },
    updateLogoPaddingStyle: (
      state,
      action: PayloadAction<"square" | "circle" | undefined>
    ) => {
      state.settings.logoPaddingStyle = action.payload;
    },
    updateStyle: (
      state,
      action: PayloadAction<{ height: string; width: string }>
    ) => {
      state.settings.style = action.payload;
    },
    updateId: (state, action: PayloadAction<string>) => {
      state.settings.id = action.payload;
    },
    updateEnableCors: (state, action: PayloadAction<boolean>) => {
      state.settings.enableCORS = action.payload;
    },
    updateQRStyleSettings: (state, action: PayloadAction<QProps>) => {
      state.settings = action.payload;
    },
    updateQRType: (state, action: PayloadAction<"png" | "svg" | "jpg">) => {
      state.settings.QRType = action.payload;
    },
    updateXParent: (state, action: PayloadAction<boolean>) => {
      state.settings.XParent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQrCodeSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQrCodeSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = toQRProps(JSON.stringify(action.payload));
    });
    builder.addCase(fetchQrCodeSettings.rejected, (state, action) => {
      state.loading = false;
      state.settings = DefaultQRStyle;
      state.error = action.error.message as string | undefined;
    });
    builder.addCase(saveQrCodeSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveQrCodeSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(saveQrCodeSettings.rejected, (state, action) => {
      state.loading = false;
      state.settings = DefaultQRStyle;
      state.error = action.error.message as string | undefined;
    });
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
  updateQRType,
  updateXParent,
} = qrCodeSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.settings.

export default qrCodeSlice.reducer;
