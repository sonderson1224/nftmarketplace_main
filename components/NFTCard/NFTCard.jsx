import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = ({ NFTdata }) => {
  // const featureArray = [
  //   images.nft_image_1,
  //   images.nft_image_3,
  //   images.nft_image_2,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  // ];
  const [likes, setLikes] = useState(new Array(NFTdata.length).fill(false));

  const likeNFT = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  return (
    <div className={Style.nftcard}>
      {NFTdata.map((el, i) => (
        <Link key={i} href={{ pathname: "/nft-Details", query: el }}>
          <div className={Style.nftcard_box} key={i + 1}>
            <div className={Style.nftcard_box_img}>
              <Image
                src={el.image}
                alt="NFTimage"
                width={400}
                height={400}
                className={Style.nftcard_box_img_img}
              />
            </div>

            <div className={Style.nftcard_box_update}>
              <div className={Style.nftcard_box_update_left}>
                <div
                  className={Style.nftcard_box_update_left_like}
                  onClick={() => likeNFT(i)}
                >
                  {likes[i] ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart
                      className={Style.nftcard_box_update_left_like_icon}
                    />
                  )}
                  {likes[i] ? likes[i] + 0 : 0}
                </div>
              </div>

              <div className={Style.nftcard_box_update_right}>
                <div className={Style.nftcard_box_update_right_info}>
                  <small>Time Left</small>
                  <p>0h : 0m : 00s</p>
                </div>
              </div>
            </div>

            <div className={Style.nftcard_box_update_details}>
              <div className={Style.nftcard_box_update_details_price}>
                <div className={Style.nftcard_box_update_details_price_box}>
                  <h4>
                    {el.name} #{el.tokenId}
                  </h4>
                  <div className={Style.nftcard_box_update_details_price_boxes}>
                    <div
                      className={Style.nftcard_box_update_details_price_box_bid}
                    >
                      <small>Current Bid</small>
                      <p>{el.price}</p>
                    </div>
                    <div
                      className={
                        Style.nftcard_box_update_details_price_box_stock
                      }
                    >
                      <small>1 in stock</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Style.nftcard_box_update_details_category}>
                <BsImage />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
