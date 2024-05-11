import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Auth from "../pages/Auth";
import { useContext } from "react";
import { AppContext } from "./AppContexts";
import CustomToast from "../components/toast";
import Feed from "../pages/Feed";

function Navigation() {
  const { userData } = useContext(AppContext);

  // Create a Protected Route Component
  const ProtectedRoute = ({ children }) => {

    return userData ? children : <Navigate to="/auth" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/shatt" element={<Chat />} />
      <Route path='/feed' element={<Feed />} />

      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default Navigation;
