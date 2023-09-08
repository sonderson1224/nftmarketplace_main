import React from 'react';
import Link from 'next/link';

// INTERNAL IMPORT
import Style from './HelpCenter.module.css';

// HELP CENTER NAVIGATION MENU
const helpCenter = [
  {
    name: "About Us",
    link: "about"
  },

  // {
  //   name: "Contact Us",
  //   link: "contactus"
  // },

  // {
  //   name: "Sign Up",
  //   link: "signup"
  // },

  //  {
  //   name: "Sign In",
  //   link: "signin"
  // },

  //  {
  //   name: "Subscription",
  //   link: "subscription"
  // },
]

const HelpCenter = () => {
  return (
    <div className={Style.box}>
      {
        helpCenter.map((el, i)=> (
          <div className={Style.helpCenter} key={i + 1}> 
            <Link href={{pathname: `${el.link}`}}>{el.name}</Link> 
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter
