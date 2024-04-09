import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { standingPageReducer } from "../store/searchBarSlice";

const Standing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(standingPageReducer());
  }, [dispatch]);

  return <div className=" w-full"></div>;
};

export default Standing;
