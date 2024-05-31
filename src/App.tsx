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
import { useEffect, useState } from "react";
import "./css/App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { RootState } from "./stores/store";
import { fetchMain } from "./reducers/main/mainSlice";
import SideNav from "./SideNav";
import { DeviceUUID } from "device-uuid";
import { fetchBitly } from "./reducers/bitly/bitlySlice";
import { fetchUtm } from "./reducers/utm/utmSlice";
import "./css/sidebar.css";
import { fetchUserfront } from "./reducers/session/userFrontSlice";
import store from "store2";
import { checkLogin } from "./utils/dataFetchers";
import { setLogin } from "./reducers/session/loginSlice";
import { fetchQrCodeSettings } from "./reducers/qr/qrCodeSettingsSlice";
import { fetchUser } from "./reducers/user/userSlice";
import { fetchLicense, updateLicense } from "./reducers/licensing/licenseSlice";
import { settingsServer, License, LicenseProps } from "./types";
import ErrorPop from "./components/ErrorPop";
// import { License, checkLicense } from "./utils/license-checks";

export async function loader() {
  const isLogged = (await checkLogin()) as boolean;
  return isLogged;
}

export default function App() {
  const dispatch = useAppDispatch();
  const userfront = useAppSelector(
    (state: RootState) => state.userFront.settings
  );
  const ufError = useAppSelector((state: RootState) => state.userFront.error);
  const main = useAppSelector((state: RootState) => state.main.settings);
  const mainError = useAppSelector((state: RootState) => state.main.error);
  const darkClass = main.dark ? "header-stuff-dark" : "header-stuff";
  const version = "1.1.0";
  const isLogged = useLoaderData() as boolean;
  const license = useAppSelector((state: RootState) => state.license);
  const licenseError = useAppSelector((state: RootState) => state.license.error);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  useEffect(() => {
    if (userfront.username !== "") {
      dispatch(fetchUser({ username: userfront.username }) as any);
      dispatch(fetchLicense({ username: userfront.username }) as any);
      dispatch(fetchBitly({ username: userfront.username }) as any);
      dispatch(fetchMain({ username: userfront.username }) as any);
      dispatch(fetchUtm({ username: userfront.username }) as any);
      dispatch(fetchQrCodeSettings({ username: userfront.username }) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userfront]);

  useEffect(() => {
    if (ufError !== "" && ufError !== undefined) {
      console.log("ufError: ", ufError);
      setErrorMessage(ufError);
    }
    if (mainError !== "" && mainError !== undefined) {
      console.log("mainError: ", mainError);
      setErrorMessage(mainError);
    }
    if (licenseError !== undefined && licenseError !== "") {
      console.log("licenseError: ", licenseError);
      setErrorMessage(licenseError);
    }
  }, [ufError, mainError, licenseError]);
  /*
  "data": {
          "type": "machines",
          "attributes": {
            "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
            "platform": "macOS",
            "name": "Office MacBook Pro"
          },
          "relationships": {
            "license": {
              "data": {
                "type": "licenses",
                "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
              }
            }
          }
        }
        */
  async function validateLicense() {
    const dud = new DeviceUUID().parse();
    const uuid = new DeviceUUID().get();
    console.log("uuid: ", uuid);
    const fingerprint = uuid
      .replace(/-/gi, "")
      .replace(/(.{2})/g, "$1:")
      .slice(0, -1);
    console.log("fingerprint: ", fingerprint);
    const licenseData: License = {
      username: userfront.username,
      license: license.settings.license_key,
      fingerprint: fingerprint,
      platform: dud.os,
      name: dud.platform,
      id: license.settings.cust_id,
    };
    if (license.settings.license_key === "") {
      return;
    }
    const licStatus = await fetch(`${settingsServer}verify-license`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(licenseData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("license response: ", response);
        return response;
      })
      .catch((error) => console.error("license error: ", error));
    /*
    license_id: found.data.id,
      licence_user: found.data.relationships.user.data.id,
      license_type: policies.find(
    (p) => p.key === found.data.relationships.policy.data.id).value,
      license_status: found.data.attributes.status,
      machine_fingerprint: found.data.attributes.fingerprint,
      */
    if (licStatus) {
      // check that we have the right license
      if (licStatus.license_key !== license.settings.license_key) {
        console.log("License key mismatch");
        return;
      }
      if (licStatus.license_type !== license.settings.license_type) {
        console.log("License type mismatch");
        return;
      }
      const lstat = licStatus?.license_status?.toLowerCase();
      const llstat = license?.settings?.license_status?.toLowerCase();
      if (
        lstat !==
        llstat
      ) {
        console.log("License status mismatch");
        return;
      }
    }
    console.log("Response: ", licStatus);
    const ll: LicenseProps = { ...license.settings };
    ll.license_type = licStatus.license_type;
    ll.license_status = licStatus.license_status;
    dispatch(updateLicense(ll));
    // const lic = await checkLicense(licenseData);
    // const response = await fetch(
    //   `https://api.keygen.sh/v1/accounts/${license.settings.cust_id}/licenses/actions/validate-key`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/vnd.api+json",
    //       Accept: "application/vnd.api+json",
    //     },
    //     body: JSON.stringify({
    //       meta: {
    //         key: license.settings.license_key,
    //         scope: {
    //           fingerprint: fingerprint,
    //         },
    //       },
    //     }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("license response: ", data);
    //     return data;
    //   })
    //   .catch((error) => console.error("license error: ", error));
    // console.log("Response: ", response);

    // if (response.meta) {
    //   if (response.meta.valid === false && (response.meta.code === "NO_MACHINES" || response.meta.code === "FINGERPRINT_SCOPE_MISMATCH")) {
    //   // Check out a license
    //   console.log("No machines assigned");
    //   const licResp = await fetch(`${settingsServer}fetchMachine`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: userfront.username,
    //       license: license.settings.license_key,
    //       id: response.data.id,
    //       fingerprint: fingerprint,
    //       platform: dud.os,
    //       name: dud.platform,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("machine response: ", data);
    //       return data;
    //     })
    //     .catch((error) => console.error("license error: ", error));
    //   // const { meta, data, errors } = await response.json();
    // } else if (response.meta.valid) {
    //   console.log("License is valid, machine assigned");
    //   }
    // }
  }

  useEffect(() => {
    if (license.settings.license_key !== "") {
      validateLicense();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //

  /**
   * update dark colors
   * @param dark
   */
  useEffect(() => {
    store.set("dark", main.dark);
    main.dark
      ? window.document
          .getElementsByTagName("html")[0]
          .setAttribute("data-bs-theme", "dark")
      : window.document
          .getElementsByTagName("html")[0]
          .setAttribute("data-bs-theme", "light");
  }, [main]);

  /**
   * get the userfront session
   * if the user is logged in, get the user data
   */
  useEffect(() => {
    console.log("App.tsx: isLoggedIn", isLogged as boolean);
    dispatch(setLogin(isLogged as boolean));
    if (isLogged) {
      dispatch(fetchUserfront() as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SideNav />
      <p></p>
      <div className={`${darkClass} version-div`}>
        <em>qr-builder v{version}</em>
      </div>
      <ErrorPop errorMsg={errorMessage} duration={99} />
      <Outlet />
    </>
  );
}
