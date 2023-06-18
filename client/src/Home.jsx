import { NavLink, Navigate } from "react-router-dom";
import normal from "./assets/fonts/normal-circle.svg";
import ring from "./assets/fonts/ring.svg";
import dots from "./assets/fonts/dots-pattern.svg";
import bg from "./assets/images/10.png";
import PressLogo from "./components/PressLogo";
import Statistic from "./components/Statistic";
import Footer from "./components/Footer";
function Home() {
  return (
    <div id="text">
      <section
        className="textthree-wrapper textthree__section forPadding"
        style={{ margin: "0 auto" }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center textthree-row textthree-position-left">
            <div className="col-md-10 col-lg-7 textthree-texts">
              <div className="textthree-texts__wrapper">
                <div className="textthree-texts__title">
                  مدرکتو با ان اف تی (NFT)بگیر
                  <img src={dots} alt="" />
                </div>
                <div className="textthree-texts__desc color-links">
                  <p style={{ direction: "rtl", textAlign: "right" }}>
                    <strong>
                      ما یک سرویس صدور مدارک دانشگاهی و حرفه‌ای با استفاده از
                      فرمت ان‌اف‌تی داریم که به شما کمک می‌کند تا به راحتی و با
                      سرعت بالا، مدارک خود را دریافت کنید. ما به شما اطمینان
                      می‌دهیم که مدارک ما با کیفیت بالا و قابل اعتماد هستند و به
                      شما کمک می‌کنند تا به راحتی در مسیر تحصیلی و حرفه‌ای خود
                      پیش بروید.
                    </strong>
                  </p>
                </div>
                <div className="textthree-texts__buttons">
                    <NavLink to="/dashboard"  className="">
                  <div className="textthree-texts__buttonOne">
                     بزن بریم
                  </div>
                    </NavLink>
                  {/* <div className="textthree-texts__buttonTwo"></div> */}
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-4 textthree-img">
              <div
                className="textthree-img__wrapper"
                style={{ transform: "scale(1.25)" }}
              >
                <div className="textthree-img__bg">
                  <img src={bg} alt="" />
                  <div className="textthree-img__shapes">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70.527"
                      height="57.153"
                      viewBox="0 0 70.527 57.153"
                    >
                      <g
                        id="Group_379"
                        data-name="Group 379"
                        transform="translate(-526.982 -550.932)"
                      >
                        <path
                          id="Path_9"
                          data-name="Path 9"
                          d="M8745.216,1299.993s12.319-9.654,20.437-9.032,10.119,2.97,13.314,5.4,10.623,9.352,24.639,3.635c.072.1,7.1-3.627,9.444-6.134"
                          transform="translate(-8217 -738)"
                          fill="none"
                          stroke="#d72829"
                          strokeWidth="4"
                        />
                        <path
                          id="Path_10"
                          data-name="Path 10"
                          d="M8745.216,1299.993s12.319-9.654,20.437-9.032,10.119,2.97,13.314,5.4,10.623,9.352,24.639,3.635c.072.1,7.1-3.627,9.444-6.134"
                          transform="translate(-8217 -717)"
                          fill="none"
                          stroke="#d72829"
                          strokeWidth="4"
                        />
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M8745.216,1299.993s12.319-9.654,20.437-9.032,10.119,2.97,13.314,5.4,10.623,9.352,24.639,3.635c.072.1,7.1-3.627,9.444-6.134"
                          transform="translate(-8217 -696)"
                          fill="none"
                          stroke="#d72829"
                          strokeWidth="4"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="textthree-bgBox"></div>
            <div className="textthree-up-circle">
              <img src={normal} />
            </div>
            <div className="textthree-down-circle">
              <img src={normal} />
            </div>
            <div className="textthree-down-ring">
              <img src={ring} />
            </div>
          </div>
        </div>
      </section>
      <PressLogo />
      <Statistic/>
      <Footer/>
    </div>
    // <div className="row pb-0 ps-lg-0 align-items-center rounded-3 border shadow-lg">
    //     <div className="col-lg-4 text-end  -offset-lg-1 p-0 overflow-hidden shadow-lg a">
    //     <img
    //       className="rounded"
    //       // src="https://getbootstrap.com/docs/5.3/examples/heroes/bootstrap-docs.png"
    //       src={svg}
    //       alt=""
    //       width="720"
    //     />
    //   </div>
    //   <div className="text-end col-lg-7 p-3 p-lg-5 pt-lg-3">
    //     <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
    //       قهرمان مرزی با تصویر و سایه های برش خورده
    //     </h1>
    //     <p className="lead">
    //       طراحی و سفارشی‌سازی سریع سایت‌های پاسخ‌گوی اولین تلفن همراه با بوت
    //       استرپ، محبوب‌ترین جعبه ابزار منبع باز جلویی جهان، دارای متغیرهای و
    //       میکس‌ها، سیستم شبکه واکنش‌گرا، اجزای از پیش ساخته شده گسترده، و
    //       افزونه‌های قدرتمند جاوا اسکریپت
    //     </p>
    //     <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
    //       <NavLink to="/dashboard"

    //         className="btn btn-info px-4 me-md-2 fw-bold"
    //       >
    //         داشبورد
    //       </NavLink>
    //       <button type="button" className="btn btn-outline-secondary  px-4">
    //         Default
    //       </button>
    //     </div>
    //   </div>

    // </div>
  );
}

export default Home;
