import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";

// INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Profile = ({ currentAccount, user }) => {
  // const [user, setUser] = useState();
  const { owner } = useContext(NFTMarketplaceContext);
  // const fetchUser = async (currentAccount) => {
  //   try {
  //     const res = await axios.get(`/api/user?currentAccount=${currentAccount}`);
  //     if (res.status == 200) {
  //       toast.success(res?.data?.message);
  //       return res?.data?.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     error?.response?.data?.message &&
  //       toast.error(error?.response?.data?.message);
  //     toast.error(`Error occured submitting form...${error?.message}`);
  //   }
  // };

  // useEffect(() => {
  //   const init = async () => {
  //     if (currentAccount) {
  //       const user = await fetchUser(currentAccount);
  //       console.log(user);
  //       if (user) setUser(user);
  //     }
  //   };
  //   init();
  // }, [currentAccount]);

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={
            user
              ? user.profilePic
                ? user.profilePic
                : images.hero
              : images.hero
          }
          alt="User Profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />
        <div className={Style.profile_account_info}>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <small>{currentAccount.slice(0, 17)}...</small>
        </div>
      </div>
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>

          {/* <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/author" }}>My Items</Link>
            </p>
          </div> */}

          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>

          {owner.toLowerCase() === currentAccount.toLowerCase() && (
            <div className={Style.profile_menu_one_item}>
              <FaRegImage />
              <p>
                <Link href={{ pathname: "/withdraw" }}>Withdraw</Link>
              </p>
            </div>
          )}

          {owner.toLowerCase() === currentAccount.toLowerCase() && (
            <div className={Style.profile_menu_one_item}>
              <FaUserEdit />
              <p>
                <Link href={{ pathname: "/updatelistprice" }}>
                  Update List Price
                </Link>
              </p>
            </div>
          )}
        </div>
        <div className={Style.profile_menu_two}>
          {/* <div className={Style.profile_menu_one_item}>
            <MdHelpCenter/>
            <p><Link href={{pathname: '/contactus'}}>Help</Link></p>
          </div> */}
          {/* <div className={Style.profile_menu_one_item}>
            <TbDownload/>
            <p><Link href={{pathname: '/disconnect'}}>Disconnect</Link></p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
