import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./routes";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/Error/ErrorBoundry";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <React.StrictMode>
            <Router />
          </React.StrictMode>
        </ErrorBoundary>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
