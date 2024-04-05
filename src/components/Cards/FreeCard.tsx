import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import { RootState } from "../../stores/store";

function FreeCard() {
  const navigate = useNavigate();
  const dark = useAppSelector((state: RootState) => state.main.settings.dark);
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

  const go = () => {
    navigate("/build");
  };
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Free features</Card.Title>
        <Card.Text>
          <ul>
            <li>WiFi codes to allow for automatic signon to your networks</li>
            <li>Simple URL Codes</li>
            <li>
              Download your QR Codes in <code>png</code> format
            </li>
            <li> Encode your links for tracking</li>
            <ul>
              <li>
                <code>
                  https://qr-builder.io/?utm_campaign=intro-page&utm_source=qr-builder&utm_medium=web
                  &nbsp;
                </code>
              </li>
            </ul>
            <li>
              Create QR Codes for URLs <em>and</em> WiFi networks to allow for
              automatic signons to your networks
            </li>
          </ul>
        </Card.Text>
        <Button variant="success" size={"sm"} onClick={go}>
          Start Using
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FreeCard;
