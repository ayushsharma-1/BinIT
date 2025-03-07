import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import ContactUS from "./pages/list/ContactUS";
import MailSubscription from "./pages/list/MailsSubs";
import NGOData from "./pages/list/NGOData";
import Report from "./pages/list/Report";
import Logout from "./pages/logout/logout";
import Signin from "./pages/signin/Signin";
import Single from "./pages/single/Single";

import { useAuthState } from "react-firebase-hooks/auth";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./config";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <HashRouter>
        {user ? (
          <div className="list">
            <Sidebar />
            <div className="listContainer">
              <Navbar />
              <div className="bodyContainer">
                <div className="backing">
                  <div className="widget">
                    <Routes>
                      {/* Redirect "/" to "/dashboard" */}
                      <Route path="/" element={<Navigate to="/dashboard" />} />

                      {/* Protected routes */}
                      <Route path="/dashboard" element={<Home />} />
                      <Route path="/logout" element={<Logout />} />
                      <Route path="/MailSubscription" element={<MailSubscription />} />
                      <Route path="/MailSubscription/:mailsubsid" element={<Single />} />
                      <Route path="/Reports" element={<Report />} />
                      <Route path="/Reports/:reportid" element={<Single />} />
                      <Route path="/ContactUs" element={<ContactUS />} />
                      <Route path="/ContactUs/:contactid" element={<Single />} />
                      <Route path="/NGOdata" element={<NGOData />} />
                      <Route path="/NGOdata/:NGOid" element={<Single />} />

                      {/* Catch-all: Redirect unknown routes to dashboard */}
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/signin" element={<Signin />} />
            {/* Catch-all for unauthenticated users */}
            <Route path="*" element={<Signin />} />
          </Routes>
        )}
      </HashRouter>
    </div>
  );
}

export default App;
