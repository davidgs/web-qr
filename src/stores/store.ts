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
import wifiReducer from '../reducers/wifi/wifiSlice';
import utmReducer from '../reducers/utm/utmSlice';
import historyReducer from '../reducers/history/historySlice';
import bitlyReducer from '../reducers/bitly/bitlySlice';
import mainReducer from '../reducers/main/mainSlice';
import sessionReducer from '../reducers/session/sessionSlice';
import loginReducer from '../reducers/session/loginSlice';
import userFrontReducer from '../reducers/session/userFrontSlice';
import userReducer from '../reducers/user/userSlice';
import licenseReducer from '../reducers/licensing/licenseSlice';

export const mainStore = configureStore({
  reducer: {
    bitly: bitlyReducer,
    main: mainReducer,
    qrCode: qrCodeReducer,
    utmConfigs: utmReducer,
    wifi: wifiReducer,
    history: historyReducer,
    session: sessionReducer,
    login: loginReducer,
    userFront: userFrontReducer,
    userSettings: userReducer,
    license: licenseReducer,
  },
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
