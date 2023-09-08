import React from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "../styles/about.module.css";
import { Brand } from '../components/componentsindex';
import images from "../img";

const about = () => {
    const founderArray = [
        {
            name: "Niamg O'Shea",
            position: "Co-founder and Chief Executive Officer",
            images: images.founder_1
        },
        {
            name: "Jamie Daniel",
            position: "Co-founder and Chief Executive Officer",
            images: images.founder_2
        },
        {
            name: "Orla Dwyer",
            position: "Co-founder, Chairman",
            images: images.founder_3
        },
        {
            name: "Dara Frazier",
            position: "Co-founder, Chief Strategy Officer",
            images: images.founder_4
        },
    ];

    const factsArray = [
        {
            title: "10,000",
            info: "Articles have been published around the world (as of Sept. 30, 2021)",
        },
        {
            title: "100,000",
            info: "Registered users account (as of Sept. 30, 2021)",
        },
        {
            title: "220+",
            info: "Countires around the globe (as of Sept. 30, 2021)",
        },
    ];

  return (
    <div className={Style.about}>
      <div className={Style.about_box}>
        <div className={Style.about_box_hero}>
            <div className={Style.about_box_hero_left}>
                <h1>👋 About Us</h1>
                <p>
                    We are impartial and independent, and everyday we create
                    distinctive, world-class programmes and content which informs,
                    educate and entertain millions of people around the world.
                </p>
            </div>
            <div className={Style.about_box_hero_right}>
                <Image 
                    src={images.hero_2}
                />
            </div>
        </div>

        <div className={Style.about_box_title}>
            <h2>Founders</h2>
            {/* <p>
                We’re impartial and independent, and every day we create
                distinctive, world-class programmes and content
            </p> */}
        </div>

        <div className={Style.about_box_founder}>
            <div className={Style.about_box_founder_box}>
                {founderArray.map((el, i)=>(
                    <div className={Style.about_box_founder_box_img}>
                        <Image 
                            src={el.images}
                            alt={el.name}
                            width={250}
                            height={250}
                            className={Style.about_box_founder_box_img_img}
                        />
                        <h3>{el.name}</h3>
                        <p>{el.position}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className={Style.about_box_title}>
            <h2>🚀 Fast Facts</h2>
            <p>
                We’re impartial and independent, and every day we create
                distinctive, world-class programmes and content  
            </p>
        </div>

        <div className={Style.about_box_facts}>
            <div className={Style.about_box_facts_box}>
                {factsArray.map((el, i)=>(
                    <div className={Style.about_box_facts_box_info}>
                        <h3>{el.title}</h3>
                        <p>{el.info}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default about
