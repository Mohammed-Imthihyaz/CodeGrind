import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/*<Route path="/questions" element={<QuestionsPage />} />
        <Route path="/review" element={<ReviewPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
