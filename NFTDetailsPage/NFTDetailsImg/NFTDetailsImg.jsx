import React, {useState} from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

// INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";
import Loader from "../../components/Loader";

const NFTDetailsImg = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const likeNft = () => {
    if (!like) {
      setLike(true);
    }else {
      setLike(false);
    }
  };

  const openDescription = ()=> {
    if (!description) {
      setDescription(true);
    }else {
      setDescription(false);
    }
  };

  const openDetails = ()=> {
    if (!details) {
      setDetails(true);
    }else {
      setDetails(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      {nft ? (
        <div className={Style.NFTDetailsImg_box}>
          <div className={Style.NFTDetailsImg_box_nft}>
            <div className={Style.NFTDetailsImg_box_nft_like}>
              <BsImages className={Style.NFTDetailsImg_box_nft_like_icon} />
              {/* <p onClick={()=> likeNft()}>
              {like ? (
                <AiOutlineHeart 
                  className={Style.NFTDetailsImg_box_nft_like_icon}
                />
              ) : (
                <AiFillHeart 
                    className={Style.NFTDetailsImg_box_nft_like_icon}
                />
              )}
              <span>23</span>
            </p> */}
            </div>

            <div className={Style.NFTDetailsImg_box_nft_img}>
              <Image
                src={
                  nft.image ? nft.image : "http://via.placeholder.com/500x500"
                }
                className={Style.NFTDetailsImg_box_nft_img_img}
                alt="NFT image"
                width={600}
                height={500}
                loading="lazy"
              />
            </div>
          </div>

          <div
            className={Style.NFTDetailsImg_box_description}
            onClick={() => openDescription()}
          >
            <p>Description</p>
            {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {description && (
            <div className={Style.NFTDetailsImg_box_description_box}>
              <p>{nft.description}</p>
            </div>
          )}

          <div
            className={Style.NFTDetailsImg_box_details}
            onClick={() => openDetails()}
          >
            <p>Details</p>
            {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {details && (
            <div className={Style.NFTDetailsImg_box_details_box}>
              <small>2000 x 2000 px.IMAGE(685KB)</small>
              <p>
                <small>Seller Address</small>
                <br />
                {nft.seller}
              </p>
              <p>
                <small>Token ID</small> {nft.tokenId}
              </p>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default NFTDetailsImg
