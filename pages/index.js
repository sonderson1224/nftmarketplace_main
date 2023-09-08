import React, { useContext, useEffect, useState } from "react";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";

import { getTopCreators } from "../TopCreator/TopCreator";
// import tawkToScript from "../tawkToScript"

// IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletIsConnected } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const { fetchNFTs, filteredArr } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [creators, setCreators] = useState([]);
  const [nftsCopy, setNftscopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading((hartman) => !hartman);

  // CREATOR LIST
  // const creators = nfts && getTopCreators(nfts);

  useEffect(() => {
    const init = async () => {
      const myNfts = await fetchNFTs();
      setNfts(myNfts);
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (nfts && nfts.length > 0) setCreators(getTopCreators(nfts));
    };
    init();
  }, [nfts]);

  // useEffect(() => {
  //     tawkToScript;
  // }, []);

  return (
    <div className={Style.homepage}>
      <HeroSection />
      {/* <Service /> */}
      {/* <BigNFTSlider /> */}
      {/* <Title 
        heading='Audio Collection' 
        paragraph='Tune into the world of extraordinary audio collections' />
      <AudioLive /> */}
      {creators && creators.length > 0 ? (
        <FollowerTab TopCreator={creators} />
      ) : (
        <div className={Style.connect}>Connect wallet to see creators</div>
      )}
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs"
      />
      <Filter changeLoader={changeLoader} />

      {nfts && nfts.length > 0 ? (
        <NFTCard NFTdata={filteredArr} />
      ) : (
        <div className={Style.connect}>Connect wallet to see NFTs</div>
      )}

      <Title
        heading="Browse by Category"
        paragraph="Explore NFTs in the most featured categories"
      />
      <Category />
      {/* <Subscribe /> */}
      <Brand />

      {/* <Video /> */}
    </div>
  );
};

export default Home;
