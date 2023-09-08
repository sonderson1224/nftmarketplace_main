import React, {useEffect, useContext} from 'react';
import toast from "react-hot-toast";
import axios from "axios";

// INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg } from './NFTDetailsIndex';
import Style from "./NFTDetailsPage.module.css";
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext"

const NFTDetailsPage = ({ nft }) => {

// SMART CONTRACT DATA
const { currentAccount} = useContext(NFTMarketplaceContext);

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
  };

  useEffect(() => {
    const init = async () => {
      if (currentAccount) {
        const user = await fetchUser(currentAccount);
        if (user) setUser(user);
      }
    };
    init();
  }, [currentAccount]);

  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription nft={nft} currentAccount={currentAccount} />
      </div>
    </div>
  );
};

export default NFTDetailsPage
