import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import qCode3 from "../../images/qcode3.png";

function ProCard() {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Pro License</Card.Title>
        <Card.Text>
          <ul>
            <li>Use on up to 5 devices</li>
            <li> Add your logo to your QR Codes</li>
            <img src={qCode3} width="100px" height="100px" alt="QR Code" />
            <li>Add your custom bit.ly short-domain</li>
            <li>
              Customize whether you want to enter codes free-form, or use a
              pre-defined list of choices for each one
            </li>
            <li>
              <h5>Cost: $19.99/month or $200/year</h5>
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
        </Button>{" "}
      </Card.Body>
    </Card>
  );
}

export default ProCard;
