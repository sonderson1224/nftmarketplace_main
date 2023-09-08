import React from 'react'
import Image from 'next/image'

// INTERNAL IMPORT 
import Style from "./loader.module.css"
import images from '../../img'

const index = () => {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <div className={Style.Loader_box_img}>
                    <Image
                        src={images.loader}
                        alt="loader"
                        width={100}
                        height={100}
                        className={Style.Loader_box_img_img}
                    />
                </div>
            </div>
        </div>
    )
}

export default index
