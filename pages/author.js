import React, { useState, useEffect, useContext } from 'react';

// INTERNAL IMPORT 
import Style from "../styles/author.module.css";
import { Banner } from '../collectionPage/collectionPageIndex';
import { Brand, Title } from '../components/componentsindex';
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard';
import images from "../img";
import {
    AuthorNFTCardBox,
    AuthorProfileCard,
    AuthorTaps
} from '../authorPage/componentIndex';
import {FollowerTab} from "../components/componentsindex"
import toast from "react-hot-toast";
import axios from 'axios';

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const author = () => {
    const [user, setUser] = useState();
    const [collectibles, setCollectibles] = useState(true);
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);

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

    const followerArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
    ];

    // SMART CONTRACT DATA
    const { fetchMyNFTsOrListedNFTs, currentAccount,
    } = useContext(NFTMarketplaceContext);



    const [nfts, setNFTs] = useState([]);
    const [myNFTs, setMyNFTs] = useState([]);

    useEffect(() => {
        if (currentAccount)
            fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
                console.log("listed", items)
                // console.log(items)
                setNFTs(items);
            });
    }, [currentAccount])

    useEffect(() => {
        if (currentAccount)
            fetchMyNFTsOrListedNFTs("getMyNFTs").then((items) => {
                console.log("author", items);
                setMyNFTs(items);
            });
    }, [currentAccount]);

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
        <div className={Style.author}>
            <Banner bannerImage={images.creatorbackground2} />
            <AuthorProfileCard currentAccount={currentAccount} />
            <AuthorTaps
                setCollectibles={setCollectibles}
                setCreated={setCreated}
                setLike={setLike}
                setFollower={setFollower}
                setFollowing={setFollowing}
            />
            <AuthorNFTCardBox
                collectibles={collectibles}
                created={created}
                like={like}
                follower={follower}
                following={following}
                nfts={nfts}
                myNFTs={myNFTs}
            />

            {/* <Title
                heading="Popular Creators"
                paragraph="Click on music icon and enjoy NTF music or audio"
            /> */}


            {/* <div className={Style.author_box}>
                {followerArray.map((el, i) => (
                    <FollowerTabCard key={i} i={i} el={el} />
                ))}
            </div> */}
            <Brand />
        </div>
    );
};

export default author;
