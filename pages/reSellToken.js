import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";
import { Loader } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async (cb) => {
    try {
      if (!price) {
        throw new Error("price is not defined");
        // console.log('price is not defined', );
        return;
      }
      const res = await createSale(tokenURI, Number(price), true, Number(id));
      console.log("res",res)
      cb();
    //   router.push("/author");
    } catch (error) {
      cb();
      toast.error(`Error: ${error.message}`);
      console.log("Error:", error.message);
    }
  };

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        {image ? (
          <>
            <h1>ReSell Your Token, Set Price</h1>
            <div className={formStyle.form_box_input}>
              <label htmlFor="name">Price</label>
              <input
                type="number"
                min={1}
                placeholder="reSell price"
                className={formStyle.form_box_input_username}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={Style.reSellToken_box_image}>
              {image && (
                <Image
                  src={image}
                  alt="resell nft"
                  width={400}
                  height={400}
                  className={Style.reSellToken_box_image_image}
                />
              )}
            </div>

            {loader ? (
              <Loader />
            ) : (
              <div className={Style.reSellToken_box_btn}>
                <Button
                  btnText="Resell NFT"
                  handleClick={() => {
                    setLoader(true);
                    resell(() => setLoader((k) => !k));
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default reSellToken;
