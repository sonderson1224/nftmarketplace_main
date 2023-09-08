import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { 
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
 } from 'react-icons/md';
 import {FiCopy} from "react-icons/fi";
 import { 
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
 } from 'react-icons/ti';
 import { BsThreeDots } from 'react-icons/bs';
import toast from "react-hot-toast";
import axios from 'axios'

// INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../img";
import { Button } from '../../components/componentsindex';

const AuthorProfileCard = ({ currentAccount }) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [user, setUser] = useState();

  const fetchUser = async (currentAccount) => {
    try {
      const res = await axios.get(`/api/user?currentAccount=${currentAccount}`);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      // error?.response?.data?.message && toast.error(error?.response?.data?.message)
      // toast.error(`Error occured submitting form...${error?.message}`)
    }
  }


  // Copy Address Function
  const copyAddress= () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = ()=> {
    if (!share) {
      setShare(true);
      setReport(false);
    }else {
      setShare(false);
    }
  };

  const openReport = ()=> {
    if (!report) {
      setReport(true);
      setShare(false);
    }else {
      setReport(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const user = await fetchUser(currentAccount);
        if (user) setUser(user)
      }
    }
    init();
  }, [currentAccount])

  return (
    user && (
      <div className={Style.AuthorProfileCard}>
        <div className={Style.AuthorProfileCard_box}>
          <div className={Style.AuthorProfileCard_box_img}>
            <Image
              src={
                user
                  ? user.profilePic
                    ? user.profilePic
                    : images.hero
                  : images.hero
              }
              className={Style.AuthorProfileCard_box_img_img}
              alt="NFT IMAGES"
              width={220}
              height={220}
            />
          </div>

          <div className={Style.AuthorProfileCard_box_info}>
            <h2>
              {user?.firstName} <br/> {user?.lastName}
              <span>
                <MdVerified />
              </span>
              {""}
            </h2>

            <div className={Style.AuthorProfileCard_box_info_address}>
              <input type="text" defaultValue={currentAccount} id="myInput" />
              <FiCopy
                className={Style.AuthorProfileCard_box_info_address_icon}
                onClick={() => copyAddress()}
              />
            </div>

            <p>{user?.description}</p>

            <div className={Style.AuthorProfileCard_box_info_social}>
              <a href={user?.facebookUrl}>
                <TiSocialFacebook />
              </a>
              <a href={user?.instagramUrl}>
                <TiSocialInstagram />
              </a>
              <a href={user?.linkedinUrl}>
                <TiSocialLinkedin />
              </a>
              <a href={user?.youtubeUrl}>
                <TiSocialYoutube />
              </a>
            </div>
          </div>

          <div className={Style.AuthorProfileCard_box_share}>
            <Button btnText="Follow" handleClick={() => {}} />
            <MdCloudUpload
              onClick={() => openShare()}
              className={Style.AuthorProfileCard_box_share_icon}
            />

            {share && (
              <div className={Style.AuthorProfileCard_box_share_upload}>
                <p>
                  <span>
                    <TiSocialFacebook />
                  </span>
                  {""}
                  {""}
                  FaceBook
                </p>
                <p>
                  <span>
                    <TiSocialInstagram />
                  </span>
                  {""}
                  {""}
                  Instagram
                </p>
                <p>
                  <span>
                    <TiSocialLinkedin />
                  </span>
                  {""}
                  {""}
                  Linkdin
                </p>
                <p>
                  <span>
                    <TiSocialYoutube />
                  </span>
                  {""}
                  {""}
                  YouTube
                </p>
              </div>
            )}

            {/* <BsThreeDots
              onClick={() => openReport()}
              className={Style.AuthorProfileCard_box_share_icon}
            /> */}

            {report && (
              <p className={Style.AuthorProfileCard_box_share_report}>
                <span>
                  <MdOutlineReportProblem />
                </span>
                {""}
                Report Abuse
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AuthorProfileCard


