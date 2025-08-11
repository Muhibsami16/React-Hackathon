import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AddTrainer from "./pages/add-haider";
import ProtectedRoute from "./protectet-route";
import MuhibComp from "./pages/add-muhib";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login /> } />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="muhib" element={
          <ProtectedRoute>
<MuhibComp />
          </ProtectedRoute>
          
          } />
        <Route path="haider" element={
          <ProtectedRoute>
<AddTrainer />
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
