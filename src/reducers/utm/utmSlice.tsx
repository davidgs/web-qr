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
import { UtmKeyValue, UtmObj, UtmParams, defaultUTMParams, settingsServer } from "../../types";

interface UtmState {
  settings: UtmParams;
  loading: boolean;
  error: string | undefined;
}
const initialState: UtmState = {
  settings: {
    utm_campaign: defaultUTMParams.utm_campaign,
    utm_content: defaultUTMParams.utm_content,
    utm_keyword: defaultUTMParams.utm_keyword,
    utm_medium: defaultUTMParams.utm_medium,
    utm_source: defaultUTMParams.utm_source,
    utm_target: defaultUTMParams.utm_target,
    utm_term: defaultUTMParams.utm_term,
  },
  loading: false,
  error: undefined,
};

export const fetchUtm = createAsyncThunk(
  "utm/fetchUtm",
  async ({ username }: { username: string }) => {
    const data = { username: username, data_fetch: "utm_settings" };
    if (username === "") {
      return defaultUTMParams as UtmParams;
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

export const saveUtm = createAsyncThunk(
  "utm/saveUtm",
  async ({ username, settings }: { username: string; settings: UtmParams }) => {
    const dataObj = { username: username, settings: settings };
    const session = fetch(`${settingsServer}update-utm-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return session;
  }
);

export const utmSlice = createSlice({
  name: "utmSlice",
  initialState,
  reducers: {
    // Campaign
    updateCampaignUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_campaign.use_value = action.payload as boolean;
    },
    updateCampaignIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_campaign.is_chooser = action.payload as boolean;
    },
    updateCampaignShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_campaign.show_name = action.payload as boolean;
    },
    updateCampaignLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_campaign.label = action.payload as string;
    },
    updateCampaignTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_campaign.tooltip = action.payload as string;
    },
    updateCampaignAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_campaign.aria_label = action.payload as string;
    },
    updateCampaignError: (state, action: PayloadAction<string>) => {
      state.settings.utm_campaign.error = action.payload as string;
    },
    updateCampaignValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_campaign.value = action.payload;
    },
    updateUTMCampaignSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_campaign = action.payload;
    },
    // Content
    updateContentUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_content.use_value = action.payload as boolean;
    },
    updateContentIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_content.is_chooser = action.payload as boolean;
    },
    updateContentShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_content.show_name = action.payload as boolean;
    },
    updateContentLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_content.label = action.payload as string;
    },
    updateContentTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_content.tooltip = action.payload as string;
    },
    updateContentAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_content.aria_label = action.payload as string;
    },
    updateContentError: (state, action: PayloadAction<string>) => {
      state.settings.utm_content.error = action.payload as string;
    },
    updateContentValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_content.value = action.payload;
    },
    updateUTMContentSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_content = action.payload;
    },
    // Keyword
    updateKeywordUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_keyword.use_value = action.payload as boolean;
    },
    updateKeywordIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_keyword.is_chooser = action.payload as boolean;
    },
    updateKeywordShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_keyword.show_name = action.payload as boolean;
    },
    updateKeywordLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_keyword.label = action.payload as string;
    },
    updateKeywordTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_keyword.tooltip = action.payload as string;
    },
    updateKeywordAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_keyword.aria_label = action.payload as string;
    },
    updateKeywordError: (state, action: PayloadAction<string>) => {
      state.settings.utm_keyword.error = action.payload as string;
    },
    updateKeywordValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_keyword.value = action.payload;
    },
    updateUTMKeywordSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_keyword = action.payload;
    },
    // Medium
    updateMediumUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_medium.use_value = action.payload as boolean;
    },
    updateMediumIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_medium.is_chooser = action.payload as boolean;
    },
    updateMediumShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_medium.show_name = action.payload as boolean;
    },
    updateMediumLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_medium.label = action.payload as string;
    },
    updateMediumTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_medium.tooltip = action.payload as string;
    },
    updateMediumAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_medium.aria_label = action.payload as string;
    },
    updateMediumError: (state, action: PayloadAction<string>) => {
      state.settings.utm_medium.error = action.payload as string;
    },
    updateMediumValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_medium.value = action.payload;
    },
    updateUTMMediumSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_medium = action.payload;
    },
    // Source
    updateSourceUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_source.use_value = action.payload as boolean;
    },
    updateSourceIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_source.is_chooser = action.payload as boolean;
    },
    updateSourceShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_source.show_name = action.payload as boolean;
    },
    updateSourceLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_source.label = action.payload as string;
    },
    updateSourceTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_source.tooltip = action.payload as string;
    },
    updateSourceAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_source.aria_label = action.payload as string;
    },
    updateSourceError: (state, action: PayloadAction<string>) => {
      state.settings.utm_source.error = action.payload as string;
    },
    updateSourceValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_source.value = action.payload;
    },
    updateUTMSourceSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_source = action.payload;
    },
    // Target
    updateTargetUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_target.use_value = action.payload as boolean;
    },
    updateTargetIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_target.is_chooser = action.payload as boolean;
    },
    updateTargetShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_target.show_name = action.payload as boolean;
    },
    updateTargetLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_target.label = action.payload as string;
    },
    updateTargetTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_target.tooltip = action.payload as string;
    },
    updateTargetAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_target.aria_label = action.payload as string;
    },
    updateTargetError: (state, action: PayloadAction<string>) => {
      state.settings.utm_target.error = action.payload as string;
    },
    updateTargetValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_target.value = action.payload;
    },
    updateUTMTargetSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_target = action.payload;
    },
    // Term
    updateTermUseValue: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_term.use_value = action.payload as boolean;
    },
    updateTermIsChooser: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_term.is_chooser = action.payload as boolean;
    },
    updateTermShowName: (state, action: PayloadAction<boolean>) => {
      state.settings.utm_term.show_name = action.payload as boolean;
    },
    updateTermLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_term.label = action.payload as string;
    },
    updateTermTooltip: (state, action: PayloadAction<string>) => {
      state.settings.utm_term.tooltip = action.payload as string;
    },
    updateTermAriaLabel: (state, action: PayloadAction<string>) => {
      state.settings.utm_term.aria_label = action.payload as string;
    },
    updateTermError: (state, action: PayloadAction<string>) => {
      state.settings.utm_term.error = action.payload as string;
    },
    updateTermValue: (state, action: PayloadAction<UtmKeyValue[]>) => {
      state.settings.utm_term.value = action.payload;
    },
    updateUTMTermSettings: (state, action: PayloadAction<UtmObj>) => {
      state.settings.utm_term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUtm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUtm.fulfilled, (state, action) => {
      state.loading = false;
      state.settings.utm_campaign = action.payload.utm_campaign as UtmObj;
      state.settings.utm_content = action.payload.utm_content as UtmObj;
      state.settings.utm_keyword = action.payload.utm_keyword as UtmObj;
      state.settings.utm_medium = action.payload.utm_medium as UtmObj;
      state.settings.utm_source = action.payload.utm_source as UtmObj;
      state.settings.utm_target = action.payload.utm_target as UtmObj;
      state.settings.utm_term = action.payload.utm_term as UtmObj;
      state.error = undefined;
    });
    builder.addCase(fetchUtm.rejected, (state, action) => {
      state.loading = false;
      state.settings = defaultUTMParams;
      state.error = action.error.message;
    });
    builder.addCase(saveUtm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveUtm.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as UtmParams;
      state.error = undefined;
    });
    builder.addCase(saveUtm.rejected, (state, action) => {
      state.loading = false;
      state.settings = defaultUTMParams;
      state.error = action.error.message;
    });
  },
});

export const {
  updateCampaignTooltip,
  updateCampaignAriaLabel,
  updateCampaignError,
  updateCampaignIsChooser,
  updateCampaignLabel,
  updateCampaignShowName,
  updateCampaignUseValue,
  updateCampaignValue,
  updateUTMCampaignSettings,
  updateContentAriaLabel,
  updateContentError,
  updateContentIsChooser,
  updateContentLabel,
  updateContentShowName,
  updateContentTooltip,
  updateContentUseValue,
  updateContentValue,
  updateUTMContentSettings,
  updateKeywordAriaLabel,
  updateKeywordError,
  updateKeywordIsChooser,
  updateKeywordLabel,
  updateKeywordShowName,
  updateKeywordTooltip,
  updateKeywordUseValue,
  updateKeywordValue,
  updateUTMKeywordSettings,
  updateMediumAriaLabel,
  updateMediumError,
  updateMediumIsChooser,
  updateMediumLabel,
  updateMediumShowName,
  updateMediumTooltip,
  updateMediumUseValue,
  updateMediumValue,
  updateUTMMediumSettings,
  updateSourceAriaLabel,
  updateSourceError,
  updateSourceIsChooser,
  updateSourceLabel,
  updateSourceShowName,
  updateSourceTooltip,
  updateSourceUseValue,
  updateSourceValue,
  updateUTMSourceSettings,
  updateTargetAriaLabel,
  updateTargetError,
  updateTargetIsChooser,
  updateTargetLabel,
  updateTargetShowName,
  updateTargetTooltip,
  updateTargetUseValue,
  updateTargetValue,
  updateUTMTargetSettings,
  updateTermAriaLabel,
  updateTermError,
  updateTermIsChooser,
  updateTermLabel,
  updateTermShowName,
  updateTermTooltip,
  updateTermUseValue,
  updateTermValue,
  updateUTMTermSettings,
} = utmSlice.actions;

export default utmSlice.reducer;
