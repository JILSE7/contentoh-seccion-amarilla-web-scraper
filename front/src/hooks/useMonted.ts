import { useEffect, useRef } from "react";

const useMounted = () => {
  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    isFirstMount.current = false
  }, []);

  return isFirstMount
}

export default useMounted