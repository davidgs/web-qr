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
import { makeLongLink } from "../utils/LongLink";
import { useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { updateQRValue } from "../reducers/qr/qrCodeSettingsSlice";
import { setActiveLink } from "../reducers/history/historySlice";
import UTMTextField from "../components/UTMTextField";
import UTMChoice from "../components/choosers/UTMChoice";
import "../css/URLForm.css";
import { useAppSelector } from "../stores/hooks";

export default function URLForm() {
  const dispatch = useDispatch();
  const mainConfig = useAppSelector((state: RootState) => state.main.settings);
  const utmTarget = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_target
  );
  const utmCampaign = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_campaign
  );
  const utmSource = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_source
  );
  const utmMedium = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_medium
  );
  const utmTerm = useAppSelector((state: RootState) => state.utmConfigs.settings.utm_term);
  const utmContent = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_content
  );
  const activeLink = useAppSelector(
    (state: RootState) => state.history.activeLink
  );
  const utmKeyword = useAppSelector(
    (state: RootState) => state.utmConfigs.settings.utm_keyword
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

  /**
   *
   * @param value The new value
   * @param type  The type of value (utm_target, etc.)
   */
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
      <div className="fullrow">
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
      </div>
      {mainConfig.formType === "simple" && (
        <div className="fullrow">
          <p></p>
        </div>
      )}
      {/* </Row> */}
      {/* utm_source & utm_medium */}
      {mainConfig.formType === "encoded" && (
        <div className="fullrow">
          {/* utm_source */}
          {utmSource?.use_value ? (
            <div className={utmMedium?.use_value ? "col50" : "col100"}>
              {utmSource?.is_chooser ? (
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
            </div>
          ) : (
            <></>
          )}
          {/* utm_medium */}
          {utmMedium?.use_value ? (
            <div className={utmSource?.use_value ? "col50" : "col100"}>
              <InputGroup size="lg">
                {utmMedium.is_chooser ? (
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
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      {/*  utm_term, utm_campaign */}
      {mainConfig?.formType === "encoded" && (
        <div className="fullrow">
          {/* utm_campaign */}
          {utmCampaign?.use_value ? (
            <div className={utmTerm?.use_value ? "col50" : "col100"}>
              <InputGroup size="lg">
                {utmCampaign?.is_chooser ? (
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
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
          {/* utm_term */}
          {utmTerm?.use_value ? (
            <div className={utmCampaign?.use_value ? "col50" : "col100"}>
              <InputGroup size="lg">
                {utmTerm?.is_chooser ? (
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
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      {/*  utm_content, utm_keyword */}
      {mainConfig?.formType === "encoded" && (
        <div className="fullrow">
          {/* utm_content */}
          {utmContent?.use_value ? (
            <div className={utmKeyword?.use_value ? "col50" : "col100"}>
              <InputGroup size="lg">
                {utmContent?.is_chooser ? (
                  <UTMChoice
                    valueChanged={linkPartChanged}
                    targetType="utm_content"
                    settings={utmContent}
                  />
                ) : (
                  <UTMTextField
                    valueChanged={linkPartChanged}
                    targetType="utm_content"
                    value={
                      activeLink?.utm_content ? activeLink?.utm_content : ""
                    }
                    settings={utmContent}
                  />
                )}
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
          {/* utm_keyword */}
          {utmKeyword?.use_value ? (
            <div className={utmContent?.use_value ? "col50" : "col100"}>
              <InputGroup size="lg">
                {utmKeyword?.is_chooser ? (
                  <UTMChoice
                    valueChanged={linkPartChanged}
                    targetType="utm_keyword"
                    settings={utmKeyword}
                  />
                ) : (
                  <UTMTextField
                    valueChanged={linkPartChanged}
                    targetType="utm_keyword"
                    value={
                      activeLink?.utm_keyword ? activeLink?.utm_keyword : ""
                    }
                    settings={utmKeyword}
                  />
                )}
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
