import React from 'react';
import Image from 'next/image';
import {TiSocialFacebook, 
  TiSocialLinkedin, 
  TiSocialTwitter, 
  TiSocialYoutube, 
  TiSocialInstagram, 
  TiArrowSortedUp, 
  TiArrowSortedDown} from 'react-icons/ti';
import {RiSendPlaneFill} from 'react-icons/ri';

// INTERNAL IMPORT
import Style from './Footer.module.css';
import images from '../../img';
import {Discover, HelpCenter} from '../NavBar/index';

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="Footer Logo"
          width={100}
          height={100}
          />
          <p>
          The world’s first and largest digital marketplace for crypto
          collectibles  and non-fungible tokens (NFTs). 
          Buy, sell, and discover exclusive digital items.
          </p>
         {/* <div className={Style.footer_social}>
          <a href="#"><TiSocialFacebook/></a>
          <a href="#"><TiSocialLinkedin/></a>
          <a href="#"><TiSocialTwitter/></a>
          <a href="#"><TiSocialInstagram/></a>
          <a href="#"><TiSocialYoutube/></a>
         </div> */}
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>
        {/* <div className={Style.subscribe}>
          <div className={Style.subscribe_box}>
            <input type={'email'} placeholder="Enter email address" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>

          <div className={Style.subscribe_box_info}>
            <p>
            Discover, collect, and sell extraordinary NFTs <br/>
            <strong>Welcome</strong> to the <strong>wonderland</strong> of NFTs...
            </p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Footer
