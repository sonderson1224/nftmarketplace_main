import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/connectWallet.module.css";
import { Button } from "../components/componentsindex";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { Loader } from "../components/componentsindex";
import toast from "react-hot-toast";

const connectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [walletName, setWalletName] = useState();
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading((k) => !k);
  const {
    walletProvider,
    wallets,
    disconnectWallet,
    connectWallet,
    connectMetamask,
    connectWaletConnect,
    connectCoinbase,
    connectTrustWallet,
    disconnectWalletconnect,
    disconnectCoinbase,
    currentAccount,
  } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    const walletName = localStorage.getItem(walletProvider);
    if (walletName) setWalletName(walletName);
  }, [walletName]);

  return (
    <div className={Style.connectwallet}>
      <div className={Style.connectwallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectwallet_box_para}>
          Connect with one of our avaliable wallet providers or create a new one
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className={Style.connectwallet_box_provider}>
            <div
              className={Style.connectwallet_box_provider_item}
              onClick={async () => {
                if (currentAccount) {
                  toast.error(
                    `Disconnect ${walletName} wallet before connecting to another`
                  );
                  return;
                }
                changeLoader();
                await connectMetamask((val) => {
                  if (val) {
                    localStorage.setItem(walletProvider, wallets.metaMask);
                    setWalletName(wallets.metaMask);
                  }
                  changeLoader();
                });
              }}
            >
              <Image
                src={images.provider_1}
                alt="metamask"
                width={50}
                height={50}
                className={Style.connectwallet_box_provider_item_img}
              />
              <p>MetaMask</p>
            </div>

            {/* <div className={Style.connectwallet_box_provider_item} onClick={connectWaletConnect} >
            <Image
              src={images.provider_2}
              alt='wallletconnect'
              width={50}
              height={50}
              className={Style.connectwallet_box_provider_item_img}
            />
            <p>Wallet Connect</p>
          </div> */}

            <div
              className={Style.connectwallet_box_provider_item}
              onClick={async () => {
                if (currentAccount) {
                  toast.error(
                    `Disconnect ${walletName} wallet before connecting to another`
                  );
                  return;
                }
                changeLoader();
                await connectCoinbase(() => {
                  localStorage.setItem(walletProvider, wallets.coinBase);
                  setWalletName(wallets.coinBase);
                  changeLoader();
                });
              }}
            >
              <Image
                src={images.provider_5}
                alt="coinbase"
                width={50}
                height={50}
                className={Style.connectwallet_box_provider_item_img}
              />
              <p>Coinbase</p>
            </div>

            {/* <div
            className={Style.connectwallet_box_provider_item}
            onClick={() => {
              connectTrustWallet();
              localStorage.setItem(walletProvider, wallets.trustWallet);
              setWalletName(wallets.trustWallet);
            }}
          >
            <Image
              src={images.provider_6}
              alt="trustwallet"
              width={50}
              height={50}
              className={Style.connectwallet_box_provider_item_img}
            />
            <p>Trust Wallet</p>
          </div> */}
          </div>
        )}
        {walletName && (
          <>
            <p className={Style.option}>Or</p>
            <Button
              classStyle={Style.disconnect}
              btnText={`Disconnect ${walletName}`}
              handleClick={() => {
                disconnectWallet();
                setWalletName();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default connectWallet;
