import React, { useEffect } from "react";

const tawkToScript = () => {
  useEffect(() => {
    // Set the tawk.to Site ID
    const Tawk_API = window.Tawk_API || {};
    Tawk_API.sites = Tawk_API.sites || {};
    Tawk_API.sites.default = {
      siteId:  '64abc814cc26a871b0276ed1',
    };

    // Load the tawk.to widget script dynamically
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src =  'https://embed.tawk.to/64abc814cc26a871b0276ed1/1h4vgb57n';
    // Insert the script element into the document
    document.head.appendChild(s1);

    return () => {
      // Remove the script element when the component unmounts
      document.head.removeChild(s1);
    };
  }, []);

  return <div></div>;
};

export default tawkToScript;
