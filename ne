import React, { useEffect, useState } from "react";

const ScrollBanner = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hideBanner, setHideBanner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setTimeout(() => {
        if (st > lastScrollTop) {
          setHideBanner(true);
        } else {
          setHideBanner(false);
        }
        setLastScrollTop(st);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className=>
      {/* Your banner content */}
    </div>
  );
};

export default ScrollBanner;
