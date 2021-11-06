import React, { FC } from "react";
import Slider, { Settings } from "react-slick";
import beautyImage from "../../images/beauty.jpg";
import furnitureImage from "../../images/furniture.jpg";
import blackFridayImage from "../../images/black_friday.jpg";
import { CarouselNextButton, CarouselPrevButton } from "./CarouselButtons";

export const Carousel: FC = () => {
  const slider = React.useRef<Slider>(null);

  var settings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Slider {...settings} ref={slider}>
        <div>
          <img src={beautyImage} alt="beauty" />
        </div>
        <div>
          <img src={furnitureImage} alt="furniture" />
        </div>
        <div>
          <img src={blackFridayImage} alt="black friday" />
        </div>
      </Slider>

      <CarouselNextButton onClick={() => slider?.current?.slickNext()} />
      <CarouselPrevButton onClick={() => slider?.current?.slickPrev()} />
    </div>
  );
};
