import "./App.css";
import MainPage from "./components/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Loginpage/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ maxWidth: "100%" }}>
        <Routes>
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
