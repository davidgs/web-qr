import { useSelector } from "react-redux";
import LinkToolbar from "../components/LinkToolbar";
import MobileLinkToolbar from "../components/MobileLinkToolbar";
import MobileQCode from "../forms/MobileQRCodeForm";
import MobileURLForm from "../forms/MobileURLForm";
import QCode from "../forms/QRCodeForm";
import URLForm from "../forms/URLForm";
import WifiForm from "../forms/WiFiForm";
import { RootState } from "../stores/store";

export default function MainPage()  {

    const mainSet = useSelector((state: RootState) => state.main.settings);

  return (
    <>
      <div className={`main-column-${mainSet.sidebar}`}>
        <div className="link-form">
          {mainSet.sidebar !== "top" ? <QCode /> : <MobileQCode />}
          <hr />
          {mainSet.sidebar !== "top" ? <LinkToolbar /> : <MobileLinkToolbar />}
          <hr />
          {mainSet.formType === "wifi" && <WifiForm />}
          {mainSet.sidebar !== "top" ? <URLForm /> : <MobileURLForm />}
        </div>
      </div>
      {/* W: {width} x H: {size.height} */}
      {/* <Analytics /> */}
    </>
  );
}
