import { useEffect } from "react";

function useOutsideHover(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mouseenter", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseleave", handleClickOutside);
    };
  }, [ref, callback]);
}

export { useOutsideHover };
