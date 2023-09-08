import React from 'react';

// INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnText, handleClick, icon, classStyle  }) => {
  return (
    <div className={Style.box}>
      <div className={`${Style.button} ${classStyle}`} onClick={() => handleClick()} >
        {icon} {btnText}
      </div>
    </div>
  )
}

export default Button
