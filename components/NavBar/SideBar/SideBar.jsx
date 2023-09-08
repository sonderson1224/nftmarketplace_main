import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedUp,
  TiArrowSortedDown
} from 'react-icons/ti';
import { useRouter } from 'next/router';

// INTERNAL IMPORT
import Style from './SideBar.module.css';
import images from '../../../img';
import Button from '../../Button/Button';

const discover = [
  {
    name: "Collection",
    link: "collection"
  },

  {
    name: "Search",
    link: "search"
  },

  {
    name: "Author Profile",
    link: "author"
  },

  {
    name: "NFT Details",
    link: "nft-Details"
  },

  {
    name: "Account Settings",
    link: "account"
  },

  {
    name: "Connect Wallet",
    link: "connectWallet"
  },

  // {
  //   name: "Blog",
  //   link: "blog"
  // },
]

const helpCenter = [
  {
    name: "About",
    link: "about"
  },

  // {
  //   name: "Contact Us",
  //   link: "contactus"
  // },

  // {
  //   name: "Sign Up",
  //   link: "sign-up"
  // },

  // {
  //   name: "Sign In",
  //   link: "sign-in"
  // },

  // {
  //   name: "Subscription",
  //   link: "subscription"
  // },
]

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  // ----- USE STATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  }

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  }

  const closeSideBar = () => {
    setOpenSideMenu(false);
  }

  const router = useRouter()

  return (
    <div className={Style.sideBar}>
      <GrClose className={Style.sideBar_colseBtn} onClick={() => closeSideBar()} />
      <div className={Style.sideBar_box}>
        <Image
          src={images.logo}
          alt="Logo"
          width={150}
          height={150}
        />
        <p>Discover the most outstanding articles on all topics NFT, create your own stories and share them.</p>
        <div className={Style.sideBar_social}>
          <a href="#"><TiSocialFacebook /></a>
          <a href="#"><TiSocialLinkedin /></a>
          <a href="#"><TiSocialTwitter /></a>
          <a href="#"><TiSocialInstagram /></a>
          <a href="#"><TiSocialYoutube /></a>
        </div>
      </div>
      <div className={Style.sideBar_menu}>
        <div className={Style.sideBar_menu_box} onClick={() => openDiscoverMenu()}>
          <p>Discover</p>
          <TiArrowSortedDown />
        </div>

        {openDiscover && (
          <div className={Style.sideBar_discover}>
            {discover.map((el, i) => (
              <p key={i + 1}>
                <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
              </p>
            ))}
          </div>
        )}

        <div className={Style.sideBar_menu_box} onClick={() => openHelpMenu()}>
          <p>Help Center</p>
          <TiArrowSortedDown />
        </div>

        {openHelp && (
          <div className={Style.sideBar_discover}>
            {helpCenter.map((el, i) => (
              <p key={i + 1}>
                <Link href={{pathname: `${el.link}`}}> {el.name} </Link>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className={Style.sideBar_button}>
        {
          currentAccount == "" ? (
            <Button btnText="Connect Wallet" handleClick={() => connectWallet()} />
          ) : (
              <Button btnText="Create" handleClick={() => router.push("/uploadnft")} />

          )
        }


      </div>
    </div>
  )
}

export default SideBar
