import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function UseHandleVibrateLazy() {
  const { isLazy } = useSelector((state) => state.LazyReducer);
  const clear = useRef(null);
  const [isLazyout, setisLazyout] = useState(false);
  useEffect(() => {
    if (isLazy) {
      setisLazyout(true);
      clearTimeout(clear.current);
    } else {
      clear.current = setTimeout(() => {
        setisLazyout(false); // chờ 100ms sau mới chuyển sang false, nhưng nếu chưa tới 100ms mà isLazy chuyển thành true thì hủy set false
      }, 100);
    }
  }, [isLazy]);
  return isLazyout;
}
