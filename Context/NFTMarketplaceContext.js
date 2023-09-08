import React, { useState, useEffect, useContext } from "react";
import { Web3Provider } from "@ethersproject/providers";
// import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
// import Web3 from "web3";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import toast from "react-hot-toast";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

const projectId = "2RNu1fnNjLvAzpnur6s8Z1P3yjR";
const projectSecretKey = "f2cc180004da471c22753626711c38e8";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

// const PORT = "http://localhost:8545"

const subdomain = "https://sonderson-nft-marketplace.infura-ipfs.io";
// const clientUrl1 = process.env.CLIENT_URL_1;
// const clientUrl2 = process.env.CLIENT_URL_2;
// const clientUrl3 = process.env.CLIENT_URL_3;

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  config: {
    API: {
      HTTPHeaders: {
        "Access-Control-Allow-Origin": [
          "http://localhost:3000",
          // clientUrl1,
          // clientUrl2,
          // clientUrl3,
        ],
      },
    },
  },
  headers: {
    authorization: auth,
  },
});

// INTERNAL IMPORT
import { NFTMarketplaceAddress, nftMarketplaceAbi } from "./constants";

//-- FETCHING SMART CONTRACT
const fetchContract = (signer) =>
  new ethers.Contract(NFTMarketplaceAddress, nftMarketplaceAbi, signer);

// -- CONNECTING WITH SMART CONTRACT
const Port = process.env.API_URL;
const connectingWithSmartContract = async () => {
  try {
    //blockchain port number
    const providerOptions = {
      /* See Provider Options Section */
      rpc: {
        // Specify the URL for your local blockchain
        // For example, if running Ganache locally, use "http://localhost:8545"
        1: Port,
      },
    };

    //created a web3 instance with a cuatom network and parsed providers options
    const web3Modal = new Web3Modal({
      network: "custom",
      cacheProvider: true,
      providerOptions,
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    //init contract
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    toast.error(
      `Something went wrong while connecting with contract...${error.message}`
    );
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NftMarketplaceProvider = ({ children }) => {
  const titleData = "Discover Collect and Sell NFTs 🖼️";
  const walletProvider = "provider";
  const wallets = {
    metaMask: "metamask",
    coinBase: "coinbase",
    trustWallet: "trustWallet",
  };
  // USESTATE
  const [error, setError] = useState("");
  const [opeError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [listedNFts, setListedNfts] = useState();
  const [myAuthorNfts, setMyAuthorNfts] = useState();
  const [categoryArr, setCategoryArr] = useState([]);
  const [web3Library, setWeb3Library] = React.useState();
  const [web3Account, setWeb3Account] = React.useState();
  const [walletlinkProvider, setWalletlinkProvider] = React.useState();
  const [walletConnectProvider, setWalletConnectProvider] = React.useState();
  const [owner, setOwner] = React.useState("owner");
  const [contractBalance, setContractBalance] = React.useState(0);

  const [listingPrice, setListingPrice] = useState(0);
  const router = useRouter();

  const handleAccountChange = (...args) => {
    const accounts = args[0];
    if (accounts.length === 0) {
      // console.log("Please connect to metamask");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  });

  // disconnectWallet
  const disconnectWallet = () => {
    localStorage.removeItem(walletProvider);
    setCurrentAccount("");
    setWeb3Account();
    setWeb3Library();
    if (walletlinkProvider) {
      walletlinkProvider.close();
      setWalletlinkProvider(null);
    }
  };

  // -- clear everything
  const logout = () => {
    localStorage.clear();
    setError("");
    setOpenError(false);
    setCurrentAccount();
    setWeb3Account(null);
    setWeb3Library(null);
    setWalletlinkProvider(null);
    setWalletConnectProvider(null);
  };

  // -- METAMASK
  const connectMetamask = async (cb) => {
    try {
      if (!window.ethereum)
        throw new Error("common now... use an ethereum based browser!");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setCurrentAccount(account);
      const library = new Web3Provider(window.ethereum, process.env.NETWORK);
      setWeb3Account(account);
      setWeb3Library(library);
      cb(true);
    } catch (error) {
      cb(null);
      toast.error(
        `OOps!!! looks like  an error occured while connecting to your metamask wallet...${error.message}`
      );
      setError(
        "OOps!!! looks like  an error occured while connecting to wallet..."
      );
      setOpenError(true);
    }
  };

  // --WALLETCONNECT
  // const connectWaletConnect = async () => {
  //     try {
  //         const RPC_URLS = {
  //             1: 'https://mainnet.infura.io/v3/2RNu1fnNjLvAzpnur6s8Z1P3yjR',
  //             11155111: 'https://sepolia.infura.io/v3/2RNu1fnNjLvAzpnur6s8Z1P3yjR'
  //         };
  //         const provider = new WalletConnectProvider({
  //             rpc: {
  //                 1: RPC_URLS[1],
  //                 11155111: RPC_URLS[11155111]
  //             },
  //             qrcode: true,
  //             pollingInterval: 15000
  //         });
  //         setWalletConnectProvider(provider);
  //         const accounts = await provider.enable();
  //         const account = accounts[0];

  //         const library = new Web3Provider(provider, 'any');

  //         console.log('library');
  //         console.log(library);
  //         setWeb3Library(library);
  //         setWeb3Account(account);
  //     } catch (ex) {
  //         console.log(ex);
  //     }
  // };

  const connectWaletConnect = async () => {
    try {
      const RPC_URLS = "http://localhost:3000";
      //  {
      //     1: 'https://mainnet.infura.io/v3/2RNu1fnNjLvAzpnur6s8Z1P3yjR',
      //     4: 'https://rinkeby.infura.io/v3/2RNu1fnNjLvAzpnur6s8Z1P3yjR'

      // };
      const provider = new WalletConnectProvider({
        // rpc: {
        //     1: RPC_URLS[0],
        //     4: RPC_URLS[1],
        // },
        rcp: {
          1: RPC_URL_LOCAL,
        },
        qrcode: true,
        pollingInterval: 15000,
      });
      setWalletConnectProvider(provider);
      const accounts = await provider.enable();
      const account = accounts[0];

      const library = new Web3Provider(provider, "any");

      console.log("library");
      console.log(library);
      setWeb3Library(library);
      setWeb3Account(account);
    } catch (ex) {
      console.log(ex);
    }
  };

  //-- COINBASE
  const connectCoinbase = async (cb) => {
    try {
      if (!window.ethereum)
        throw new Error("common now... use an ethereum based browser!");
      console.log("connect coinbase");
      // Initialize WalletLink
      const walletLink = new WalletLink({
        appName: "NFTMarketplace",
        darkMode: true,
      });
      const provider = walletLink.makeWeb3Provider(
        `https://sepolia.infura.io/v3/${process.env.COINBASE_KEY}`,
        process.env.CHAIN_ID
      );
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setCurrentAccount(account);
      const library = new Web3Provider(provider, process.env.NETWORK);
      setWalletlinkProvider(provider);
      setWeb3Library(library);
      setWeb3Account(account);
      cb(true);
    } catch (error) {
      cb(null);
      console.log(error);
      toast.error(
        `OOps!!! looks like  an error occured while connecting to your coinbase wallet...${error.message}`
      );
      setError(
        "OOps!!! looks like  an error occured while connecting to wallet..."
      );
      setOpenError(true);
    }
  };

  // -- TRUST WALLET
  // const connectTrustWallet = async () => {
  //   try {
  //     const RPC_URLS = {
  //       1: `https://mainnet.infura.io/v3/${process.env.COINBASE_KEY}`, // Replace with your Infura project ID or desired RPC URL for Ethereum mainnet
  //     };

  //     const chainId = 11155111; // Ethereum Mainnet chain ID
  //     const rpcUrl = RPC_URLS[chainId];
  //     const walletConnectBridgeUrl = "https://bsc-dataseed1.binance.org"; // WalletConnect bridge URL

  //     const walletConnectProvider = new WalletConnectProvider({
  //       rpc: {
  //         [chainId]: rpcUrl,
  //       },
  //       bridge: walletConnectBridgeUrl,
  //     });

  //     await walletConnectProvider.enable();

  //     const accounts = await walletConnectProvider.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const account = accounts[0];
  //     setCurrentAccount(account);
  //     const library = new ethers.providers.Web3Provider(walletConnectProvider);

  //     console.log("library", library);
  //     setWeb3Library(library);
  //     setWeb3Account(account);
  //   } catch (error) {
  //     toast.error(
  //       `OOps!!! looks like  an error occured while connecting to your trustwallet wallet...${error.message}`
  //     );
  //     setError(
  //       "OOps!!! looks like  an error occured while connecting to wallet..."
  //     );
  //     setOpenError(true);
  //   }
  // };

  const disconnectCoinbase = () => {
    walletlinkProvider.close();
    setWalletlinkProvider(null);
  };

  const disconnectWalletconnect = () => {
    walletConnectProvider.disconnect();
    setWalletConnectProvider(null);
  };
  // -- CHECK IF WALLET IS CONNECTED
  const checkIfWalletIsConnected = async () => {
    const type = localStorage.getItem(walletProvider);
    switch (type) {
      case wallets.metaMask:
        try {
          if (!window.ethereum) return;
          setOpenError(true), setError("common now... Install MetaMask!!!");

          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
          } else {
            setError("Looks like there were no accounts found");
            setOpenError(true);
          }
        } catch (error) {
          toast.error(
            `OOps!!! looks like  an error occured while connecting to your metamask wallet...${error.message}`
          );
          setError(
            "OOps!!! looks like  an error occured while connecting to wallet..."
          );
          setOpenError(true);
        }
        break;
      case wallets.coinBase:
        connectCoinbase();
        // code block
        break;
      // case wallets.trustWallet:
      //   connectTrustWallet();
      //   // code block
      //   break;
      default:
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // -- CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      console.log("connect wallet");
      if (!window.ethereum)
        throw new Error("common now... Install MetaMask!!!");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      toast.error(
        `OOps!!! looks like  an error occured while connecting to wallet...${error.message}`
      );
      setError(
        "OOps!!! looks like an error occured while connecting to wallet..."
      );
      setOpenError(true);
    }
  };

  // -- UPLOAD TO IPFS FUNCTION
  const uploadToIpfs = async (file, cb) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      cb(url);
      return url;
    } catch (error) {
      cb(null);
      toast.error(
        `OOps!!! looks like  an error occured while connecting to wallet...${error.message}`
      );
      setError(
        "OOps!!! looks like an error occured while uploading to IPFS...",
        error
      );
      setOpenError(true);
    }
  };

  // -- CREATE NFT FUNCTION
  const createNFT = async (name, price, image, description, category, cb) => {
    //add a toaster

    try {
      if (!name) throw new Error(`OOps!!! please provide required name`);
      if (!description)
        throw new Error(`OOps!!! please provide required description`);
      if (!price) throw new Error(`OOps!!! please provide required price`);
      if (!image) throw new Error(`OOps!!! please provide required image`);
      const data = JSON.stringify({
        name,
        description,
        image,
        price,
        category: category ? category : null,
      });
      const { path } = await client.add(data);
      console.log(path);
      const url = `https://infura-ipfs.io/ipfs/${path}`;
      const result = await createSale(url, price, false);
      console.log("result", result);
      cb(true);
    } catch (error) {
      cb(null);
      setError("OOps!!! looks like an error occured while creating NFT...");
      setOpenError(true);
      toast.error(
        `OOps!!! looks like  an error occured while creating NFT...${error.message}`
      );
    }
  };

  // -- CREATESALE Function

  const createSale = async (url, formInputPrice, isReSelling = true, id) => {
    try {
      // Validate formInputPrice
      if (
        isNaN(formInputPrice) ||
        formInputPrice === "" ||
        formInputPrice === null
      )
        throw new Error(`Invalid formInputPrice:${formInputPrice}`);

      const priceInWei = ethers.utils
        .parseUnits(String(formInputPrice), "ether")
        .toHexString();
      const contract = await connectingWithSmartContract();
      const lisitngPrice = await contract.getListPrice();

      if (!lisitngPrice || !ethers.BigNumber.isBigNumber(lisitngPrice)) {
        throw new Error("Invalid listing price");
      }

      // let transaction;

      if (isReSelling) {
        const { price: formerPrice, owner } =
          await contract.getListedForTokenId(id);
        const itemsSold = await contract.getItemsSold();
        if (itemsSold.toNumber() === 0)
          throw new Error("Marketplace is currently Unavaliable");g
        if (owner.toLowerCase() !== currentAccount.toLowerCase())
          throw new Error("This nft does not belong to you");
        const transaction = await contract.resellToken(id, priceInWei, {
          value: lisitngPrice.toString(),
          gasLimit: 6000000,
          gasPrice: 3000000,
        });

        const process = await transaction.wait();
        console.log({ process });
        if (process.status) {
          toast.success("Succesfully resold Nft");
          router.push("/author");
        }
        if (process.status === "0x0") toast.error("Transaction reverted");
        if (!process.status && process.reason)
          toast.error(
            `An Error ocuured with your transaction ${ethers.utils.toUtf8String(
              process?.reason
            )}`
          );
      } else {
        // Get the total price for sendEthToOwner
        // const totalPrice = lisitngPrice.add(ethers.utils.parseUnits('0.002', 'ether'))
        // Call sendEthToOwner function with the total price
        // const price = ethers.BigNumber.from(lisitngPrice.toString()).toHexString();
        const ownerTransaction = await contract.createToken(url, priceInWei, {
          value: lisitngPrice.toString(),
          gasLimit: 6000000,
          gasPrice: 3000000,
        });
        const process = await ownerTransaction.wait();
        if (process.status) {
          toast.success("Succesfully created Nft");
          router.push("/search");
        }
        if (process.status === "0x0") toast.error("Transaction reverted");
        if (!process.status && process.reason)
          toast.error(
            `An Error ocuured with your transaction ${ethers.utils.toUtf8String(
              process?.reason
            )}`
          );
      }
    } catch (error) {
      setError(
        "OOps!!! looks like an error occured while creating sale...",
        error.message
      );
      setOpenError(true);
      console.log(error);
      toast.error(
        `OOps!!! looks like an error occured while creating sale...${error.message}`
      );
    }
  };

  const fetchOwner = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const data = await contract.getOwner();
      setOwner(data);
    } catch (error) {
      console.log(error);
      setError("OOps!!! looks like an error occured while creating NFT...");
      setOpenError(true);
    }
  };

  const fetchListPrice = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const lisitngPrice = await contract.getListPrice();
      const bigNumber = ethers.BigNumber.from(lisitngPrice);
      const readableNumber = ethers.utils.formatUnits(bigNumber, "18");
      setListingPrice(readableNumber);
    } catch (error) {
      console.log(error);
      setError("OOps!!! looks like an error occured while fetching price...");
      setOpenError(true);
    }
  };

  const updateListPrice = async (price, cb) => {
    try {
      if (owner.toLowerCase() !== currentAccount.toLowerCase())
        throw new Error("You do not have access to this function");
      const contract = await connectingWithSmartContract();
      const priceInWei = ethers.utils
        .parseUnits(String(price), "ether")
        .toHexString();
      const updatePrice = await contract.updateListPrice(priceInWei);
      const process = await updatePrice.wait();
      console.log({ process });

      if (process.status) {
        toast.success(`Succesfully updated listing price to ${price} eth`);
      }
      if (process.status === "0x0") toast.error("Transaction reverted");
      if (!process.status && process.reason)
        toast.error(
          `An Error ocuured with your transaction ${ethers.utils.toUtf8String(
            process?.reason
          )}`
        );
      cb();
    } catch (error) {
      cb();
      console.log(error);
      setError("OOps!!! looks like an error occured while creating NFT...");
      setOpenError(true);
      toast.error(
        `OOps!!! looks like an error occured while updating price...${error.message}`
      );
    }
  };

  const fetchBalance = async () => {
    try {
      if (owner.toLowerCase() !== currentAccount.toLowerCase()) return;
      const contract = await connectingWithSmartContract();
      const data = await contract.getBalance();
      const bigNumber = ethers.BigNumber.from(data);
      const readableNumber = ethers.utils.formatUnits(bigNumber, "18");
      setContractBalance(readableNumber);
    } catch (error) {
      console.log(error);
      setError("OOps!!! looks like an error occured while creating NFT...");
      setOpenError(true);
    }
  };

  // FETCH NFTS
  const [nfts, setNfts] = useState([]);
  const [filteredArr, setfilteredArr] = useState([]);
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);
      const data = await contract.getAllNFTs();

      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner }) => {
          const tokenURI = await contract.tokenURI(tokenId);

          const {
            data: { image, name, description, price, category },
          } = await axios.get(tokenURI);

          let formattedPrice;
          if (typeof price === "string" || typeof price === "number") {
            // Convert the price to a BigNumber object before formatting

            const priceBigNumber = ethers.utils.parseUnits(
              price.toString(),
              "ether"
            );

            formattedPrice = ethers.utils.formatUnits(priceBigNumber, "ether");

            // console.log('formattedPrice:', formattedPrice);
          } else {
            console.log("Invalid price:", price);
            return null;
          }

          // const formattedPrice = ethers.utils.formatUnits(ethers.BigNumber.from(price), 'ether');
          // console.log('formattedPrice:', formattedPrice);
          // // const ipfsContent = await ipfs.get(tokenURI);

          return {
            price: formattedPrice,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
            currentAccount,
            titleData,
            category: category ? category : null,
            // ipfsContent,
          };
        })
      );

      const validItems = items.filter((item) => item !== null);

      setNfts(validItems);
      setfilteredArr(validItems);

      // console.log(items);
      return items;
    } catch (error) {
      setError("OOps!!! looks like an error occured while fetching nfts...");
      setOpenError(true);
      console.log(error);
      toast.error(
        `OOps!!! looks like an error occured while fetching nfts...${error.message}`
      );
    }
  };

  const setCategories = (items) => {
    items.map(({ category }) => {
      if (category) {
        if (!categoryArr.includes(category.toLowerCase())) {
          setCategoryArr((prev) => [...prev, category.toLowerCase()]);
        }
      }
    });
  };
  const searchNft = (word) => {
    if (!word) return toast.error("Add a word to be searched for");
    const filteredArray = nfts.filter((item) => item.name.includes(word));
    setfilteredArr(filteredArray);
  };
  const filterNft = (category, cb) => {
    if (category) {
      const capitalizedStr =
        category.charAt(0).toUpperCase() + category.slice(1);
      const filteredArray = nfts.filter(
        (item) => item.category === capitalizedStr
      );
      setfilteredArr(filteredArray);
      cb();
    } else {
      const filteredArray = nfts.filter((item) => item.category === null);
      setfilteredArr(filteredArray);
      cb();
    }
  };

  useEffect(() => {
    const init = async () => {
      if (currentAccount) await fetchOwner();
    };
    init();
  }, [currentAccount]);

  useEffect(() => {
    const init = async () => {
      if (owner) {
        await fetchBalance();
        await fetchListPrice();
      }
    };
    init();
  }, [owner]);

  useEffect(() => {
    const init = async () => {
      if (currentAccount) await fetchNFTs();
    };
    init();
  }, [currentAccount]);

  useEffect(() => {
    if (nfts && nfts.length > 0) {
      setCategories(nfts);
    }
  }, [nfts]);

  // FETCH MY NFT OR LISTED NFT
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (!currentAccount) throw new Error("Connect wallet please");
      let data;
      const contract = await connectingWithSmartContract();
      if (type === "fetchItemsListed") data = await contract.fetchItemsListed();
      if (type === "getMyNFTs") data = await contract.getMyNFTs();
      // console.log("data", data)
      // const data =
      //     type == "fetchItemsListed"
      //         ? await contract.fetchItemsListed()
      //         : type == "getMyNFTs"
      //             ? await contract.getMyNFTs()
      //             : null;

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            // console.log("tokenURI:", tokenURI)
            const {
              data: { image, name, description, category },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
              category: category ? category : null,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
      toast.error(`Error while fetching listed NFTs...${error.message}`);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      const listedNfts = fetchMyNFTsOrListedNFTs("fetchItemsListed");
      const myNfts = fetchMyNFTsOrListedNFTs("getMyNFTs");
      setListedNfts(listedNfts);
      setMyAuthorNfts(myNfts);
    }
  }, [currentAccount]);

  // BUY NFTS FUNCTION
  const buyNFT = async (tokenId, cb) => {
    try {
      const contract = await connectingWithSmartContract();

      // const priceInWei = ethers.utils.parseUnits(selectedNFT.price.toString(), "ether");
      // console.log("priceInWei:", priceInWei.toString());

      const gasLimit = 6000000;

      const item = await contract.getListedForTokenId(tokenId);
      console.log(item);

      if (ethers.constants.AddressZero === ethers.utils.getAddress(item?.owner))
        throw new Error("Invalid NFT object or owner is not defined");

      if (
        ethers.constants.AddressZero === ethers.utils.getAddress(item?.seller)
      )
        throw new Error("Invalid NFT object or seller is undefined");

      const bigNumber = ethers.BigNumber.from(item?.price)
      const isNotZero = !bigNumber.eq(ethers.constants.Zero);

      if (!isNotZero)
        throw new Error("Invalid NFT object or price is undefined");

      console.log(item?.price.toString());

      const transaction = await contract.buyNft(tokenId, {
        value: item?.price.toString(),
        gasLimit: gasLimit,
      });
      const process = await transaction.wait();
      console.log({ process });

      if (process.status) {
        toast.success("Succesfully bought Nft");
        router.push("/author");
      }
      if (process.status === "0x0") toast.error("Transaction reverted");
      if (!process.status && process.reason)
        toast.error(
          `An Error ocuured with your transaction ${ethers.utils.toUtf8String(
            process?.reason
          )}`
        );
      cb();
    } catch (error) {
      cb();
      toast.error(`Error while buying NFT...${error.message}`);
      setError("Error while buying NFT:", error);
      setOpenError(true);
      console.log("Error while buying NFT:", error);
    }
  };

  // // Call the withdraw function
  // async function withdraw() {
  //     try {
  //         const contract = await connectingWithSmartContract();

  //         // Define the withdrawal amount and recipient address
  //         const withdrawalAmount = ethers.utils.parseEther('0.03'); // 1 ETH as an example
  //         const recipientAddress = '0x49595a80103C9b8e57251c750069D4cB94f3B4F3';

  //         const transaction = await contract.withdraw(withdrawalAmount, recipientAddress);
  //         await transaction.wait();
  //         console.log('Withdrawal successful');
  //     } catch (error) {
  //         console.error('Error occurred during withdrawal:', error);
  //     }
  // }

  // withdraw();

  // WITHDRAW FUNCTION
  const withdraw = async (address, amount, cb) => {
    try {
      // FIRST CHECK
      if (owner.toLocaleLowerCase() !== currentAccount.toLocaleLowerCase())
        throw new Error("You do not have access to this funds");

      // SECOND CHECK
      const contract = await connectingWithSmartContract();

      const priceInWei = ethers.utils
        .parseUnits(String(amount), "ether")
        .toHexString();

      const withdrawal = await contract.withdraw(address, priceInWei);
      const process = await withdrawal.wait();
      console.log({ process });

      if (process.status) {
        toast.success(`Succesfully withdrew ${amount} eth`);
      }
      if (process.status === "0x0") toast.error("Transaction reverted");
      if (!process.status && process.reason)
        toast.error(
          `An Error ocuured with your transaction ${ethers.utils.toUtf8String(
            process?.reason
          )}`
        );
      cb();
    } catch (error) {
      cb();
      toast.error(`Withdrawal Error...${error.message}`);
      setError("Withdrawal Error");
      setOpenError(true);
      console.log("Withdrawal Error:", error);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIpfs,
        createNFT,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        currentAccount,
        titleData,
        setOpenError,
        setError,
        error,
        listedNFts,
        myAuthorNfts,
        categoryArr,
        filterNft,
        nfts,
        filteredArr,
        connectMetamask,
        connectWaletConnect,
        connectCoinbase,
        // connectTrustWallet,
        disconnectWalletconnect,
        disconnectCoinbase,
        walletProvider,
        wallets,
        disconnectWallet,
        logout,
        searchNft,
        owner,
        withdraw,
        contractBalance,
        listingPrice,
        fetchBalance,
        fetchListPrice,
        updateListPrice,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
