import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const displayToast = (message, type) => {
  const toastType = type === "success" ? toast.success : toast.error;

  toastType(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default displayToast;
