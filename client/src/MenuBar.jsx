import { Navbar, Nav } from "react-bootstrap";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import svg from "./assets/images/10.png";
import "./assets/css/file.css";
import { NavLink, useLocation } from "react-router-dom";
import ContactUs from "./ContactUs ";
const MyNavbar = () => {
  const loc = useLocation();
  const address = useAddress();
  return (
    <div id="header">
      <section className="nav headerone__section right  ">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light navbar-light forPadding">
                <div className="navbar-brand">
                  <img src={svg} alt="logo" />
                </div>
                <button
                  className="navbar-toggler navbar-toggler-right"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-controls="navbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <div className="icon-open"></div>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                  <ul className="navbar-nav nav-right align-items-center">
                    {loc.pathname !== "/dashboard" && (
                      <>
                        <li className="nav-item active">
                          <NavLink
                            to="/"
                            className="nav-link"
                            href="#"
                            style={{ color: "#000" }}
                          >
                            صفحه اصلی
                          </NavLink>
                        </li>
                        <li className="nav-item active">
                          <a
                            className="nav-link"
                            oncl
                            style={{ color: "#000" }}
                            
                          >
                            درباره ما
                            
                          </a>
                        </li>
                        <li className="nav-item active">
                          <a
                            className="nav-link"
                            href="#"
                            style={{ color: "#000" }}
                          >
                            تماس با ما
                          </a>
                        </li>
                      </>
                    )}
                    <li className="nav-item active">
                      <NavLink
                        to="/nfts"
                        className="nav-link"
                        href="#"
                        style={{ color: "#000" }}
                      >
                        مدارک صادر شده
                      </NavLink>
                    </li>
                    {address && loc.pathname!=="/dashboard"  &&(
                      <li className="nav-item active">
                        <NavLink
                          to="/dashboard"
                          className="nav-link"
                          href="#"
                          style={{ color: "#000" }}
                        >
                          داشبورد
                        </NavLink>
                      </li>
                    )}
                    <li className="nav-item ">
                      <ConnectWallet
                        className="btn "
                        auth={{
                          loginOptional: false,
                        }}
                        btnTitle="اتصال کیف پول"
                        modalTitle="اتصال کیف پول"
                        theme="light"
                      />{" "}
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyNavbar;
