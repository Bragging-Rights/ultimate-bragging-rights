import React from "react";
import { toast } from "react-toastify";

const InputValueHanlder = (pred1, pred2, league) => {
  if (league === "NHL" && (pred1 > 12 || pred2 > 12)) {
    toast.info("🦄 Are You Sure !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return true;
  }

  if (league === "NBA" && (pred1 === 0 || pred2 === 0)) {
    toast.error("🦄 Sorry can you can not have 0 value ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return false;
  }

  if (league === "NHL" && pred1 === 0 && pred2 === 0) {
    toast.error("🦄 Sorry can you can  have only one zero preduction ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return false;
  }

  if (league === "NHL" || league === "NBA" || league === "MLB") {
    if (!pred1 || !pred2) {
      return true;
    }

    if (pred1 === pred2) {
      toast.error("🦄 Sorry can you can not have the same value", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  }
  <div></div>;
};

export default InputValueHanlder;
