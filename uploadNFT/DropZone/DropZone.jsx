import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import { Loader } from "../../components/componentsindex";
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  category,
  properties,
  uploadToIpfs,
  setImage,
}) => {
  const [fileUrl, setFileUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback(async (acceptedFile) => {
    setIsUploading(true);
    const url = await uploadToIpfs(acceptedFile[0], (val) => {
      if (val) {
        setFileUrl(val);
        setImage(val);
      }
      setIsUploading(false);
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5000000,
  });

  return (
    <>
      <div className={Style.dropzone}>
        {isUploading ? (
          <Loader />
        ) : (
          <div className={Style.dropzone_box} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={Style.dropzone_box_input}>
              <p>{title}</p>
              <div className={Style.dropzone_box_input_img}>
                <Image
                  src={images.upload}
                  alt="upload"
                  width={100}
                  height={100}
                  className={Style.dropzone_box_input_img_img}
                />
              </div>
              <p>{heading}</p>
              <p>{subHeading}</p>
            </div>
          </div>
        )}

        {fileUrl && (
          <aside className={Style.dropzone_box_aside}>
            <div className={Style.dropzone_box_aside_box}>
              <Image src={fileUrl} alt="nft image" width={200} height={200} loading="lazy" />

              <div className={Style.dropzone_box_aside_box_preview}>
                <div className={Style.dropzone_box_aside_box_preview_one}>
                  <p>
                    <span>NFT Name:</span>
                    {name || ""}
                  </p>
                  <p>
                    <span>Website:</span>
                    {website || ""}
                  </p>
                </div>

                <div className={Style.dropzone_box_aside_box_preview_two}>
                  <p>
                    <span>Description:</span>
                    {description || ""}
                  </p>
                </div>

                <div className={Style.dropzone_box_aside_box_preview_three}>
                  <p>
                    <span>Royalties:</span>
                    {royalties || ""}
                  </p>
                  <p>
                    <span>FileSize:</span>
                    {fileSize || ""}
                  </p>
                  <p>
                    <span>Properties:</span>
                    {properties || ""}
                  </p>
                  <p>
                    <span>Category:</span>
                    {category || ""}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
};

export default DropZone;
