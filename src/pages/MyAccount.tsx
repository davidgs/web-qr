import {
  Button,
  FloatingLabel,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import Logo from "../images/NewLinkerLogo.png";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import "../css/MainConfig.css";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  setFirstName,
  setLastName,
  setOrganization,
  setEmail,
  setAddress,
  setCity,
  setState,
  setZip,
  saveUserSettings,
} from "../reducers/user/userSlice";
import Footer from "../components/Footer";
import {
  deleteLicense,
  updateLicense,
} from "../reducers/licensing/licenseSlice";
import { dtf } from "../utils/dateformat";
import PHunt from "../components/PHunt";
import EnterLicenseModal from "../components/Modals/EnterLicenseModal";
import ErrorPop from "../components/ErrorPop";

function MyAccount() {
  const dark = useAppSelector((state) => state.main.settings.dark);
  const dispatch = useAppDispatch();
  const darkClass = dark ? "header-stuff-dark" : "header-stuff";
  const user = useAppSelector((state) => state.userSettings);
  const license = useAppSelector((state) => state.license.settings);
  const [editMe, setEditMe] = useState<boolean>(false);
  const [LicType, setLicType] = useState<string>("Free");
  const [LicSeats, setLicSeats] = useState<number>(0);
  const [licLimit, setLicLimit] = useState<number>(0);
  const [LicStat, setLicStat] = useState<string>("None");
  const [enterLicense, setEnterLicense] = useState<boolean>(false);
  const cancelSub = () => {
    console.log("Cancelling subscription...");
    const ld = { ...license };
    ld.license_key = "";
    ld.license_status = "Canceled";
    ld.active = false;
    ld.expire_date = new Date();
    ld.license_type = "free";
    dispatch(updateLicense(ld));
    dispatch(deleteLicense(ld));
  };

  const addLicense = () => {
    console.log("Adding License...");
    setEnterLicense(true);
  };

  const saveEdit = () => {
    if (editMe) {
      // save the data
      dispatch(
        saveUserSettings({
          username: user.settings?.login,
          settings: user.settings,
        })
      );
    }
    setEditMe(!editMe);
  };
  const valueChanged = (e: SyntheticEvent) => {
    const tar: HTMLInputElement = e.target as HTMLInputElement;
    console.log(`tar`, tar.id, tar.value);
    switch (tar.id) {
      case "first_name":
        dispatch(setFirstName(tar.value));
        break;
      case "last_name":
        dispatch(setLastName(tar.value));
        break;
      case "organization":
        dispatch(setOrganization(tar.value));
        break;
      case "email":
        dispatch(setEmail(tar.value));
        break;
      case "address":
        dispatch(setAddress(tar.value));
        break;
      case "city":
        dispatch(setCity(tar.value));
        break;
      case "state":
        dispatch(setState(tar.value));
        break;
      case "zip":
        dispatch(setZip(tar.value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(license?.license_type);
    const spl = license?.license_type?.split("-");
    const lst = spl[0].charAt(0).toUpperCase() + spl[0].slice(1);
    if (spl[1]) {
      const l = lst + " " + spl[1].charAt(0).toUpperCase() + spl[1].slice(1);
      setLicType(l);
    } else {
      setLicType(lst);
    }

    const ls =
      license?.license_status.charAt(0).toUpperCase() +
      license?.license_status.slice(1);
      setLicStat(ls);
    switch (spl[0]) {
      case "free":
        setLicLimit(1);
        break;
      case "basic":
        setLicLimit(3);
        break;
      case "pro":
        setLicLimit(5);
        break;
      case "enterprise":
        setLicLimit(10);
        break;
      default:
        setLicLimit(0);
        break;
    }
    if (license.machines) {
      setLicSeats(license.machines.length);
    }
  }, [license]);
  return (
    <>
      <div className="main-column" style={{ alignContent: "center" }}>
        <Row>
          <h1 style={{ margin: "auto", textAlign: "center" }}>
            <img src={Logo} alt="QR Builder Logo" width={40} height={40} />{" "}
            &nbsp; &nbsp;
            <strong>
              <span className={darkClass}>QR Builder Account Details</span>
            </strong>
          </h1>
          <p></p>
        </Row>
        <div className="fullrow">
          <PHunt />
        </div>
        <div
          className="fullrow"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h4 style={{ textAlign: "center" }}>
            Account Details for{" "}
            <strong>
              {user?.settings?.first_name} {user?.settings?.last_name}
            </strong>
          </h4>
        </div>
        {/* Login */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="ssid-label-tooltip">Your Login name</Tooltip>
              }
            >
              <FloatingLabel label="Login ID" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="wifi-ssid"
                  aria-label="Your login name"
                  aria-describedby="Login name"
                  disabled={true}
                  value={user.settings?.login}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* First Name */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="first_name-label-tooltip">Your First Name</Tooltip>
              }
            >
              <FloatingLabel label="First Name" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="first_name"
                  aria-label="Your first name"
                  aria-describedby="First name"
                  disabled={!editMe}
                  value={user.settings?.first_name}
                  onChange={(eventKey) => {
                    valueChanged(eventKey);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* Last Name */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="last_name-label-tooltip">Your Last Name</Tooltip>
              }
            >
              <FloatingLabel label="Last Name" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="last_name"
                  aria-label="Your Last name"
                  aria-describedby="Last name"
                  disabled={!editMe}
                  value={user.settings?.last_name}
                  onChange={(eventKey) => {
                    valueChanged(eventKey);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* Company */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="company-label-tooltip">Company</Tooltip>}
            >
              <FloatingLabel label="Company" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="organization"
                  aria-label="Your company"
                  aria-describedby="Company"
                  value={user.settings?.organization}
                  disabled={!editMe}
                  onChange={(eventKey) => {
                    valueChanged(eventKey);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* Email */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={<Tooltip id="email-label-tooltip">Email</Tooltip>}
            >
              <FloatingLabel label="Email" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="email"
                  aria-label="Your Email Address"
                  aria-describedby="email"
                  value={user.settings?.email}
                  disabled={!editMe}
                  onChange={(eventKey) => {
                    valueChanged(eventKey);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* Address */}
        <div className="col50" style={{ margin: "auto" }}>
          <InputGroup size="lg">
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 300 }}
              overlay={
                <Tooltip id="address-label-tooltip">Street Address</Tooltip>
              }
            >
              <FloatingLabel label="Address" className={darkClass}>
                <FormControl
                  required
                  className={darkClass}
                  type="text"
                  size="sm"
                  id="address"
                  aria-label="Your Address"
                  aria-describedby="Address"
                  value={user.settings?.address}
                  disabled={!editMe}
                  onChange={(eventKey) => {
                    valueChanged(eventKey);
                  }}
                />
              </FloatingLabel>
            </OverlayTrigger>
          </InputGroup>
        </div>
        {/* City/State/Zip */}
        <div className="col50" style={{ margin: "auto" }}>
          <div className="fullrow">
            <InputGroup size="lg">
              <div className="col40">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="citylabel-tooltip">City</Tooltip>}
                >
                  <FloatingLabel label="City" className={darkClass}>
                    <FormControl
                      required
                      className={darkClass}
                      type="text"
                      size="sm"
                      id="city"
                      aria-label="Your City"
                      aria-describedby="City"
                      value={user.settings?.city}
                      disabled={!editMe}
                      onChange={(eventKey) => {
                        valueChanged(eventKey);
                      }}
                    />
                  </FloatingLabel>
                </OverlayTrigger>
              </div>
              <div className="col20">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="state-label-tooltip">State</Tooltip>}
                >
                  <FloatingLabel label="State" className={darkClass}>
                    <FormControl
                      required
                      className={darkClass}
                      type="text"
                      size="sm"
                      id="state"
                      aria-label="Your State"
                      aria-describedby="State"
                      value={user.settings?.state}
                      disabled={!editMe}
                      onChange={(eventKey) => {
                        valueChanged(eventKey);
                      }}
                    />
                  </FloatingLabel>
                </OverlayTrigger>
              </div>
              <div className="col40">
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 300 }}
                  overlay={
                    <Tooltip id="zip-label-tooltip">Postal Code</Tooltip>
                  }
                >
                  <FloatingLabel label="Postal Code" className={darkClass}>
                    <FormControl
                      required
                      className={darkClass}
                      type="text"
                      size="sm"
                      id="zip"
                      aria-label="Your Postal Code"
                      aria-describedby="Postal Code"
                      value={user.settings?.zip}
                      disabled={!editMe}
                      onChange={(eventKey) => {
                        valueChanged(eventKey);
                      }}
                    />
                  </FloatingLabel>
                </OverlayTrigger>
              </div>
            </InputGroup>
          </div>
        </div>
        <div className="col50" style={{ margin: "auto" }}>
          <div className="fullrow">
            <div className="col25">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">
                    Click to edit your account details
                  </Tooltip>
                }
              >
                <Button variant="primary" size="lg" onClick={saveEdit}>
                  {editMe ? "Save" : "Edit"}
                </Button>
              </OverlayTrigger>
            </div>
            <div className="col5" />
            <div className="col25">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">Cancel Editings</Tooltip>
                }
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setEditMe(false)}
                >
                  Cancel
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        {user.settings?.updated_at && (
          <div className="fullrow">
            <div className="col50" style={{ float: "right" }}>
              <p className="updated">
                Last Updated: {dtf.format(new Date(user.settings?.updated_at))}
              </p>
            </div>
          </div>
        )}
        {user.error && (
          <div className="fullrow">
            <div className="col50">
              <p className="error">{user.error}</p>
            </div>
          </div>
        )}
        <div className="fullrow">
          <hr style={{ width: "100%" }}></hr>
        </div>
        <div
          className="fullrow"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h4 style={{ textAlign: "center" }}>License Details:</h4>
        </div>
        {/* License Type */}
        <div className="col50" style={{ margin: "auto" }}>
          <div className="fullrow">
            <div className="col50" style={{ margin: "auto" }}>
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">License type</Tooltip>
                }
              >
                <FloatingLabel label="License Type" className={darkClass}>
                  <FormControl
                    required
                    className={darkClass}
                    type="text"
                    size="sm"
                    id="license-type"
                    aria-label="License Type"
                    aria-describedby="license type"
                    value={LicType}
                    disabled={true}
                  />
                </FloatingLabel>
              </OverlayTrigger>
            </div>
            <div className="col30" style={{ margin: "auto" }}>
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">License status</Tooltip>
                }
              >
                <FloatingLabel label="License Status" className={darkClass}>
                  <FormControl
                    required
                    className={darkClass}
                    type="text"
                    size="sm"
                    id="license-type"
                    aria-label="License Type"
                    aria-describedby="license type"
                    value={license.license_status}
                    disabled={true}
                  />
                </FloatingLabel>
              </OverlayTrigger>
            </div>
            <div className="col20" style={{ margin: "auto" }}>
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">Number of license seats Used</Tooltip>
                }
              >
                <FloatingLabel label="Licenses Used" className={darkClass}>
                  <FormControl
                    required
                    className={darkClass}
                    type="text"
                    size="sm"
                    id="license-used"
                    aria-label="Licenses Used"
                    aria-describedby="licenses used"
                    value={`${LicSeats} of ${licLimit} used`}
                    disabled={true}
                  />
                </FloatingLabel>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        {/* License Key */}
        <div className="col50" style={{ margin: "auto" }}>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 300 }}
            overlay={<Tooltip id="ssid-label-tooltip">License Token</Tooltip>}
          >
            <FloatingLabel label="License Token" className={darkClass}>
              <FormControl
                required
                className={darkClass}
                type="text"
                size="sm"
                id="license-type"
                aria-label="License Type"
                aria-describedby="license type"
                value={license.license_key}
                disabled={true}
              />
            </FloatingLabel>
          </OverlayTrigger>
        </div>
        {/* License Expiration */}
        <div className="col50" style={{ margin: "auto" }}>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 300 }}
            overlay={<Tooltip id="ssid-label-tooltip">Expiration Date</Tooltip>}
          >
            <FloatingLabel label="License Expiration" className={darkClass}>
              <FormControl
                required
                className={darkClass}
                type="text"
                size="sm"
                id="expiration-date"
                aria-label="License Expiration Date"
                aria-describedby="license expiration"
                value={dtf.format(new Date(license.expire_date))}
                disabled={true}
              />
            </FloatingLabel>
          </OverlayTrigger>
        </div>
        {/* cancel subscription */}
        <div className="col50" style={{ margin: "auto" }}>
          {license.license_key !== "" && (
            <InputGroup size="lg">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">
                    Cancel your subscription
                  </Tooltip>
                }
              >
                <Button variant="warning" onClick={cancelSub}>
                  Cancel Subscription
                </Button>
              </OverlayTrigger>
            </InputGroup>
          )}
          {license.license_key === "" && (
            <InputGroup size="lg">
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                overlay={
                  <Tooltip id="ssid-label-tooltip">
                    Have a license? Click here to enter it.
                  </Tooltip>
                }
              >
                <Button variant="success" onClick={addLicense}>
                  Enter A License
                </Button>
              </OverlayTrigger>
            </InputGroup>
          )}
          <EnterLicenseModal show={enterLicense} callback={setEnterLicense} />
          <div className="fullrow">
            <ErrorPop errorMsg="Some Error Message. But what happens when the error message is really really long?" duration={99} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyAccount;
