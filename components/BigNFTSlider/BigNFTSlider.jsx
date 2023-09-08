import React, {useState, useEffect, useCallback} from 'react';
import Image from "next/image";
import {AiFillFire, AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";

//-- INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import { Button } from '../componentsindex';

const BigNFTSlider = () => {
    const [idNumber, setIdNumber] = useState(1);

    const sliderData = [
        {
            title: "Hello NFT",
            id: 1,
            name: "Harry Singh",
            collection: "Gym",
            price: "00000064664ETH",
            like: 243,
            image: images.user1,
            nftImage: images.nft_image_1,
            time: {
                days: 27,
                hours: 10,
                minutes: 11,
                seconds: 35,
            },
        },

        {
            title: "Buddy NFT",
            id: 2,
            name: "Maryln Smith",
            collection: "Home",
            price: "00000064664ETH",
            like: 674,
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
                days: 8,
                hours: 16,
                minutes: 4,
                seconds: 12,
            },
        },

        {
            title: "Gym",
            id: 3,
            name: "Rayyan",
            collection: "Home",
            price: "00000064664ETH",
            like: 400,
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
                days: 20,
                hours:12,
                minutes: 5,
                seconds: 35,
            },
        },

        {
            title: "Slug",
            id: 1,
            name: "Kristy Hemsworth",
            collection: "Home",
            price: "00000024664ETH",
            like: 2100,
            image: images.user4,
            nftImage: images.nft_image_2,
            time: {
                days: 12,
                hours: 45,
                minutes: 23,
                seconds: 4,
            },
        },
    ];

    // ---- Inc Func
    const inc = useCallback(()=> {
        if (idNumber + 1 < sliderData.length) {
            setIdNumber(idNumber + 1);
        }
    }, [idNumber, sliderData.length]);

    const dec = useCallback(()=> {
        if (idNumber > 0) {
            setIdNumber(idNumber - 1);
        }
    }, [idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
        <div className={Style.bigNFTSlider_box}>
            <div className={Style.bigNFTSlider_box_left}>
                <h2>{sliderData[idNumber].title}</h2>
                <div className={Style.bigNFTSlider_box_left_creator}>
                    <div className={Style.bigNFTSlider_box_left_creator_profile}>
                        <Image src={sliderData[idNumber].image}
                        alt= "Profile image" 
                        className={Style.bigNFTSlider_box_left_creator_profile_img}
                        width={50}
                        height={50}
                        />
                        <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                            <p>Creator</p>
                            <h4>
                                {sliderData[idNumber].name} 
                                <span><MdVerified/></span>
                            </h4>
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_left_creator_collection}>
                        <AiFillFire className={Style.bigNFTSlider_box_left_creator_collection_icon}/>
                        <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                            <p>Collection</p>
                            <h4>{sliderData[idNumber].collection}</h4>
                        </div>
                    </div>
                </div>

                <div className={Style.bigNFTSlider_box_left_bidding}>
                    <div className={Style.bigNFTSlider_box_left_bidding_box}>
                        <small>Create Bid</small>
                        <p>
                            {sliderData[idNumber].price}
                            <span>22,200$</span>
                        </p>
                    </div>
                    <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                        <MdTimer 
                        className={Style.bigNFTSlider_box_left_bidding_box_icon}
                        />
                        <span>Auction ending in</span>
                    </p>
                    <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>
                                {sliderData[idNumber].time.days}
                            </p>
                            <span>Days</span>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>
                                {sliderData[idNumber].time.hours}
                            </p>
                            <span>Hours</span>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>
                                {sliderData[idNumber].time.minutes}
                            </p>
                            <span>Minutes</span>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>
                                {sliderData[idNumber].time.seconds}
                            </p>
                            <span>Seconds</span>
                        </div>
                    </div>

                    <div className={Style.bigNFTSlider_box_left_button}>
                        <Button btnText="Place" handleClick= {()=>{}} />
                        <Button btnText="View" handleClick= {()=>{}} />
                    </div>
                </div>

                <div className={Style.bigNFTSlider_box_left_sliderbtn}>
                    <TbArrowBigLeftLines 
                    className={Style.bigNFTSlider_box_left_sliderbtn_icon}
                    onClick= {()=> dec()}
                    />
                    <TbArrowBigRightLines 
                    className={Style.bigNFTSlider_box_left_sliderbtn_icon}
                    onClick= {()=> inc()}
                    />
                </div>
            </div>

            <div className={Style.bigNFTSlider_box_right}>
                <div className={Style.bigNFTSlider_box_right_box}>
                    <Image src={sliderData[idNumber].nftImage}
                    alt= "NFT image"
                    className={Style.bigNFTSlider_box_right_box_img}
                    />
                    <div className={Style.bigNFTSlider_box_right_box_like}>
                        <AiFillHeart/>
                        <span>{sliderData[idNumber].like}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BigNFTSlider
