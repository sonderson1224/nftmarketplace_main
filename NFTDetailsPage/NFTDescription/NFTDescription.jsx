import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import axios from "axios";

// INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";
import { NFTTabs } from "../NFTDetailsIndex";
import Loader from "../../components/Loader";
import { categoryArray } from "../../uploadNFT/UploadNFT";

// IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft, currentAccount }) => {
  const [loading, setLoading] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provenance, setProvenance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [social, setSocial] = useState();
  const [creator, setCreator] = useState();
  const [categoryImage, setcategoryImage] = useState();
  const [user, setUser] = useState();
  
  const changeLoader = () => setLoading((k) => !k);
  const router = useRouter();

  const fetchCreator = async (creatorAddress) => {
    try {
      const res = await axios.get(`/api/user?currentAccount=${creatorAddress}`);
      if (res.status == 200) {
        toast.success(res?.data?.message);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  };


  useEffect(() => {
    const init = async () => {
      if (nft) {
        console.log("details", nft);
        const selectedCategoryImg = categoryArray.find(
          (item) => item.category === nft?.category
        );
        if (selectedCategoryImg) setcategoryImage(selectedCategoryImg?.image);
        else setcategoryImage(images.creatorbackground7);
        const user = await fetchCreator(nft?.seller);
        console.log("creator", user);
        if (user) setCreator(user);
      }
    };
    init();
  }, [nft]);
  
  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const user = await fetchUser(currentAccount);
        if (user) setUser(user);
      }
    };
    init();
  }, [currentAccount]);

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provenenceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user5,
    images.user3,
    images.user7,
    images.user5,
    images.user1,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvenance(false);
      setOwner(false);
    } else if (btnText == "Provenance") {
      setProvenance(true);
      setHistory(false);
      setOwner(false);
    }
  };

  const openOwner = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvenance(false);
    } else {
      setOwner(false);
    }
  };

  // SMART CONTRACT DATA
  const { buyNFT} = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.NFTDescription}>
      {nft ? (
        <div className={Style.NFTDescription_box}>
          {/* PART ONE */}
          <div className={Style.NFTDescription_box_share}>
            <p>Virtual Worlds</p>
            <div className={Style.NFTDescription_box_share_box}>
              <MdCloudUpload
                className={Style.NFTDescription_box_share_box_icon}
                onClick={() => openSocial()}
              />

              {social && (
                <div className={Style.NFTDescription_box_share_box_social}>
                  <a href="#">
                    <TiSocialFacebook />
                    FaceBook
                  </a>
                  <a href="#">
                    <TiSocialInstagram />
                    Instagram
                  </a>
                  <a href="#">
                    <TiSocialLinkedin />
                    Linkedin
                  </a>
                  <a href="#">
                    <TiSocialTwitter />
                    Twitter
                  </a>
                  <a href="#">
                    <TiSocialYoutube />
                    YouTube
                  </a>
                </div>
              )}

              {/* <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            /> */}

              {NFTMenu && (
                <div className={Style.NFTDescription_box_share_box_social}>
                  <a href="#">
                    <BiDollar />
                    Change Price
                  </a>
                  <a href="#">
                    <BiTransferAlt />
                    Transfer
                  </a>
                  <a href="#">
                    <MdReportProblem />
                    Report Abuse
                  </a>
                  <a href="#">
                    <MdOutlineDeleteSweep />
                    Delete Item
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* PART TWO */}
          <div className={Style.NFTDescription_box_profile}>
            <h1>
              {nft.name} # {nft.tokenId}
            </h1>
            <div className={Style.NFTDescription_box_profile_box}>
              <div className={Style.NFTDescription_box_profile_box_left}>
                <Image
                  src={
                    user
                      ? user.profilePic
                        ? user.profilePic
                        : images.hero
                      : images.hero
                  }
                  className={Style.NFTDescription_box_profile_box_img}
                  alt="NFT IMAGES"
                  width={50}
                  height={50}
                />
                <div className={Style.NFTDescription_box_profile_box_left_info}>
                  <small>Creator:</small> <br />
                  <Link href={{ pathname: "/author", query: `${nft.seller}` }}>
                    <span>
                      {creator ? (
                        <>
                          {user?.firstName} {user?.lastName} <MdVerified />
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  </Link>
                </div>
              </div>

              <div className={Style.NFTDescription_box_profile_box_right}>
                <Image
                  src={categoryImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_img}
                />

                <div
                  className={Style.NFTDescription_box_profile_box_right_info}
                >
                  <small>Collection</small> <br />
                  <span>
                    {nft?.category ? nft?.category : "Other"}
                    <MdVerified />
                  </span>
                </div>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_bidding}>
              {/* <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p> */}

              {/* <div className={Style.NFTDescription_box_profile_bidding_box_timer}>
              <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
                <p>2</p>
                <span>Days</span>
              </div>
              <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
                <p>22</p>
                <span>hours</span>
              </div>
              <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
                <p>45</p>
                <span>mins</span>
              </div>
              <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
                <p>12</p>
                <span>secs</span>
              </div>
            </div> */}

              <div
                className={Style.NFTDescription_box_profile_bidding_box_price}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_bidding_box_price_bid
                  }
                >
                  <small>Current Bid</small>
                  <p>
                    {nft.price} ETH
                    {/* <span>(= $3,221.22)</span> */}
                  </p>
                </div>
                {/* <span>[96 in stock]</span> */}
              </div>

              <div className={Style.NFTDescription_box_profile_bidding_box_btn}>
                
                  {currentAccount &&
                  nft.owner &&
                  currentAccount.toLowerCase() === nft.owner.toLowerCase() ? (
                    <Button
                      icon={<FaWallet />}
                      btnText="List on Marketplace"
                      handleClick={() => {
                        console.log("owner");
                        router.push(
                          `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&price=${nft.price}`
                        );
                      }}
                      classStyle={Style.button}
                    />
                  ) : (
                    <Button
                      icon={<FaPercentage />}
                      btnText="Buy NFT"
                      handleClick={() => {
                        changeLoader();
                        buyNFT(nft.tokenId, () => changeLoader());
                      }}
                      classStyle={Style.button}
                    />
                  )}
                
                {/* {currentAccount.toLowerCase() == nft.owner.toLowerCase() ? (
                  <Button
                    icon={<FaWallet />}
                    btnText="List on Marketplace"
                    handleClick={() => {
                      console.log("owner");
                      router.push(
                        `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&price=${nft.price}`
                      );
                    }}
                    classStyle={Style.button}
                  />
                ) : (
                  <>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {nft.tokenId ? (
                          <></>
                        ) : (
                          <Button
                            icon={<FaPercentage />}
                            btnText="Buy NFT"
                            handleClick={() => {
                              changeLoader();
                              buyNFT(nft.tokenId, () => changeLoader());
                            }}
                            classStyle={Style.button}
                          />
                        )}
                        <Loader />
                      </>
                    )}
                  </>
                )} */}

                {/* <Button
                  icon={<FaPercentage />}
                  btnText="Buy NFT"
                  handleClick={() => {
                    changeLoader();
                    buyNFT(nft.tokenId, () => changeLoader());
                  }}
                  classStyle={Style.button}
                /> */}

                {/* <Button
                icon={<FaPercentage />}
                btnText="Make Offer"
                handleClick={() => { }}
                classStyle={Style.button}
              /> */}
              </div>

              {/* <div className={Style.NFTDescription_box_profile_bidding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provenance</button>
              <button onClick={() => openOwner()}>Owner</button>
            </div> */}

              {/* {history && (
              <div className={Style.NFTDescription_box_profile_bidding_box_tabs_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provenance && (
              <div className={Style.NFTDescription_box_profile_bidding_box_tabs_card}>
                <NFTTabs dataTab={provenenceArray} />
              </div>
            )}
            {owner && (
              <div className={Style.NFTDescription_box_profile_bidding_box_tabs_card}>
                <NFTTabs dataTab={ownerArray} />
              </div>
            )} */}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default NFTDescription;
