import React, { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Loader } from "../components/componentsindex";

import formStyle from "../AccountPage/Form/Form.module.css";
import Style from "../styles/withdraw.module.css";

const withdraw = () => {
  const { owner, currentAccount, withdraw, contractBalance, fetchBalance } =
    useContext(NFTMarketplaceContext);
  const router = useRouter();

  useEffect(() => {
    if (owner.toLowerCase() !== currentAccount.toLowerCase()) {
      router.push("/");
      toast.error("You dont have access to this page");
      return;
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchBalance();
    };
    init();
  }, []);

  const [formValues, setFormValues] = useState({ address: "", amount: 0 });
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading((k) => !k);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // setFormValues((prev) =>
    //   setFormValues({
    //     prev,
    //     [name]: value,
    //   })
    // );
  };

  function isValidEthereumAddress(address) {
    // Regular expression for a valid Ethereum address
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

    return ethAddressRegex.test(address);
  }

  const handleWithdraw = async (cb) => {
    const { address, amount } = formValues;

    if (!address) {
      toast.error("Please enter a valid address");
      return;
    }

    if (!amount) {
      toast.error("Enter a vaild amount");
      return;
    }

    await withdraw(address, amount);

    cb;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeLoader();
    console.log(formValues);
    const { amount, address } = formValues;
    if (amount <= 0) {
      toast.error("Amoumt must be a valid integer");
      return;
    }

    if (!address) {
      toast.error("Enter your address");
      return;
    }

    const isValid = isValidEthereumAddress(address);

    if (!isValid) {
      toast.error("Address isn't valid");
      return;
    }

    await withdraw(address, amount, async () => {
      await fetchBalance();
      changeLoader();
    });
  };
  return (
    <>
      {owner.toLowerCase() === currentAccount.toLowerCase() ? (
        <div className={Style.form}>
          <div className={Style.listingPrice_box_price}>
            Balance {contractBalance && contractBalance} ETH
          </div>
          <form onSubmit={handleSubmit} className={Style.form_box}>
            <div className={Style.form_box_input}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                className={Style.form_box_input_price}
              />
            </div>

            <div className={Style.form_box_input}>
              <label htmlFor="Withdraw">Withdrawal Amount:</label>
              <input
                type="number"
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                className={Style.form_box_input_price}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className={Style.btn_box}>
                <button type="submit" className={Style.btn}>
                  Withdraw
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

export default withdraw;
