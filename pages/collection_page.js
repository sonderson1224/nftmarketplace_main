import React, { useContext, useState } from 'react';

// INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner, CollectionProfile, NFTCardTwo } from '../collectionPage/collectionPageIndex';
import { Brand, Slider } from '../components/componentsindex';
import Filter from "../components/Filter/Filter";
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';
import Loader from "../components/Loader";
import {NftComponent} from '../components/componentsindex';

const Collection_page = () => {
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading(hartman => !hartman);
  const { nfts, filteredArr } = useContext(NFTMarketplaceContext);
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_9,
    images.nft_image_4,
    images.nft_image_5,
    images.nft_image_6,
    images.nft_image_7,
    images.nft_image_8,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {/* <CollectionProfile /> */}
      <Filter changeLoader={changeLoader} />
      {loading ? <Loader /> : <NFTCardTwo NFTData={filteredArr} />}
      <Filter changeLoader={changeLoader} />
      <NftComponent />
      <Slider />
      <Brand />
    </div>
  );
};

export default Collection_page;
