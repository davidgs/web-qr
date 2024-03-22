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
import { Provider } from "react-redux";
import App from "./App";
import { mainStore } from "./stores/store";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Account from "./pages/Account";
import BuyPage from "./pages/BuyPage";
import ConfigPage from "./pages/ConfigPage";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import Privacy from "./pages/Privacy";
import RegisterPage from "./pages/RegisterPage";
import TermsOfService from "./pages/TermsOfService";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./ErrorPage";
import { loader as rootLoader } from "./App";
import FAQPage from "./pages/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "build",
        element: <MainPage />,
      },
      {
        path: "buy",
        element: <BuyPage />,
      },
      {
        path: "config",
        element: <ConfigPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "tos",
        element: <TermsOfService />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
    ],
    //   {
    //     path: "contacts/:contactId",
    //     element: <Contact />,
    //   },
    // ],
  },
]);
const root = document.getElementById("root");
if (!root) throw new Error("No root element found");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={mainStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
