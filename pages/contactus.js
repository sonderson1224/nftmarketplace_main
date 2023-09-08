import React from 'react';
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
} from 'react-icons/ti';
import { HiOutlineMail } from 'react-icons/hi';

// INTERNAL IMPORT
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css"
import { Button } from '../components/componentsindex';

const contactus = () => {
    return (
        <div className={Style.contactus}>
            <div className={Style.contactus_box}>
                <h1>Contact</h1>
                <div className={Style.contactus_boxes}>
                    <div className={Style.contactus_boxes_left}>
                        <div className={Style.contactus_boxes_left_item}>
                            <h3>🗺 ADDRESS</h3>
                            <p>
                                Photo booth tattooed prism, portland taiyaki hoodie neutra
                                typewriter
                            </p>
                        </div>
                        <div className={Style.contactus_boxes_left_item}>
                            <h3>💌 EMAIL</h3>
                            <p>nc.example@example.com</p>
                        </div>
                        <div className={Style.contactus_boxes_left_item}>
                            <h3>☎ PHONE</h3>
                            <p>000-123-657-8798</p>
                        </div>
                        <div className={Style.contactus_boxes_left_item}>
                            <h3>🌏 SOCIALS</h3>
                            <a href="#">
                                <TiSocialFacebook />
                            </a>
                            <a href="#">
                                <TiSocialInstagram />
                            </a>
                            <a href="#">
                                <TiSocialLinkedin />
                            </a>
                            <a href="#">
                                <TiSocialTwitter />
                            </a>
                            <a href="#">
                                <TiSocialYoutube />
                            </a>
                        </div>
                    </div>

                    <div className={Style.contactus_boxes_right}>
                        <form action="">
                            <div className={formStyle.form_box_input}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    placeholder='Sosthenes Hart'
                                    className={formStyle.form_box_input_username}
                                />
                            </div>
                            <div className={formStyle.form_box_input}>
                                <label htmlFor="email">Email</label>
                                <div className={formStyle.form_box_input_box}>
                                    <div className={formStyle.form_box_input_box_icon}>
                                        <HiOutlineMail />
                                    </div>
                                    <input type="email" placeholder='Email' />
                                </div>
                            </div>
                            <div className={formStyle.form_box_input}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                    placeholder='Something about yourself in few words '
                                >
                                </textarea>
                            </div>
                            <Button
                                btnText="Send Message"
                                handleClick={() => { }}
                                classStyle={Style.button}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default contactus
