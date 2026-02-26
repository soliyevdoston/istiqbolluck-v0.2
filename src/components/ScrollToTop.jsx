import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let attempts = 0;

    const scrollToTarget = () => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (attempts < 12) {
          attempts += 1;
          requestAnimationFrame(scrollToTarget);
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    requestAnimationFrame(scrollToTarget);
  }, [pathname, hash]);

  return null;
}
