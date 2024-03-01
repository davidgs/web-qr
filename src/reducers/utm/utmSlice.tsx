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
import { defaultUTMParams } from '../../types';

const initialState = {
  settings: defaultUTMParams,
};

export const utmSlice = createSlice({
  name: "utmSlice",
  initialState,
  reducers: {
    // Campaign
    updateCampaignUseValue: (state, action) => {
      state.settings.utm_campaign.useValue = action.payload as boolean;
    },
    updateCampaignIsChooser: (state, action) => {
      state.settings.utm_campaign.isChooser = action.payload as boolean;
    },
    updateCampaignShowName: (state, action) => {
      state.settings.utm_campaign.showName = action.payload as boolean;
    },
    updateCampaignLabel: (state, action) => {
      state.settings.utm_campaign.label = action.payload as string;
    },
    updateCampaignTooltip: (state, action) => {
      state.settings.utm_campaign.tooltip = action.payload as string;
    },
    updateCampaignAriaLabel: (state, action) => {
      state.settings.utm_campaign.ariaLabel = action.payload as string;
    },
    updateCampaignError: (state, action) => {
      state.settings.utm_campaign.error = action.payload as string;
    },
    updateCampaignValue: (state, action) => {
      state.settings.utm_campaign.value = action.payload;
    },
    updateUTMCampaignSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_campaign = uSet;
    },
    // Content
    updateContentUseValue: (state, action) => {
      state.settings.utm_content.useValue = action.payload as boolean;
    },
    updateContentIsChooser: (state, action) => {
      state.settings.utm_content.isChooser = action.payload as boolean;
    },
    updateContentShowName: (state, action) => {
      state.settings.utm_content.showName = action.payload as boolean;
    },
    updateContentLabel: (state, action) => {
      state.settings.utm_content.label = action.payload as string;
    },
    updateContentTooltip: (state, action) => {
      state.settings.utm_content.tooltip = action.payload as string;
    },
    updateContentAriaLabel: (state, action) => {
      state.settings.utm_content.ariaLabel = action.payload as string;
    },
    updateContentError: (state, action) => {
      state.settings.utm_content.error = action.payload as string;
    },
    updateContentValue: (state, action) => {
      state.settings.utm_content.value = action.payload;
    },
    updateUTMContentSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_content = uSet;
    },
    // Keyword
    updateKeywordUseValue: (state, action) => {
      state.settings.utm_keyword.useValue = action.payload as boolean;
    },
    updateKeywordIsChooser: (state, action) => {
      state.settings.utm_keyword.isChooser = action.payload as boolean;
    },
    updateKeywordShowName: (state, action) => {
      state.settings.utm_keyword.showName = action.payload as boolean;
    },
    updateKeywordLabel: (state, action) => {
      state.settings.utm_keyword.label = action.payload as string;
    },
    updateKeywordTooltip: (state, action) => {
      state.settings.utm_keyword.tooltip = action.payload as string;
    },
    updateKeywordAriaLabel: (state, action) => {
      state.settings.utm_keyword.ariaLabel = action.payload as string;
    },
    updateKeywordError: (state, action) => {
      state.settings.utm_keyword.error = action.payload as string;
    },
    updateKeywordValue: (state, action) => {
      state.settings.utm_keyword.value = action.payload;
    },
    updateUTMKeywordSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_keyword = uSet;
    },
    // Medium
    updateMediumUseValue: (state, action) => {
      state.settings.utm_medium.useValue = action.payload as boolean;
    },
    updateMediumIsChooser: (state, action) => {
      state.settings.utm_medium.isChooser = action.payload as boolean;
    },
    updateMediumShowName: (state, action) => {
      state.settings.utm_medium.showName = action.payload as boolean;
    },
    updateMediumLabel: (state, action) => {
      state.settings.utm_medium.label = action.payload as string;
    },
    updateMediumTooltip: (state, action) => {
      state.settings.utm_medium.tooltip = action.payload as string;
    },
    updateMediumAriaLabel: (state, action) => {
      state.settings.utm_medium.ariaLabel = action.payload as string;
    },
    updateMediumError: (state, action) => {
      state.settings.utm_medium.error = action.payload as string;
    },
    updateMediumValue: (state, action) => {
      state.settings.utm_medium.value = action.payload;
    },
    updateUTMMediumSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_medium = uSet;
    },
    // Source
    updateSourceUseValue: (state, action) => {
      state.settings.utm_source.useValue = action.payload as boolean;
    },
    updateSourceIsChooser: (state, action) => {
      state.settings.utm_source.isChooser = action.payload as boolean;
    },
    updateSourceShowName: (state, action) => {
      state.settings.utm_source.showName = action.payload as boolean;
    },
    updateSourceLabel: (state, action) => {
      state.settings.utm_source.label = action.payload as string;
    },
    updateSourceTooltip: (state, action) => {
      state.settings.utm_source.tooltip = action.payload as string;
    },
    updateSourceAriaLabel: (state, action) => {
      state.settings.utm_source.ariaLabel = action.payload as string;
    },
    updateSourceError: (state, action) => {
      state.settings.utm_source.error = action.payload as string;
    },
    updateSourceValue: (state, action) => {
      state.settings.utm_source.value = action.payload;
    },
    updateUTMSourceSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_source = uSet;
    },
    // Target
    updateTargetUseValue: (state, action) => {
      state.settings.utm_target.useValue = action.payload as boolean;
    },
    updateTargetIsChooser: (state, action) => {
      state.settings.utm_target.isChooser = action.payload as boolean;
    },
    updateTargetShowName: (state, action) => {
      state.settings.utm_target.showName = action.payload as boolean;
    },
    updateTargetLabel: (state, action) => {
      state.settings.utm_target.label = action.payload as string;
    },
    updateTargetTooltip: (state, action) => {
      state.settings.utm_target.tooltip = action.payload as string;
    },
    updateTargetAriaLabel: (state, action) => {
      state.settings.utm_target.ariaLabel = action.payload as string;
    },
    updateTargetError: (state, action) => {
      state.settings.utm_target.error = action.payload as string;
    },
    updateTargetValue: (state, action) => {
      state.settings.utm_target.value = action.payload;
    },
    updateUTMTargetSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_target = uSet;
    },
    // Term
    updateTermUseValue: (state, action) => {
      state.settings.utm_term.useValue = action.payload as boolean;
    },
    updateTermIsChooser: (state, action) => {
      state.settings.utm_term.isChooser = action.payload as boolean;
    },
    updateTermShowName: (state, action) => {
      state.settings.utm_term.showName = action.payload as boolean;
    },
    updateTermLabel: (state, action) => {
      state.settings.utm_term.label = action.payload as string;
    },
    updateTermTooltip: (state, action) => {
      state.settings.utm_term.tooltip = action.payload as string;
    },
    updateTermAriaLabel: (state, action) => {
      state.settings.utm_term.ariaLabel = action.payload as string;
    },
    updateTermError: (state, action) => {
      state.settings.utm_term.error = action.payload as string;
    },
    updateTermValue: (state, action) => {
      state.settings.utm_term.value = action.payload;
    },
    updateUTMTermSettings: (state, action) => {
      const uSet = action.payload;
      state.settings.utm_term = uSet;
    },
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
