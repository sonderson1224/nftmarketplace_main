import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { DiJqueryLogo } from "react-icons/di";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
import { useClickOutside } from "./useClickOutside";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  // USESTATE COMPONENTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [user, setUser] = useState();
  const [input, setInputValue] = useState("");

  const router = useRouter();

  const menuRef = useRef(null); // Create a ref for the navbar_container_right_discover_box
  const profileRef = useRef(null); // Create a ref for the profile menu
  const notificationRef = useRef(null)

  const closeAllMenus = () => {
    setDiscover(false);
    setHelp(false);
    setNotification(false);
    setProfile(false);
    setOpenSideMenu(false);
  };

  useClickOutside(menuRef, closeAllMenus); // Apply the click outside functionality to the menu
  useClickOutside(profileRef, () => setProfile(false)); // Apply the click outside functionality to the profile menu
  useClickOutside(notificationRef, () => setNotification(false));

  // FUNCTIONS
  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setDiscover(false);
      setHelp(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  // SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError, searchNft } = useContext(
    NFTMarketplaceContext
  );

  const handleSearch = (word) => {
    if (!word) {
      toast.error("cannot search for empty word");
      return;
    }
    searchNft(word);
  };

  // -- FETCH USER
  const fetchUser = async (currentAccount) => {
    try {
      const res = await axios.get(`/api/user?currentAccount=${currentAccount}`);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      // if (error?.response.message) {
      //   toast.error(error?.response?.message);
      //   return;
      // }
      // if (error?.response?.data?.message) {
      //   toast.error(error?.response?.data?.message);
      //   return;
      // }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const user = await fetchUser(currentAccount);
        if (user) setUser(user);
      }
    };
    init();
  }, [currentAccount]);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input
                type="text"
                placeholder="Search NFT"
                value={input}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <BsSearch
                onClick={() => handleSearch(input)}
                className={Style.search_icon}
              />
            </div>
          </div>
        </div>
        {/* END OF NAV LEFT SECTION */}

        {/* START OF NAV RIGHT SECTION */}
        <div className={Style.navbar_container_right}>
          {/* DISCOVER MENU */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>

            {discover && (
              <div
                ref={menuRef}
                className={Style.navbar_container_right_discover_box}
              >
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <Link href={{ pathname: "/about" }}>
              <p> About </p>
            </Link>

            {/* {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )} */}
          </div>

          {/* NOTIFICATION MENU */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => setNotification(!notification)}
            />

            {notification && (
              <div ref={notificationRef}>
                <Notification currentAccount={currentAccount} user={user} />
              </div>
            )}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button
                btnText="Connect"
                handleClick={() => router.push("/connectWallet")}
              />
            ) : (
              <Button
                btnText="Create"
                handleClick={() => router.push("/uploadnft")}
              />
            )}
            {/* <a href='trust://'>
              <Button btnText="Trust Wallet" handleClick={()=>{}}/>
            </a> */}
          </div>

          {/* USER PROFILE MENU */}

          <div className={Style.navbar_container_right_prfile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={
                  user
                    ? user.profilePic
                      ? user.profilePic
                      : images.hero
                    : images.hero
                }
                alt="Profile"
                width={40}
                height={40}
                onClick={() => setProfile(!profile)}
                className={Style.navbar_container_right_profile}
              />

              {profile && (
                <div ref={profileRef}>
                  <Profile currentAccount={currentAccount} user={user} />
                </div>
              )}
            </div>
          </div>

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menubtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
