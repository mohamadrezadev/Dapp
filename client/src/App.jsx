import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Dashboard from "./Dashboard";
import MenuBar from "./MenuBar";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Nfts } from "./Nfts";

function App() {
  const address = useAddress();
  const location = useLocation();
  const Nav = useNavigate();
  useEffect(() => {
    if (address && location.pathname === "/") {
      Nav("/dashboard", { replace: true });
      NotificationManager.success("ورود موفقیت آمیز");
    }
  }, [address]);

  return (
    <>
      <div>
        {" "}
        <MenuBar />
      </div>

      <div className="container mt-5">
        {/* {!address && (
          // <div> ولت متصل نیست</div>
        ) } */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute address={address}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/nfts" element={<Nfts />} />
        </Routes>
      </div>
      <NotificationContainer />
    </>
  );
}

export default App;
