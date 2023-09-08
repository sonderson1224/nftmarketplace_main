import React, {useContext} from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from './Notification.module.css';
import images from '../../../img';

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Notification = ({ currentAccount, user }) => {
  const { owner } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_image}>
          <Image
            src={
              user
                ? user.profilePic
                  ? user.profilePic
                  : images.hero
                : images.hero
            }
            alt="User Profile"
            width={50}
            height={50}
            className={Style.notification_box_image}
          />
        </div>
        <div className={Style.notification_box_info}>
          <h4>
            {" "}
            {user?.firstName} {user?.lastName}
          </h4>
          <small>{currentAccount.slice(0, 17)}...</small>
          {/* <p>Measure action your user</p>
          <small>3 minutes ago</small> */}
          <span className={Style.notification_box_new}></span>
        </div>
      </div>
    </div>
  );
};

export default Notification
