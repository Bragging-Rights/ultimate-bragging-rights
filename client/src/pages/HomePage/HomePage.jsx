import React from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import green from "../../assets/bglow.png"

const HomePage = () => {
  
  return (
    <div>
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

{/* INTRODUCTION */}
<div id="intro" className="homepage-content-section homepage-green relative">
  <div className="homepage-container">
  <div className="container mx-auto px-4 sm:px-8 lg:px-16">
    <h1 className="text-3xl font-bold text-center mb-8">THIS SITE IS BUILT FOR SPORTS FANS WHO LOVE</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
      <div className="space-y-4 sm:order-2">
        <p>
          <i className="fa fa-futbol-o mr-2 text-blue-500"></i> Watching Pre-Game shows
        </p>
        <p>
          <i className="fa fa-bar-chart mr-2 text-blue-500"></i> Looking Up Stats
        </p>
        <p>
          <i className="fa fa-trophy mr-2 text-blue-500"></i> Predicting who is going to win
        </p>
        <p>
          <i className="fa fa-microphone mr-2 text-blue-500"></i> Saying 'I Told You So!!'
        </p>
      </div>
      <div className="space-y-4 sm:order-1">
        <p>
          <i className="fa fa-tv mr-2 text-blue-500"></i> Watching Post-Game shows
        </p>
        <p>
          <i className="fa fa-share-alt mr-2 text-blue-500"></i> Sharing Stats
        </p>
        <p>
          <i className="fa fa-headphones mr-2 text-blue-500"></i> Listening to others predictions
        </p>
        <p>
          <i className="fa fa-heart mr-2 text-blue-500"></i> and they Love Having
        </p>
      </div>
    </div>
  </div>
  </div>
</div>
<div id="about" className="homepage-content-section homepage-about relative">
        <div className="homepage-container">
          <div className="row">
           
          </div>
        </div>
      </div>


      
            </div>
  );
};

export default HomePage;
