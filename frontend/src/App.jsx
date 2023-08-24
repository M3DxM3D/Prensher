/* eslint-disable camelcase */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Invitation from "./pages/Invitation/Invitation";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import NewPassword from "./pages/NewPassword/NewPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext"; 

import "./styles/reset.css";
import "./styles/index.scss";

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/invitation" element={<Invitation />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/new-password" element={<NewPassword />} />
            </Routes>
          </Router>
        </div>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
