import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

// INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";
import image from "../../nftimgs"

const Slider = () => {
  const followingArray = [
    {
      background: image.img1,
      user: images.user1,
    },
    {
      background: image.img60,
      user: images.user2,
    },
    {
      background: image.img4,
      user: images.user3,
    },
    {
      background: image.img3,
      user: images.user4,
    },
    {
      background: image.img59,
      user: images.user5,
    },
    {
      background: image.img40,
      user: images.user6,
    },
    {
      background: image.img30,
      user: images.user6,
    },
    {
      background: image.img31,
      user: images.user6,
    },
    {
      background: image.img45,
      user: images.user6,
    },
    {
      background: image.img46,
      user: images.user6,
    },
 
   
    
    
  ];
  const [width, setWidth] = useState(0);
  const dragSlider = useRef();
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    let intervalId;
    if (isAutoScrolling) {
      intervalId = setInterval(() => {
        handleScroll("right");
      }, 1000);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearInterval(intervalId);
    };
  }, [isAutoScrolling]);

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = current.offsetWidth;
    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
      if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
        current.scrollLeft = 0;
      }
    }
  };

  const handlePauseAutoScrolling = () => {
    setIsAutoScrolling(false);
  };

  const handleResumeAutoScrolling = () => {
    setIsAutoScrolling(true);
  };

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <h2>
          Explore NFT Videos
          <span>(Coming soon)</span>
        </h2>
        <div className={Style.slider_box_btn}>
          <p>Click on the play icon & experience amazing NFT videos</p>
          {/* <div className={Style.slider_box_btn_btn}>
            <div
              className={Style.slider_box_btn_btn_icon}
              onClick={() => handleScroll("left")}
            >
              <TiArrowLeftThick />
            </div>
            <div
              className={Style.slider_box_btn_btn_icon}
              onClick={() => handleScroll("right")}
            >
              <TiArrowRightThick />
            </div>
          </div> */}
        </div>

        <motion.div className={Style.slider_boxitems}>
          <motion.div
            ref={dragSlider}
            className={Style.slider_boxitem}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            onMouseEnter={handlePauseAutoScrolling}
            onMouseLeave={handleResumeAutoScrolling}
          >
            {followingArray.map((el, i) => (
              <SliderCard key={i + 1} el={el} i={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
