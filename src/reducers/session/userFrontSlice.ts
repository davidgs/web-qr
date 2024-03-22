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
import { UserfrontProps, defaultUserFront } from '../../types';
import Userfront from '@userfront/toolkit';
export interface UserFrontState {
  settings: UserfrontProps;
  loading: boolean;
  error: string | undefined;
}
const initialState: UserFrontState = {
  settings: {
    mode: defaultUserFront.mode,
    userId: defaultUserFront.userId,
    userUuid: defaultUserFront.userUuid,
    username: defaultUserFront.username,
    email: defaultUserFront.email,
    name: defaultUserFront.name,
    image: defaultUserFront.image,
    phoneNumber: defaultUserFront.phoneNumber,
    data: defaultUserFront.data,
    locked: defaultUserFront.locked,
    isMfaRequired: defaultUserFront.isMfaRequired,
    preferredFirstFactor: defaultUserFront.preferredFirstFactor,
    preferredSecondFactor: defaultUserFront.preferredSecondFactor,
    isEmailConfirmed: defaultUserFront.isEmailConfirmed,
    isPhoneNumberConfirmed: defaultUserFront.isPhoneNumberConfirmed,
    lastActiveAt: defaultUserFront.lastActiveAt,
    createdAt: defaultUserFront.createdAt,
    updatedAt: defaultUserFront.updatedAt,
    tenant: defaultUserFront.tenant,
    authorization: defaultUserFront.authorization,
    tenantId: defaultUserFront.tenantId,
    isConfirmed: defaultUserFront.isConfirmed,
    uuid: defaultUserFront.uuid,
    authentication: defaultUserFront.authentication,
    chatHmac: defaultUserFront.chatHmac,
    requestParams: defaultUserFront.requestParams,
  },
  loading: false,
  error: undefined,

};


export const fetchUserfront = createAsyncThunk('userfront/fetchUserfront', async () => {
  Userfront.init("xbp876mb");
  const l = Userfront.getSession()
    .then((session) => {
      console.log(`Logged In: ${session.isLoggedIn}`);
      if (session.isLoggedIn) {
        const sesData = fetch("https://api.userfront.com/v0/self", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Userfront.tokens.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            return data as UserfrontProps;
          })
          .catch((err) => {
            console.error("getting userfront user error", err);
            return defaultUserFront;
          });
        return sesData;
      } else {
        return defaultUserFront;
      }
    });
  return l;
  // const session = fetch("https://api.userfront.com/v0/self", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${Userfront.tokens.accessToken}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("data", data);
  //     return data;
  //   })
  //   .catch((err) => {
  //     console.error("getting userfront user error", err);
  //     return null;
  //   });
  // return session;
});

export const userFrontSlice = createSlice({
  name: 'userFront',
  initialState,
  reducers: {
    updateUserFront: (state, action: PayloadAction<UserfrontProps>) => {
      state.settings = action.payload;
    },
    updateUserFrontId: (state, action: PayloadAction<number>) => {
      state.settings.userId = action.payload;
    },
    updateUserFrontUuid: (state, action: PayloadAction<string>) => {
      state.settings.userUuid = action.payload;
    },
    updateUserFrontUsername: (state, action: PayloadAction<string>) => {
      state.settings.username = action.payload;
    },
    updateUserFrontEmail: (state, action: PayloadAction<string>) => {
      state.settings.email = action.payload;
    },
    updateUserFrontName: (state, action: PayloadAction<string>) => {
      state.settings.name = action.payload;
    },
    updateUserFrontImage: (state, action: PayloadAction<string>) => {
      state.settings.image = action.payload;
    },
    updateUserFrontPhoneNumber: (state, action: PayloadAction<string>) => {
      state.settings.phoneNumber = action.payload;
    },
    updateUserFrontData: (state, action: PayloadAction<string>) => {
      state.settings.data = action.payload;
    },
    updateUserFrontLocked: (state, action: PayloadAction<boolean>) => {
      state.settings.locked = action.payload;
    },
    updateUserFrontIsMfaRequired: (state, action: PayloadAction<boolean>) => {
      state.settings.isMfaRequired = action.payload;
    },
    updateUserFrontPreferredFirstFactor: (state, action: PayloadAction<{ channel: string, strategy: string }>) => {
      state.settings.preferredFirstFactor = action.payload;
    },
    updateUserFrontPreferredSecondFactor: (state, action: PayloadAction<{ channel: string, strategy: string }>) => {
      state.settings.preferredSecondFactor = action.payload;
    },
    updateUserFrontIsEmailConfirmed: (state, action: PayloadAction<boolean>) => {
      state.settings.isEmailConfirmed = action.payload;
    },
    updateUserFrontIsPhoneNumberConfirmed: (state, action: PayloadAction<boolean>) => {
      state.settings.isPhoneNumberConfirmed = action.payload;
    },
    updateUserFrontLastActiveAt: (state, action: PayloadAction<string>) => {
      state.settings.lastActiveAt = action.payload;
    },
    updateUserFrontCreatedAt: (state, action: PayloadAction<string>) => {
      state.settings.createdAt = action.payload;
    },

    updateUserFrontUpdatedAt: (state, action: PayloadAction<string>) => {
      state.settings.updatedAt = action.payload;
    },
    updateUserFrontTenant: (state, action: PayloadAction<{
      tenantId: string;
      name: string;
      image: string;
      loginRedirectPath: string;
      logoutRedirectPath: string;
    }>) => {
      state.settings.tenant = action.payload;
    },
    updateUserFrontAuthorization: (state, action: PayloadAction<string>) => {
      state.settings.authorization = action.payload;
    },
    updateUserFrontTenantId: (state, action: PayloadAction<string>) => {
      state.settings.tenantId = action.payload;
    },
    updateUserFrontIsConfirmed: (state, action: PayloadAction<boolean>) => {
      state.settings.isConfirmed = action.payload;
    },
    // returnUserFront: (state) => {
    //   return state.settings as UserfrontProps;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserfront.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserfront.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload as UserfrontProps;
    });
    builder.addCase(fetchUserfront.rejected, (state, action) => {
      state.loading = false;
      state.settings = defaultUserFront;
      state.error = action.error.message as string | undefined;
    });
  }
});

export const {
  updateUserFront,
  updateUserFrontId,
  updateUserFrontUuid,
  updateUserFrontUsername,
  updateUserFrontEmail,
  updateUserFrontName,
  updateUserFrontImage,
  updateUserFrontPhoneNumber,
  updateUserFrontData,
  updateUserFrontLocked,
  updateUserFrontIsMfaRequired,
  updateUserFrontPreferredFirstFactor,
  updateUserFrontPreferredSecondFactor,
  updateUserFrontIsEmailConfirmed,
  updateUserFrontIsPhoneNumberConfirmed,
  updateUserFrontLastActiveAt,
  updateUserFrontCreatedAt,
  updateUserFrontUpdatedAt,
  updateUserFrontTenant,
  updateUserFrontAuthorization,
  updateUserFrontTenantId,
  updateUserFrontIsConfirmed,
} = userFrontSlice.actions;

export default userFrontSlice.reducer;