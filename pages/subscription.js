import React from 'react';

// INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from '../Subscription/Subscription';

const subscription = () => {
    const subscriptionArray = [
        {
            plan: "STARTER",
            price:"$5/mo",
            popular:"",
            service: ["Automated Reporting", 
            "Faster Processing", 
            "Coustomization"],
            info: "Literally you probably haven't heard of them jean shorts."
        },
        {
            plan: "BASIC",
            price: "$15/mo",
            popular: "(POPULAR)",
            service: [
                "Everything in Stater",
                "100 Builds",
                "Progress Reports",
                "Premium Support"
            ],
            info: "Literally you probably haven't heard of them jean shorts."
        },
        {
            plan: "STANDARD",
            price: "$25/mo",
            popular: "",
            service: [
                "Everything in Basic",
                "Unlimited Builds",
                "Advanced Analytics",
            ],
            info: "Literally you probably haven't heard of them jean shorts."
        },
    ];
  return (
      <></>
    // <div className={Style.subscription}>
    //   <div className={Style.subscription_box}>
    //     <div className={Style.subscription_box_info}>
    //         <h1>Subscriptions</h1>
    //         <p>Prices to fit the need of any company size</p>
    //     </div>

    //     <div className={Style.subscription_box_box}>
    //         {subscriptionArray.map((el, i)=>(
    //             <Subscription key={i+1} i={i} el={el} />
    //         ))}
    //     </div>
    //   </div>
    // </div>
  )
}

export default subscription
