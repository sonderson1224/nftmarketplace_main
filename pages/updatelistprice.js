import React, { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Loader } from "../components/componentsindex";

import formStyle from "../AccountPage/Form/Form.module.css";
import Style from "../styles/updatelistprice.module.css"

const updatelistprice = () => {
  const {
    owner,
    currentAccount,
    listingPrice,
    updateListPrice,
    fetchListPrice,
  } = useContext(NFTMarketplaceContext);

  const router = useRouter();

  useEffect(() => {
    if (owner.toLowerCase() !== currentAccount.toLowerCase()) {
      router.push("/");
      toast.error("You dont have access to this page");
      return;
    }
  }, []);

  const [formValues, setFormValues] = useState({ price: 0 });
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading((k) => !k);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeLoader();
    console.log(formValues);
    const { price } = formValues;
    if (price <= 0) {
      toast.error("Amoumt must be a valid integer");
      return;
    }
    //
    await updateListPrice(price, async() => {
      await fetchListPrice();
      changeLoader();
    });
  };
  return (
    <>
      {owner.toLowerCase() === currentAccount.toLowerCase() ? (
        <div className={Style.form}>
          <div className={Style.listingPrice_box_price}>
            Listing Price {listingPrice ? listingPrice : 0} ETH
          </div>
          <form onSubmit={handleSubmit} className={Style.form_box}>
            <div className={Style.form_box_input}>
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                className={Style.form_box_input_price}
              />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className={Style.btn_box}>
                <button type="submit" className={Style.btn}>
                  Update Price
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <h2> Nothing for you</h2>
      )}
    </>
  );
};

export default updatelistprice;
