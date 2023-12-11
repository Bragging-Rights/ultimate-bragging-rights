import React from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import MainNavBar from "../../components/MainNavBar";

const HomePage = () => {
  
  return (
    <div>
      <MainNavBar/>
      {/* HOME */}
      <div id="home" className="homepage-content-section homepage-home-content relative">
  <div className="homepage-container">
    <div className="row">
      <div className="col-xs-12 ">
        <iframe
          className="video-page"
          src="https://videosuite-player-wrapper.vercel.app/assets"
          title="Embedded Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</div>

      {/* ABOUT */}
      <div id="about" className="homepage-content-section">
        <div className="homepage-container">
          <div className="row">
            <div className="col-sm-8 col-lg-7">
              <h1>ABOUT</h1>
              <p className="homepage-lead">
                Objective: Build a CodePen.io app that successfully
                reverse-engineers{" "}
                <a
                  href="https://codepen.io/ThiagoFerreir4/full/eNMxEp"
                  target="_blank"
                >
                  this <em className="fa fa-external-link" />
                </a>
              </p>
              <p>
                <strong>Rule #1:</strong> Don't look at the example project's
                code on CodePen. Figure it out for yourself.
              </p>
              <p>
                <strong>Rule #2:</strong> You may use whichever libraries or
                APIs you need.
              </p>
              <p>
                <strong>Rule #3:</strong> Reverse engineer the example project's
                functionality, and also feel free to personalize it.
              </p>
              <p>
                <strong>Hint:</strong> If you don't want to start from scratch,
                you can fork this simple Bootstrap portfolio template on{" "}
                <a
                  href="https://codepen.io/FreeCodeCamp/pen/mJNqQj"
                  target="_blank"
                >
                  CodePen <em className="fa fa-external-link" />
                </a>
              </p>
              <p>
                Here are the user stories you must enable, and optional bonus
                user stories:
              </p>
              <p>
                <strong>User Story:</strong> As a user, I can access all of the
                portfolio webpage's content just by scrolling.
              </p>
              <p>
                <strong>User Story:</strong> As a user, I can click different
                buttons that will take me to the portfolio creator's different
                social media pages.
              </p>
              <p>
                <strong>User Story:</strong> As a user, I can see thumbnail
                images of different projects the portfolio creator has built (if
                you haven't built any websites before, use placeholders.)
              </p>
              <p>
                <strong>Bonus User Story:</strong> As a user, I navigate to
                different sections of the webpage by clicking buttons in the
                navigation.
              </p>
              <p>
                Don't worry if you don't have anything to showcase on your
                portfolio yet - you will build several apps on the next few
                CodePen challenges, and can come back and update your portfolio
                later.
              </p>
              <p>
                There are many great portfolio templates out there, but for this
                challenge, you'll need to build a portfolio page yourself. Using
                Bootstrap will make this much easier for you.
              </p>
              <blockquote>
                <p>
                  Remember to use{" "}
                  <mark>
                    <em>Read-Search-Ask</em>
                  </mark>{" "}
                  if you get stuck.
                </p>
              </blockquote>
              <p>
                When you are finished, click the{" "}
                <strong>"I've completed this challenge"</strong> button and
                include a link to your CodePen. If you pair programmed, you
                should also include the Free Code Camp username of your pair.
              </p>
            </div>
            <div className="col-sm-4 col-lg-5 hidden-xs">
              <img
                src="https://s4.postimg.org/wzkxhfy59/lego_dimensions_patent.jpg"
                alt=""
                className="pull-right img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
      {/* PORTFOLIO */}
      <div id="portfolio" className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>PORTFOLIO</h1>
              <p className="lead">Below you'll find some of my recent work.</p>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img
                  src="https://placeimg.com/768/456/arch/grayscale"
                  alt="Project Dummy"
                />
                <div className="caption">
                  <h4>Sample Project #1</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img
                  src="https://placeimg.com/768/456/nature/grayscale"
                  alt="Project Dummy"
                />
                <div className="caption">
                  <h4>Sample Project #2</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img
                  src="https://placeimg.com/768/456/people/grayscale"
                  alt="Project Dummy"
                />
                <div className="caption">
                  <h4>Sample Project #3</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img
                  src="https://placeimg.com/768/456/tech/grayscale"
                  alt="Project Dummy"
                />
                <div className="caption">
                  <h4>Sample Project #4</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img
                  src="https://placeimg.com/768/456/animals/grayscale"
                  alt="Project Dummy"
                />
                <div className="caption">
                  <h4>Sample Project #5</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT */}
      <div id="contact" className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>CONTACT</h1>
              <p className="lead">Don't be shy! Say Hello!</p>
              <div className="social-cont">
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-default btn-lg linkedin-btn"
                      href="https://leventevmek.com"
                      role="button"
                      target="_blank"
                    >
                      <i className="fa fa-star" />
                      <span>Portfolio</span>
                    </a>
                    <a
                      className="btn btn-default btn-lg twitter-btn"
                      href="https://twitter.com/lveent"
                      role="button"
                      target="_blank"
                    >
                      <i className="fa fa-twitter" />
                      <span>Twitter</span>
                    </a>
                    <a
                      className="btn btn-default btn-lg github-btn"
                      href="https://github.com/lveent"
                      role="button"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span>Github</span>
                    </a>
                    <a
                      className="btn btn-default btn-lg fcc-btn"
                      href="https://www.freecodecamp.com/lveent"
                      role="button"
                      target="_blank"
                    >
                      <i className="fa fa-fire" />
                      <span>freeCodeCamp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
