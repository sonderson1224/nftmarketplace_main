import React, { useState, useContext } from "react";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImage,
  FaUserAlt,
  FaImages,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";


// INTERNAL IMPORT
import Style from "./Filter.module.css";
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext'

const Filter = ({ changeLoader }) => {
  const { categoryArr, filterNft } = useContext(NFTMarketplaceContext);
  // USE STATES
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);

  const uniqueArr = categoryArr.reduce((accumulator, value) => {
    if (!accumulator.includes(value)) {
      accumulator.push(value);
    }
    return accumulator;
  }, []);


  // FUNCTION SECTION
  const openFilter = () => {
    if (!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  const openImage = () => {
    if (!image) {
      setImage(true);
    } else {
      setImage(false);
    }
  };

  const openMusic = () => {
    if (!music) {
      setMusic(true);
    } else {
      setMusic(false);
    }
  };

  const openVideo = () => {
    if (!video) {
      setVideo(true);
    } else {
      setVideo(false);
    }
  }

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          {categoryArr && categoryArr.length > 0 &&
            <>
              <>
                {uniqueArr.map((item, i) =>
                (<button
                  className={Style.filterBtn}
                  key={i}
                  onClick={() => { changeLoader(); filterNft(item, () => changeLoader()) }}
                >{item}
                </button>
                ))
                }
              </>
              <button
                onClick={() => { changeLoader(); filterNft(null, () => changeLoader()) }}
              >Other
              </button>
            </>
          }
        </div>

        {/* <></> */}

        <div className={Style.filter_box_right}>
          <div
            className={Style.filter_box_right_box}
            onClick={() => openFilter()}
          >
            <FaFilter />
            <span>Filter</span>
            {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {filter && (
        <div className={Style.filter_box_items}>
          {/* <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaWallet />
              <span>10ETH</span>
              <AiFillCloseCircle />
            </div>
          </div> */}

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openImage()}
            >
              <FaImages />
              <small>Images</small>
              {image ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openVideo()}
            >
              <FaVideo />
              <small>Videos</small>
              {video ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openMusic()}
            >
              <FaImages />
              <small>Music</small>
              {music ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item}
            >
              <FaUserAlt />
              <span>Verified</span>
              <MdVerified />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
