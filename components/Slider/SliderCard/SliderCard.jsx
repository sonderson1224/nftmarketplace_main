import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile"


const SliderCard = ({el, i}) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 30,
    hours: 2,
    minutes: 28,
    seconds: 9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(interval);
        // Timer has reached 0, perform any necessary actions here
      } else {
        // Calculate the new remaining time
        setRemainingTime(prevTime => {
          const updatedTime = { ...prevTime };

          if (updatedTime.seconds > 0) {
            updatedTime.seconds--;
          } else {
            updatedTime.seconds = 59;

            if (updatedTime.minutes > 0) {
              updatedTime.minutes--;
            } else {
              updatedTime.minutes = 59;

              if (updatedTime.hours > 0) {
                updatedTime.hours--;
              } else {
                updatedTime.hours = 23;

                if (updatedTime.days > 0) {
                  updatedTime.days--;
                }
              }
            }
          }

          return updatedTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  // Format the remaining time
  const formattedTime = `${remainingTime.days}days:${remainingTime.hours}h : ${remainingTime.minutes}m : ${remainingTime.seconds}s`;

  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image 
            src={el.background}
            alt="Slider Profile"
            className={Style.sliderCard_box_img_img}
          />
        </motion.div>

        <div className={Style.sliderCard_box_title}>
          <p>NFT Video #1243</p>
          <div className={Style.sliderCard_box_title_like}>
            {/* <LikeProfile /> */}
            {/* <small>1 of 100</small> */}
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>1.000 ETH</p>
          </div>

          <div className={Style.sliderCard_box_price_time}>
            <small>Remaining Time</small>
            <p>0days: 0h : 0m : 0s</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;
