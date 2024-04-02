import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function EnterpriseCard() {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Enterprise License</Card.Title>
        <Card.Text>
          <ul>
            <li>Use on up to 10 devices</li>
            <li>
              Custom domain name (replace qr-builder.io with your own domain or
              sub-domain)
            </li>
            <li>Custom branding logo for the app</li>
            <li>Customize all field labels, tooltips, etc.</li>
            <li>
              <h5>Cost: $49.99/month or $500/year</h5>
            </li>
          </ul>
        </Card.Text>
        <Button variant="success" size={"sm"} disabled={true}>
          Contact us
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EnterpriseCard;
