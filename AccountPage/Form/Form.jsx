import React, { useState, useContext } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from 'react-icons/md';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from 'react-icons/ti';
import toast from "react-hot-toast";
import { useRouter } from 'next/router'

import axios from 'axios';
import Loader from '../../components/Loader';

// INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from '../../components/componentsindex';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';


const Form = () => {
  const router = useRouter()
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [loading, setLoading] = useState(false);
  const changeLoader = () => setLoading(k => !k);
  const [userDetails, setAccountDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    website: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
  });

  const { firstName, lastName, email, description, website, facebookUrl, twitterUrl, instagramUrl } = userDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...userDetails, [name]: value
    })
  }

  const handleSubmit = async () => {
    changeLoader();
    let hasEmptyValue = false;
    Object.keys(userDetails).forEach(function (key, index) {
      if (!userDetails[key]) {
        toast.error(`Please add  ${key} `);
        hasEmptyValue = true;
        return;
      }
    });
    if (hasEmptyValue) {
      return;
    }
    if (!currentAccount) {
      toast.error("connect wallet");
      return;
    }
    try {
      const data = { currentAccount, ...userDetails }
      console.log(data);
      const res = await axios.post('/api/user', data);
      if (res.status == 200) {
        setAccountDetails({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
          website: "",
          facebookUrl: "",
          twitterUrl: "",
          instagramUrl: "",
        })
        toast.success(res?.data?.message)
      }
      router.reload(window.location.pathname);
      // changeLoader();
    } catch (errors) {
      changeLoader();
      if (errors?.response?.data?.error) {
        errors?.response?.data?.error.map(item => toast.error(item));
        return;
      }
      if (errors?.response?.data?.message){
        toast.error(errors?.response?.data?.message);
        return;
      }
      toast.error(`Error occured submitting form...${errors?.message}`)
    }
  }

  return (
    <div className={Style.form}>
      <div className={Style.form_box}>
        <form action="" >
          <div className={Style.form_box_input}>
            <label htmlFor="name">Firstname</label>
            <input
              type="text"
              name='firstName'
              value={firstName}
              onChange={handleChange}
              placeholder='Sosthenes'
              className={Style.form_box_input_username}
            />
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor="name">Lastname</label>
            <input
              type="text"
              name='lastName'
              value={lastName}
              onChange={handleChange}
              placeholder='Hart'
              className={Style.form_box_input_username}
            />
          </div>

          <div className={Style.form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="email"
                name='email'
                value={email}
                onChange={handleChange}
                placeholder='Email'
              />
            </div>
          </div>

          <div className={Style.form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name='description'
              value={description}
              onChange={handleChange}
              id=""
              cols="30"
              rows="10"
              placeholder='Something about yourself in few words '
            >
            </textarea>
          </div>

          <div className={Style.form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder='Website'
                name='website'
                value={website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={Style.form_box_input_social}>
            <div className={Style.form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  placeholder='http://sosthenes'
                  name='facebookUrl'
                  value={facebookUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="instagram">Instagram</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  type="text"
                  placeholder='http://sosthenes'
                  name='instagramUrl'
                  value={instagramUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  type="text"
                  placeholder='http://sosthenes'
                  name='twitterUrl'
                  value={twitterUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={Style.form_box_input}>
            <label htmlFor="wallet">Wallet</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                defaultValue={currentAccount}
                placeholder='0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8'
              // name='currentAccount'
              // value={userDetails.currentAccount}
              // onChange={handleChange}
              />
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>
          <>
            {loading ? <Loader /> :
              <div className={Style.form_box_btn}>
                <Button
                  btnText="Upload Profile"
                  handleClick={handleSubmit}
                  classStyle={Style.button}
                />
              </div>}
          </>
        </form>
      </div>
    </div>
  )
}

export default Form
