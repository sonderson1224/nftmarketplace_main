import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "../styles/search.module.css";
import { Slider, Brand, Loader } from '../components/componentsindex';
import { SearchBar } from '../SearchPage/SearchPageIndex';
import { Filter } from '../components/componentsindex';
import Button from '../components/componentsindex';

import { NFTCardTwo, Banner } from '../collectionPage/collectionPageIndex';
import images from "../img";

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const search = () => {
  const { fetchNFTs, currentAccount, filteredArr, withdraw, filterNft } =
    useContext(NFTMarketplaceContext);
  const router = useRouter();
  const { query } = router;
  const filter = query.category;
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftscopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading(hartman => !hartman);

   useEffect(() => {
     if (filter) filterNft(filter, () => null);
   }, []);

  useEffect(() => {
    const init = async () => {
      const myNfts = await fetchNFTs();
      setNfts(myNfts)
    }
    init();
  }, [])


  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTs.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTs);
    }
  }

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  }

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_2,
  //   images.nft_image_1,
  //   images.nft_image_3,
  // ];
  return (
    <div>
      <Banner bannerImage={images.creatorbackground3} />
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <Filter changeLoader={changeLoader} />
      {filteredArr.length == 0 ? <Loader /> : <NFTCardTwo NFTData={filteredArr}  />}
      <Slider />
      <Brand />
    </div>
  )
}

export default search
