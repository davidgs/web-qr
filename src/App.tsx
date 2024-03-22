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
import { useDispatch } from "react-redux";
import { Outlet, useLoaderData } from "react-router-dom";
import { useAppSelector } from "./stores/hooks";
import { RootState } from "./stores/store";
import { fetchMain } from "./reducers/main/mainSlice";
import SideNav from "./SideNav";
import { DeviceUUID } from "device-uuid";
import { fetchBitly } from "./reducers/bitly/bitlySlice";
import { fetchUtm } from "./reducers/utm/utmSlice";
import "./css/sidebar.css";
import axios from "axios";
import {
  fetchUserfront,
} from "./reducers/session/userFrontSlice";
import store from "store2";
import { checkLogin } from "./utils/dataFetchers";
import { setLogin } from "./reducers/session/loginSlice";
import { fetchQrCodeSettings } from "./reducers/qr/qrCodeSettingsSlice";

export async function loader() {
  const isLogged = await checkLogin();
  console.log(`loader() isLogged`, isLogged);
  return { isLogged };
}

export default function App() {
  const dispatch = useDispatch();
  const userfront = useAppSelector(
    (state: RootState) => state.userFront.settings
  );
  const main = useAppSelector((state: RootState) => state.main.settings);
  const bitly = useAppSelector((state: RootState) => state.bitly);
  const darkClass = main.dark ? "header-stuff-dark" : "header-stuff";
  const version = "1.1.0";
  const db_url = "http://localhost:4242/user-data";
  const isLogged = useLoaderData() as boolean;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(bitly.loading);
    setError(bitly.error);
    if(userfront.username !== "") {
      console.log("fetching bitly...");
      dispatch(fetchBitly({ username: userfront.username }) as any);
      console.log("fetching main...");
      dispatch(fetchMain({ username: userfront.username }) as any);
      console.log("fetching UTM Settings...");
      dispatch(fetchUtm({ username: userfront.username }) as any);
      console.log("Fetching QR Code Settings ...");
      dispatch(fetchQrCodeSettings({ username: userfront.username }) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userfront]);

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
   *
   * @param session
   * create a new account in the database
   *
   */
  async function createAccount(session: any) {
    console.log("Creating account for ", session.customer_details.name);
    console.log(`session: ${session.customer}`);
    const create_url = "http://localhost:4242/create-user";
    axios
      .post(create_url, session)
      .then((response) => {
        console.log("User added to database", response);
      })
      .catch((error: Error) => {
        console.error("User not added to database", error);
      });

    axios
      .post(db_url, session)
      .then((response) => {
        console.log("User created", response);
      })
      .catch((error: Error) => {
        console.error("Error creating user", error);
      });
  }

  /**
   * get the userfront session
   * if the user is logged in, get the user data
   */
  useEffect(() => {
    const deviceUUID = new DeviceUUID().get();
    const did = new DeviceUUID().parse();
    console.log(`did`, did);
    console.log("deviceUUID", deviceUUID);
    console.log("isLoggedIn", isLogged);
    dispatch(setLogin(isLogged));
    if(isLogged) {
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
      <Outlet />
    </>
  );
}
