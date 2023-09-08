import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./NftComponent.module.css";
import Nftimgs from "./Nftimgs/Nftimgs";
import images from "../../img";
import image from "../../nftimgs";
import { Button } from "../componentsindex";

const NftComponent = () => {
  //   const [popular, setPopular] = useState(true);
  //   const [following, setFollowing] = useState(false);
  //   const [news, setNews] = useState(false);

  const CardArray = [
    {
      background: image.img1,
      user: images.user1,
    },
    {
      background: image.img2,
      user: images.user2,
    },
    {
      background: image.img3,
      user: images.user3,
    },
    {
      background: image.img4,
      user: images.user4,
    },
    {
      background: image.img5,
      user: images.user5,
    },
    {
      background: image.img6,
      user: images.user6,
    },
    {
      background: image.img7,
      user: images.user7,
    },
    {
      background: image.img8,
      user: images.user8,
    },
    {
      background: image.img9,
      user: images.user8,
    },
    {
      background: image.img10,
      user: images.user8,
    },
    {
      background: image.img11,
      user: images.user8,
    },
    {
      background: image.img12,
      user: images.user8,
    },
    {
      background: image.img13,
      user: images.user8,
    },
    {
      background: image.img14,
      user: images.user8,
    },
    {
      background: image.img15,
      user: images.user8,
    },
    {
      background: image.img16,
      user: images.user8,
    },
    {
      background: image.img17,
      user: images.user8,
    },
    {
      background: image.img18,
      user: images.user8,
    },
    {
      background: image.img19,
      user: images.user8,
    },
    {
      background: image.img20,
      user: images.user8,
    },
    {
      background: image.img21,
      user: images.user8,
    },
    {
      background: image.img22,
      user: images.user8,
    },
    {
      background: image.img23,
      user: images.user8,
    },
    {
      background: image.img24,
      user: images.user8,
    },
    {
      background: image.img25,
      user: images.user8,
    },
    {
      background: image.img26,
      user: images.user8,
    },
    {
      background: image.img27,
      user: images.user8,
    },
    {
      background: image.img28,
      user: images.user8,
    },
    {
      background: image.img29,
      user: images.user8,
    },
    {
      background: image.img30,
      user: images.user8,
    },
    {
      background: image.img31,
      user: images.user8,
    },
    {
      background: image.img32,
      user: images.user8,
    },
    {
      background: image.img33,
      user: images.user8,
    },
    {
      background: image.img34,
      user: images.user8,
    },
    {
      background: image.img35,
      user: images.user8,
    },
    {
      background: image.img36,
      user: images.user8,
    },
    {
      background: image.img37,
      user: images.user8,
    },
    {
      background: image.img38,
      user: images.user8,
    },
    {
      background: image.img39,
      user: images.user8,
    },

    {
      background: image.img40,
      user: images.user8,
    },
    {
      background: image.img41,
      user: images.user8,
    },
    {
      background: image.img42,
      user: images.user8,
    },
    {
      background: image.img43,
      user: images.user8,
    },
    {
      background: image.img44,
      user: images.user8,
    },
    {
      background: image.img45,
      user: images.user8,
    },
    {
      background: image.img46,
      user: images.user8,
    },
    {
      background: image.img47,
      user: images.user8,
    },
    {
      background: image.img48,
      user: images.user8,
    },
    {
      background: image.img49,
      user: images.user8,
    },

    {
      background: image.img50,
      user: images.user8,
    },
    {
      background: image.img51,
      user: images.user8,
    },
    {
      background: image.img52,
      user: images.user8,
    },
    {
      background: image.img53,
      user: images.user8,
    },
    {
      background: image.img54,
      user: images.user8,
    },
    {
      background: image.img55,
      user: images.user8,
    },
    
    {
      background: image.img57,
      user: images.user8,
    },
    {
      background: image.img58,
      user: images.user8,
    },
    {
      background: image.img60,
      user: images.user8,
    },
    {
      background: image.img62,
      user: images.user8,
    },
   
    {
      background: image.img64,
      user: images.user8,
    },
    {
      background: image.img65,
      user: images.user8,
    },
    
    {
      background: image.img68,
      user: images.user8,
    },
    {
      background: image.img69,
      user: images.user8,
    },
    {
      background: image.img70,
      user: images.user8,
    },
  ];

//   const FollowingArray = [
//     {
//       background: image.img10,
//       user: images.user2,
//     },
//     {
//       background: image.img14,
//       user: images.user1,
//     },

//     {
//       background: image.img17,
//       user: images.user4,
//     },
//     {
//       background: image.img29,
//       user: images.user5,
//     },
//     {
//       background: image.img50,
//       user: images.user3,
//     },
//     {
//       background: image.img3,
//       user: images.user6,
//     },
//     {
//       background: image.img5,
//       user: images.user7,
//     },
//     {
//       background: image.img4,
//       user: images.user8,
//     },
//     {
//       background: image.img7,
//       user: images.user8,
//     },
//   ];

//   const NewsArray = [
//     {
//       background: image.img25,
//       user: images.user1,
//     },
//     {
//       background: image.img16,
//       user: images.user2,
//     },
//     {
//       background: image.img12,
//       user: images.user3,
//     },
//     {
//       background: image.img13,
//       user: images.user4,
//     },
//     {
//       background: image.img17,
//       user: images.user5,
//     },
//     {
//       background: image.img18,
//       user: images.user6,
//     },
//     {
//       background: image.img20,
//       user: images.user7,
//     },
//     {
//       background: image.img21,
//       user: images.user8,
//     },
//     {
//       background: image.img27,
//       user: images.user8,
//     },
//   ];

  //   const openPopular = () => {
  //     if (!popular) {
  //       setPopular(true);
  //       setFollowing(false);
  //       setNews(false);
  //     }
  //   };

  //   const openFollower = () => {
  //     if (!following) {
  //       setPopular(false);
  //       setFollowing(true);
  //       setNews(false);
  //     }
  //   };

  //   const openNews = () => {
  //     if (!news) {
  //       setPopular(false);
  //       setFollowing(false);
  //       setNews(true);
  //     }
  //   };

  return (
    <div className={Style.collection}>
      {/* <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={() => openPopular()}>
              <BsFillAlarmFill /> 24 hours
            </button>
            <button onClick={() => openFollower()}>
              <BsCalendar3 /> 7 days
            </button>
            <button onClick={() => openNews()}>
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div> */}

      <div className={Style.collection_box}>
        {CardArray.map((el, i) => (
          <Nftimgs key={i + 1} el={el} i={i} />
        ))}
      </div>

      {/* <div className={Style.collection_box}>
        {FollowingArray.map((el, i) => (
          <DaysComponents key={i + 1} el={el} i={i} />
        ))}
      </div> */}

      {/* <div className={Style.collection_box}>
        {NewsArray.map((el, i) => (
          <DaysComponents key={i + 1} el={el} i={i} />
        ))}
      </div> */}

      {/* <Link href={{ pathname: "/collection" }}>
        <div className={Style.btn}>
          <Button btnText="Show More" handleClick={() => {}} />
        </div>
      </Link> */}
    </div>
  );
};

export default NftComponent;
