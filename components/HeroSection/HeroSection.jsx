import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from '../componentsindex';
import images from "../../img";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext'


const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const handleClick = () => {

  }

  return (
    <div className={Style.herosection}>
      <div className={Style.herosection_box}>
        <div className={Style.herosection_box_left}>
          <h1>{titleData}</h1>
          <p>
            Unearth the most outstanding NFTs in every aspect of life.
            Create your NFTs and sell them
          </p>
          <div className={Style.herosection_box_left_btn}>
            <Link href={{pathname: "/search"}}>
              <Button handleClick={handleClick}  btnText="Search" />
            </Link>
          </div>
        </div>

        <div className={Style.herosection_box_right}>
          <Image src={images.hero} alt='hero'  priority={true} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
