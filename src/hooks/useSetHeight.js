import { useState, useEffect } from "react";

function useHeight(el) {
  const [heightScrollTrack, setHeight] = useState(0);

  useEffect(() => {
    const scrollTrack = el.current.getBoundingClientRect().top;
    const innerHeight = window.innerHeight;
    const trackHeight = innerHeight - scrollTrack;
    const paddingBottom = 40;
    setHeight(trackHeight - paddingBottom);
  }, [el]);

  return heightScrollTrack;
}

export default useHeight;
