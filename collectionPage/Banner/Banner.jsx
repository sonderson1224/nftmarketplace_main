import React from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({bannerImage}) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image 
            src={bannerImage}
            alt="Background"
            // width={1600}
            // height={100}
            className={Style.banner_img_img}
        />
      </div>

      <div className={Style.banner_img_mobile}>
            <Image 
            src={bannerImage}
            alt="Background"
            // width={1600}
            // height={300}
          className={Style.banner_img_mobile_img}
        />
      </div>
    </div>
  )
}

export default Banner;
