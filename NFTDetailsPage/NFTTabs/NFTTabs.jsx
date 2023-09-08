import React from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./NFTTabs.module.css";

const NFTTabs = ({dataTab}) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((el, i)=>(
        <div className={Style.NFTTabs_box} key={i + 1}>
          <Image 
            src={el}
            alt="Profile Image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          />

          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer of $770 by 
              Shoaib Bhai
            </span>
            <small>Jun 14 - 4:12 PM</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTTabs
