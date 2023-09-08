import "../styles/globals.css";
import { useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

// INTERNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NftMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { Toaster } from "react-hot-toast";
import TawkToWidget from "../TawkToWidget/tawkToScript";
import dotenv from 'dotenv';

dotenv.config();

const App = ({ Component, pageProps }) => {
  const getLibrary = (provider) => {
    // const library = new Web3Provider(provider, process.env.NETWORK);
    // library.pollingInterval = 15000;
    return new Web3Provider(provider, process.env.NETWORK);
  };

  // useEffect(() => {
  //     window.load = function () {
  //         localStorage.clear()
  //     };
  // }, [])
  return (
    <>
      <Toaster position="top-right" />
      <Web3ReactProvider getLibrary={getLibrary}>
        <NftMarketplaceProvider>
          <NavBar />
          <Component {...pageProps} />
          <TawkToWidget />
          <Footer />
        </NftMarketplaceProvider>
      </Web3ReactProvider>
    </>
  );
};

export default App;
