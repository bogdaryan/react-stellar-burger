import { useState, useEffect } from "react";

function useHeight(el, paddingBottom = 40) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const scrollTrack = el.current.getBoundingClientRect().top;
    const innerHeight = window.innerHeight;
    const trackHeight = innerHeight - scrollTrack;
    setHeight(trackHeight - paddingBottom);
  }, [el, paddingBottom]);

  return height;
}

export default useHeight;
