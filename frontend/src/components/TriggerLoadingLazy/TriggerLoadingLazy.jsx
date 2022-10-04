import { React, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function TriggerLoadingLazy() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "LAZY_LOADING_MOUT",
    });
    return () => {
      dispatch({
        type: "LOADING_LAZY_UNMOUNT",
      });
    };
  }, []);

  return <div>TriggerLoadingLazy</div>;
}
