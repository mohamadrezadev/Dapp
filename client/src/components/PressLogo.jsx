import React from "react";
import Webp from "../assets/images/Webp.net-resizeimage9.png.webp"
import newlogo from "../assets/images/202075131851newlogo.png"
import image9 from "../assets/images/Webp.net-resizeimage9.png.webp"
import newlogo2 from "../assets/images/202075131851newlogo.png"
import green from "../assets/images/logo-green-fa.png"
import dots from "../assets/fonts/preesDots.svg"
function PressLogo() {
  return (
    <div id="presslogo">
      <section
        className="presslogotwo__section"
        style={{ marginImagine: "desktop", "--first": "3, 31, 76" }}
      >
        <div className="container">
          <div className="tem2-prees forPadding" style={{}}>
            <div className="row justify-content-center">
              <div className="col-md-3 d-flex justify-content-center justify-content-md-start align-items-center mb-4 mb-md-0">
                <div className="tem2-title mr-md-4">
                  <img src={dots} className="img-fluid" alt="" />
                  <h4 className="tem2-topic" style={{ fontSize: "22px" }}>
                    مشتریان‌ ما
                  </h4>
                </div>
              </div>
              <div className="col-10 col-md-8">
                <div className="tem2-slider tem2-large">
                  <div className="owl-carousel owl-theme presslogotwo__owl-carousel owl-rtl owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all 0s ease 0s",
                          width: "559px",
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "171.25px", marginLeft: "15px" }}
                        >
                          <a className="tem2-pree" href="" notlink="">
                            <div
                              className="image-container flex-grow-1 d-flex align-items-center"
                              style={{ transform: "scale(0.75)" }}
                            >
                              <img src={green} alt="" />
                            </div>
                            <span style={{ fontSize: "17px" }}>
                              دانشگاه بزرگمهر{" "}
                            </span>
                          </a>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "171.25px", marginLeft: "15px" }}
                        >
                          <a className="tem2-pree" href="دانشگاه اصفهان ">
                            <div
                              className="image-container flex-grow-1 d-flex align-items-center"
                              style={{ transform: "scale(1)" }}
                            >
                              <img
                                src={newlogo2}
                                alt=""
                              />
                            </div>
                            <span style={{ fontSize: "17px" }}>
                              دانشگاه اصفهان
                            </span>
                          </a>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "171.25px", marginLeft: "15px" }}
                        >
                          <a className="tem2-pree" href="" notlink="">
                            <div
                              className="image-container flex-grow-1 d-flex align-items-center"
                              style={{ transform: "scale(0.75)" }}
                            >
                              <img
                                src={image9}
                                alt=""
                              />
                            </div>
                            <span style={{ fontSize: "17px" }}>
                              یودمی ایران{" "}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav disabled">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                        style={{ height: "148.05px" }}
                      ></button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next disabled"
                        style={{ height: "148.05px" }}
                      ></button>
                    </div>
                    <div className="owl-dots disabled"></div>
                  </div>
                </div>
                <div className="tem2-slider tem2-small">
                  <div className="row justify-content-center">
                    <div className="col-5 item tem2-pree">
                      <a href="" notlink="">
                        <div
                          className="image-container__mobile flex-grow-1 d-flex align-items-center"
                          style={{ transform: "scale(0.75)" }}
                        >
                          <img src="../assets/images/logo-green-fa.png" alt="" />
                        </div>
                        <span style={{ fontSize: "17px" }}>
                          دانشگاه بزرکمهر{" "}
                        </span>
                      </a>
                    </div>
                    <div className="col-5 item tem2-pree">
                      <a href="دانشگاه اصفهان ">
                        <div
                          className="image-container__mobile flex-grow-1 d-flex align-items-center"
                          style={{ transform: "scale(1)" }}
                        >
                          <img src={newlogo} alt="" />
                        </div>
                        <span style={{ fontSize: "17px" }}>دانشگاه اصفهان</span>
                      </a>
                    </div>
                    <div className="col-5 item tem2-pree">
                      <a href="" notlink="">
                        <div
                          className="image-container__mobile flex-grow-1 d-flex align-items-center"
                          style={{ transform: "scale(0.75)" }}
                        >
                          <img
                            src={Webp}
                            alt=""
                          />
                        </div>
                        <span style={{ fontSize: "17px" }}>یودمی ایران </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PressLogo;
