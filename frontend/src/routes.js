import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RoutesContainer,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store/store";
import { Provider } from "react-redux";

import Games from "./pages/Games";
import Results from "./pages/Results";
import Pools from "./pages/Pools";
import Records from "./pages/Records";
import Stats from "./pages/Stats";
import Standing from "./pages/Standing";
import MainLayout from "./Layout/MainLayout";
import Teams from "./pages/Teams";
import FbChallanges from "./pages/FbChallanges";
import Admin from "./pages/Admin/FormToggle";
import { LeagueProvider } from "./components/LeagueContext";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/home/home";
import Test from "./pages/test/test";
import { useEffect } from "react";
import { useState } from "react";
import Share from "./pages/Share";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfUse from "./pages/TermOfUse";
import CookiePolicy from "./pages/CookiePolicy";
import AcceptableUsePolicy from "./pages/AcceptableUsePolicy";

const Routes = () => {
  const queryClient = new QueryClient();
  const [isUserAdmin, setIsuserAdmin] = useState(false);
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    setIsuserAdmin(JSON.parse(isAdmin));
  }, []);

  return (
    
    <Provider store={store}>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Router>
          <LeagueProvider>
            <RoutesContainer>
              <Route index element={<HomePage />} />
              <Route element={<MainLayout />}>
                <Route path="/games" element={<Games />} />
                <Route path="/results" element={<Results />} />
                <Route path="/pools" element={<Pools />} />
                <Route path="/record" element={<Records />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/standings" element={<Standing />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/fb-challanges" element={<FbChallanges />} />
                <Route path="/records" element={<Records />} />

                {/* {isUserAdmin && <Route path="/admin" element={<Admin />} />} */}
                <Route path="/admin" element={<Admin />} />

                <Route path="/test" element={<Test />} />
                <Route path="/share" element={<Share />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermOfUse />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route
                  path="/acceptable-use-policy"
                  element={<AcceptableUsePolicy />}
                />
              </Route>
            </RoutesContainer>
          </LeagueProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};
export default Routes;


