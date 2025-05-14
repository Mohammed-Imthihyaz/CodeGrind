import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SingUpPage from "./Pages/SingUpPage";

import ResetPasswordPage from "./Pages/resetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage/>}/>
        <Route path="/frogetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
