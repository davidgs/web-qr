import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import store from "store2";
import { RootState } from "../../stores/store";
import { updateFormType } from "../../reducers/main/mainSlice";
import { useAppSelector } from "../../stores/hooks";

export default function FormChooser(): React.JSX.Element {
  const dispatch = useDispatch();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const mainSet = useAppSelector((state: RootState) => state.main.settings);

  /**
   *
   * @param value the value of the form type
   */
  const saveFormType = (value: string) => {
    const ms = { ...mainSet };
    ms.formType = value as "simple" | "encoded" | "wifi";
    dispatch(updateFormType(value as "simple" | "encoded" | "wifi"));
    store.set("main-config", ms);
  };

  return (
    <div className="fullrow">
      <div className="chooser-label">
        <Form.Label className={darkClass}>Link Type</Form.Label>
      </div>
      <div className="chooser-column">
        <Form.Select
          className={darkClass}
          size="sm"
          required
          aria-label="What kind of link do you want to make?"
          id="link-type"
          disabled={false}
          onChange={(e) => {
            if (e.target.value === "Choose one ...") {
              // returnVal('');
              return;
            }
            saveFormType(e.target.value);
          }}
          style={{ paddingTop: "-5px" }}
          value={mainSet?.formType}
        >
          <option key="none" value="Choose one ...">
            Choose One ...
          </option>
          <option key="simple" value="simple">
            Simple Link
          </option>
          <option key="encoded" value="encoded">
            Trackable Link
          </option>
          <option key="wifi" value="wifi">
            WiFi QR Code
          </option>
        </Form.Select>
      </div>
    </div>
  );
}
