import React, { FC } from "react";
import Slider, { Settings } from "react-slick";
import { CarouselNextButton, CarouselPrevButton } from "./CarouselButtons";
import { Link, useHistory } from "react-router-dom";

export const Carousel: FC = () => {
  const history = useHistory();
  const slider = React.useRef<Slider>(null);

  var settings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipe: false,
  };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Slider {...settings} ref={slider}>
        <Link to="/categories/beauty">
          <img src="/beauty.jpg" alt="beauty" />
        </Link>
        <Link to="/categories/furniture">
          <img src="/furniture.jpg" alt="furniture" />
        </Link>
        <div onClick={() => history.push("/categories/deals")}>
          <img src="/black_friday.jpg" alt="black friday" />
        </div>
      </Slider>

      <CarouselNextButton onClick={() => slider?.current?.slickNext()} />
      <CarouselPrevButton onClick={() => slider?.current?.slickPrev()} />
    </div>
  );
};
