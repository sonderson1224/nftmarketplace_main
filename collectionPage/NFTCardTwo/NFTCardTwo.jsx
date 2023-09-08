import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCardTwo = ({ NFTData }) => {
  const router = useRouter();
  const { query } = router;
  const filter = query.category;
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const scrollToComponentRef = useRef(null);

  useEffect(() => {
    if (filter)
      if (scrollToComponentRef.current) {
        scrollToComponentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };
  }, []);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  return (
    <>
      {NFTData && NFTData.length > 0 ? (
        <div ref={scrollToComponentRef} className={Style.nftcardTwo}>
          {NFTData.map((el, i) => (
            <Link href={{ pathname: "/nft-Details", query: el }} key={i + 1}>
              <div className={Style.nftcardTwo_box} key={el.tokenId}>
                <div className={Style.nftcardTwo_box_like}>
                  <div className={Style.nftcardTwo_box_like_boxes}>
                    <div className={Style.nftcardTwo_box_like_box}>
                      <BsImage className={Style.nftcardTwo_box_like_box_icon} />
                      {/* <p onClick={() => likeNFT()}>
                                        {like ? <AiOutlineHeart /> : <AiFillHeart />}
                                        {""}
                                        <span>{likeInc + 1}</span>
                                    </p> */}
                    </div>
                  </div>
                </div>

                <div className={Style.nftcardTwo_box_img}>
                  <Image
                    src={el.image}
                    alt="NFT"
                    width="350"
                    height="350"
                    className={Style.nftcardTwo_box_img_img}
                  />
                </div>

                <div className={Style.nftcardTwo_box_info}>
                  <div className={Style.nftcardTwo_box_info_left}>
                    {/* <LikeProfile /> */}
                    <p>{el.name}</p>
                  </div>
                  {/* <small>4{i + 2}</small> */}
                </div>

                <div className={Style.nftcardTwo_box_price}>
                  <div className={Style.nftcardTwo_box_price_box}>
                    <small>Current Bid</small>
                    <p>{el.price}ETH</p>
                  </div>
                  <p className={Style.nftcardTwo_box_price_stock}>
                    {/* <MdTimer /> */}
                    {/* <span>{i + 1} hours left</span> */}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={Style.connect}>Nfts are currently unavailable</div>
      )}
    </>
  );
};

export default NFTCardTwo;
