import "./App.css";
import MainPage from "./components/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Loginpage/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
