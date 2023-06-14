import { Navbar, Nav } from "react-bootstrap";
import { ConnectWallet } from "@thirdweb-dev/react";
const MyNavbar = () => {
  return (
    <Navbar bg="dark" className="navbar-dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="#">نام سایت</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#">لینک ۱</Nav.Link>
            <Nav.Link href="#">لینک ۲</Nav.Link>
            <Nav.Link href="#">لینک ۳</Nav.Link>
          </Nav>
          <ConnectWallet
            className="btn btn-primary"
            auth={{
              loginOptional: false,
            }}
            btnTitle="اتصال کیف پول"
            modalTitle="اتصال کیف پول"
            theme="dark"
          />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
