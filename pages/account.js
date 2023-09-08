import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import toast from "react-hot-toast";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti';
import dotenv from "dotenv";

dotenv.config({ path: "config.env" })

// INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import { Form } from '../AccountPage/AccountPage';
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';
import { Button } from '../components/componentsindex';
const account = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [user, setUser] = useState();
  const [wallet, setWallet] = useState();

  const fetchUser = async (currentAccount) => {
    try {
      const res = await axios.get(`/api/user?currentAccount=${currentAccount}`);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      error?.response?.data?.message && toast.error(error?.response?.data?.message)
      toast.error(`Error occured submitting form...${error?.message}`)
    }
  }

  const handleClick = async () => {
    console.log(fileUrl)
  }

  const upload = async (formData, walletAdd) => {
    if (!walletAdd) {
      console.log(walletAdd)
      toast.error("connect wallet");
      return;
    }
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dbtew7i90/image/upload',
        formData
      );


      if (!res.status == 200) toast.error("Image upload is not succesful")
      const data = {
        link: res?.data?.secure_url,
        currentAccount: walletAdd,
      }
      console.log(res?.data?.secure_url)

      const imageUpload = await axios.post('/api/upload', data);
      if (imageUpload.status == 200) {
        toast.success(imageUpload?.data?.message);
        return res?.data?.data;
      }

    } catch (error) {
      console.log(error);
      error?.response?.data?.message && toast.error(error?.response?.data?.message)
      toast.error(`Image upload error:...${error?.message}`)
    }
  }

  useEffect(() => {
    const init = async () => {
      if (fileUrl) {
        // console.log("user",user)
        const formData = new FormData();
        formData.append('file', fileUrl);
        formData.append('upload_preset', 'ml_default');
        // const wallet = currentAccount;
        // console.log("add", currentAccount)
        await upload(formData, currentAccount);
      }
    }
    init();
  }, [fileUrl]);

  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const user = await fetchUser(currentAccount);
        if (user) setUser(user)
      }
    }
    init();
  }, [currentAccount])



  const onDrop = useCallback(async (acceptedFile) => {
    // console.log(acceptedFile[0])
    setFileUrl(acceptedFile[0]);
    
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account} >
      <div className={Style.account_info}>
        <h1 onClick={() => console.log(user)}>Profile Settings</h1>
        <p>
          You can set preferred display name, create your profile URL
          manage other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        {user &&
          <div className={Style.account_box_img} {...getRootProps()}>
            <input type='image' {...getInputProps()} />
            <label htmlFor="image">Change Image</label>
            {fileUrl ?
              <Image
                src={URL.createObjectURL(fileUrl)}
                alt="account upload"
                width={150}
                height={150}
                className={Style.account_box_img_img}
              />
              :
              <Image
                src={user && user.profilePic ? user.profilePic : images.user1}
                alt="account upload"
                width={150}
                height={150}
                className={Style.account_box_img_img}
              />
            }

            {/* <div className={Style.account_box_img_para}>
              <Button btnText="Change Image" handleClick={handleClick} />
            </div> */}
          </div>}

        <div className={Style.account_box_form}>
          {user ? <div>
            <div className={Style.NFTDescription_box_profile_bidding_box_price}>
              <div className={Style.NFTDescription_box_profile_bidding_box_price_bid}>
                <small>Name</small>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_bidding_box_price}>
              <div className={Style.NFTDescription_box_profile_bidding_box_price_bid}>
                <small>Email</small>
                <p>
                  {user.email}
                </p>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_bidding_box_price}>
              <div className={Style.NFTDescription_box_profile_bidding_box_price_bid}>
                <small>Description</small>
                <p>
                  {user.description}
                </p>
              </div>
            </div>
            <div className={Style.NFTDescription_box_share_box_social}>
              <a href={user?.facebookUrl}>
                <TiSocialFacebook />
                Facebook {" "}
                {user?.facebookUrl}
              </a>
              <br />
              <br />
              <a href={user?.instagramUrl}>
                <TiSocialInstagram />
                Instagram {" "}
                {user?.instagramUrl}
              </a>
              <br />
              <br />
              <a href={user?.twitterUrl}>
                <TiSocialTwitter />
                Twitter {" "}
                {user?.twitterUrl}
              </a>
              <br />
              <br />
              <a href={user?.website}>
                <TiSocialYoutube />
                Website {" "}
                {user?.website}
              </a>
            </div>
          </div> :
            <Form />}
        </div>
      </div>
    </div>
  )
}

export default account
