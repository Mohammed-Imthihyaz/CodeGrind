import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SingUpPage from "./Pages/SingUpPage";

import QuestionsPage from "./Pages/QuestionsPage";
import ResetPasswordPage from "./Pages/resetPassword";
import ReviewPage from "./Pages/ReviewPage";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage/>}/>
        <Route path="/frogetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/Review" element={<ReviewPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
