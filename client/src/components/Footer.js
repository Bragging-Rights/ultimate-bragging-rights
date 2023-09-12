import logo from "../assets/logo2.png";
import "font-awesome/css/font-awesome.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container my-5">
        <footer className="text-center text-white">
          <div className="container">
            <section className="mt-5"></section>

            <hr className="my-5" />

            <section className="mb-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <img src={logo}></img>
                  <br></br>
                  <br></br>
                  <p>
                    DISCLAIMER: This site is 100% for entertainment purposes
                    only and does not involve real money betting. Gambling can
                    be addictive, please play responsibly. If you or someone you
                    know has a gambling problem and wants help,<br></br> Call
                    1-800 GAMBLER in the U.S
                  </p>
                </div>
                <div className="row text-center d-flex justify-content-center pt-5">
                  <div className="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        Campaigns
                      </a>
                    </h6>
                  </div>

                  <div className="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        Email Marketing
                      </a>
                    </h6>
                  </div>

                  <div className="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        Branding
                      </a>
                    </h6>
                  </div>

                  <div className="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        Offline
                      </a>
                    </h6>
                  </div>

                  <div class="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        Contact
                      </a>
                    </h6>
                  </div>

                  <div className="col-md-2">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!" className="text-white">
                        FAQs
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </section>

            <section className="text-center mb-5">
              <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </section>
          </div>

          <div className="text-center p-3">
            2020 Copyrights ©
            <a className="text-white" href="https://BraggingRights.com/">
              BraggingRights.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
