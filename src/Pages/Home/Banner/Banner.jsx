import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 my-6">
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        className="rounded-2xl shadow-lg overflow-hidden"
      >
        <div>
          <img
            src={bannerImg1}
            alt="Banner 1"
            className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full object-cover"
          />
          <p className="legend bg-black/60 text-white text-sm md:text-base rounded-md">
            Explore the Beauty
          </p>
        </div>
        <div>
          <img
            src={bannerImg2}
            alt="Banner 2"
            className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full object-cover"
          />
          <p className="legend bg-black/60 text-white text-sm md:text-base rounded-md">
            Discover New Places
          </p>
        </div>
        <div>
          <img
            src={bannerImg3}
            alt="Banner 3"
            className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full object-cover"
          />
          <p className="legend bg-black/60 text-white text-sm md:text-base rounded-md">
            Start Your Journey
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
