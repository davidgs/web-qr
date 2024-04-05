import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import qCode1 from "../../images/qcode1.png";
import qCode2 from "../../images/qcode2.png";
import qCode3 from "../images/qcode3.png";
import { useAppSelector } from "../../stores/hooks";
import { RootState } from "../../stores/store";
import { useNavigate } from "react-router-dom";

function BasicCard() {
  const navigate = useNavigate();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Basic License</Card.Title>
        <Card.Text>
          <ul>
            <li>Use on up to 3 devices</li>
            <li>
              Customize the colors of your QR Codes and change almost any aspect
              of your QR Codes including the 'eye' shape, appearance, etc.
            </li>
            <div className="fullrow">
              <div>
                <img src={qCode1} width="100px" height="100px" alt="QR Code" />
              </div>
              <div className="col5" />
              <div>
                <img src={qCode2} width="100px" height="100px" alt="QR Code" />
              </div>
              {/* <div className="col25" /> */}
            </div>
            <li> Customize which 'UTM' codes you want to use</li>
            <li>
              Save any links you have previously encoded so you can get your QR
              Codes back
            </li>
            <li>
              <a href="https://Bit.ly/">Bit.ly</a> integration to shorten your
              custom links
            </li>
            <li>
              QR Codes can be saved in <code>.png</code>, <code>.jpg</code>, or{" "}
              <code>.svg</code> formats, <code>.svg</code>s can have a
              transparent background
            </li>

            <li>
              <h5>Cost: $10/month or $100/year</h5>
            </li>
          </ul>
        </Card.Text>
        <Button
          variant="success"
          size={"sm"}
          disabled={true}
          onClick={() => {}}
        >
          Purchase
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BasicCard;
