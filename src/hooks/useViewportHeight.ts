import { useState, useEffect, RefObject } from "react";

function useViewportHeight(
  el: RefObject<HTMLElement>,
  paddingBottom = 40,
  isConstructorContainer?: boolean
) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      const scrollTrack = el.current!.getBoundingClientRect().top;
      const innerHeight = window.innerHeight;
      const trackHeight = innerHeight - scrollTrack;

      setHeight(trackHeight - paddingBottom);

      if (isConstructorContainer) {
        const itemList = el.current!.firstChild as HTMLElement;
        const itemListHeight = itemList.clientHeight;

        setHeight(trackHeight - itemListHeight * 2 - paddingBottom);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [el, paddingBottom, isConstructorContainer]);

  return height;
}

export default useViewportHeight;
