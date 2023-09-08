/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sonderson-nft-marketplace.infura-ipfs.io",
      "infura-ipfs.io",
      "res.cloudinary.com",
      "via.placeholder.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    NETWORK: process.env.NETWORK,
    COINBASE_KEY: process.env.COINBASE_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    SEPOOLIA_KEY: process.env.SEPOOLIA_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    GEORLI_API_URL: process.env.GEORLI_API_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    PROJECT_SECRET_KEY: process.env.PROJECT_SECRET_KEY,
    PROJECT_SUBDOMAIN: process.env.PROJECT_SUBDOMAIN,
    CLIENT_URL_1: process.env.CLIENT_URL_1,
    CLIENT_URL_2: process.env.CLIENT_URL_2,
    CLIENT_URL_3: process.env.CLIENT_URL_3,
    CHAIN_ID: process.env.CHAIN_ID,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    TAWKTO_ID: process.env.TAWKTO_ID,
    TAWKTO_SRC: process.env.TAWKTO_SRC,
  },
};

module.exports = nextConfig;
