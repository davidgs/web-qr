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
import { configureStore } from '@reduxjs/toolkit';
import qrCodeReducer from '../reducers/qr/qrCodeSettingsSlice';
import utmTargetReducer from '../reducers/utm/utmTargetSlice';
import wifiReducer from '../reducers/wifi/wifiSlice';
import utmCampaignReducer from '../reducers/utm/utmCampaignSlice';
import utmMediumReducer from '../reducers/utm/utmMediumSlice';
import utmSourceReducer from '../reducers/utm/utmSourceSlice';
import utmTermReducer from '../reducers/utm/utmTermSlice';
import utmKeywordReducer from '../reducers/utm/utmKeywordSlice';
import utmContentReducer from '../reducers/utm/utmContentSlice';
import darkReducer from '../reducers/dark/darkSlice';
import historyReducer from '../reducers/history/historySlice';
import bitlyReducer from '../reducers/bitly/bitlySlice';
import mainReducer from '../reducers/main/mainSlice';
import qrReducer from '../reducers/qr/qrSlice';

export const mainStore = configureStore({
  reducer: {
    bitly: bitlyReducer,
    main: mainReducer,
    qr: qrReducer,
    qrCode: qrCodeReducer,
    utmTarget: utmTargetReducer,
    utmCampaign: utmCampaignReducer,
    utmMedium: utmMediumReducer,
    utmSource: utmSourceReducer,
    utmTerm: utmTermReducer,
    utmKeyword: utmKeywordReducer,
    utmContent: utmContentReducer,
    wifi: wifiReducer,
    dark: darkReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof mainStore.getState>;
