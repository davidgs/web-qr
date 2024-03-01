/* eslint-disable react/jsx-no-useless-fragment */
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
import { InputGroup } from "react-bootstrap";
import { useEffect } from "react";
import { makeLongLink } from "../src/utils/LongLink";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/stores/store";
import { updateQRValue } from "../src/reducers/qr/qrCodeSettingsSlice";
import { setActiveLink } from "../src/reducers/history/historySlice";
import UTMTextField from "../src/components/UTMTextField";
import UTMChoice from "../src/components/choosers/UTMChoice";

export default function MobileURLForm() {
  const dispatch = useDispatch();
  const mainConfig = useSelector((state: RootState) => state.main.settings);
  const utmTarget = useSelector(
    (state: RootState) => state.utmConfigs.settings.utm_target
  );
  const utmCampaign = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_campaign
  );
  const utmSource = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_source
  );
  const utmMedium = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_medium
  );
  const utmTerm = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_term
  );
  const utmContent = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_content
  );
  const activeLink = useSelector(
    (state: RootState) => state.history.activeLink
  );
  const utmKeyword = useSelector(
    (state: RootState) => state.utmConfigs?.settings.utm_keyword
  );
  dispatch(
    updateQRValue(
      activeLink?.short_link ? activeLink?.short_link : makeLongLink(activeLink)
    )
  );

  useEffect(() => {
    if (mainConfig?.formType === "simple") {
      dispatch(
        setActiveLink({
          ...activeLink,
          utm_target: "",
          utm_campaign: undefined,
          utm_source: undefined,
          utm_medium: undefined,
          utm_term: undefined,
          utm_content: undefined,
          utm_keyword: undefined,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainConfig.formType]);

  const linkPartChanged = (value: string, type: string) => {
    switch (type) {
      case "utm_target":
        dispatch(setActiveLink({ ...activeLink, utm_target: value as string }));
        break;
      case "utm_campaign":
        dispatch(
          setActiveLink({ ...activeLink, utm_campaign: value as string })
        );
        break;
      case "utm_source":
        dispatch(setActiveLink({ ...activeLink, utm_source: value as string }));
        break;
      case "utm_medium":
        dispatch(setActiveLink({ ...activeLink, utm_medium: value as string }));
        break;
      case "utm_term":
        dispatch(setActiveLink({ ...activeLink, utm_term: value as string }));
        break;
      case "utm_content":
        dispatch(
          setActiveLink({ ...activeLink, utm_content: value as string })
        );
        break;
      case "utm_keyword":
        dispatch(
          setActiveLink({ ...activeLink, utm_keyword: value as string })
        );
        break;
      default:
        break;
    }
    dispatch(updateQRValue(makeLongLink(activeLink)));
  };

  return (
    <>
      {/* utm_target */}
      <InputGroup size="lg">
        <UTMTextField
          valueChanged={linkPartChanged}
          targetType="utm_target"
          value={
            activeLink?.utm_target &&
            activeLink?.utm_target !== "https://www.example.com/"
              ? activeLink?.utm_target
              : ""
          }
          settings={utmTarget}
        />
      </InputGroup>
      {/* </Row> */}
      {/* utm_source & utm_medium */}
      {mainConfig.formType === "encoded" && (
        <>
          {utmSource?.useValue && (
            <>
              {utmSource?.isChooser ? (
                <InputGroup size="lg">
                  <UTMChoice
                    valueChanged={linkPartChanged}
                    targetType="utm_source"
                    settings={utmSource}
                  />
                </InputGroup>
              ) : (
                <InputGroup size="lg">
                  <UTMTextField
                    valueChanged={linkPartChanged}
                    targetType="utm_source"
                    value={activeLink?.utm_source ? activeLink?.utm_source : ""}
                    settings={utmSource}
                  />
                </InputGroup>
              )}
            </>
          )}
          {/* utm_medium */}
          {utmMedium?.useValue && (
            <>
              <InputGroup size="lg">
                {utmMedium.isChooser ? (
                  <UTMChoice
                    valueChanged={linkPartChanged}
                    targetType="utm_medium"
                    settings={utmMedium}
                  />
                ) : (
                  <UTMTextField
                    valueChanged={linkPartChanged}
                    targetType="utm_medium"
                    value={activeLink?.utm_medium ? activeLink?.utm_medium : ""}
                    settings={utmMedium}
                  />
                )}
              </InputGroup>
            </>
          )}
          {/* utm_campaign */}
          {utmCampaign?.useValue && (
            <>
              {utmCampaign?.isChooser ? (
                <UTMChoice
                  valueChanged={linkPartChanged}
                  targetType="utm_campaign"
                  settings={utmCampaign}
                />
              ) : (
                <UTMTextField
                  valueChanged={linkPartChanged}
                  targetType="utm_campaign"
                  value={
                    activeLink?.utm_campaign ? activeLink?.utm_campaign : ""
                  }
                  settings={utmCampaign}
                />
              )}
            </>
          )}
          {/* utm_term */}
          {utmTerm?.useValue && (
            <>
              {utmTerm?.isChooser ? (
                <UTMChoice
                  valueChanged={linkPartChanged}
                  targetType="utm_term"
                  settings={utmTerm}
                />
              ) : (
                <UTMTextField
                  valueChanged={linkPartChanged}
                  targetType="utm_term"
                  value={activeLink?.utm_term ? activeLink?.utm_term : ""}
                  settings={utmTerm}
                />
              )}
            </>
          )}
          {/*  utm_content, utm_keyword */}
          {/* utm_content */}
          {utmContent?.useValue && (
            <>
              {utmContent?.isChooser ? (
                <UTMChoice
                  valueChanged={linkPartChanged}
                  targetType="utm_content"
                  settings={utmContent}
                />
              ) : (
                <UTMTextField
                  valueChanged={linkPartChanged}
                  targetType="utm_content"
                  value={activeLink?.utm_content ? activeLink?.utm_content : ""}
                  settings={utmContent}
                />
              )}
            </>
          )}
          {/* utm_keyword */}
          {utmKeyword?.useValue && (
            <>
              {utmKeyword?.isChooser ? (
                <UTMChoice
                  valueChanged={linkPartChanged}
                  targetType="utm_keyword"
                  settings={utmKeyword}
                />
              ) : (
                <UTMTextField
                  valueChanged={linkPartChanged}
                  targetType="utm_keyword"
                  value={activeLink?.utm_keyword ? activeLink?.utm_keyword : ""}
                  settings={utmKeyword}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
