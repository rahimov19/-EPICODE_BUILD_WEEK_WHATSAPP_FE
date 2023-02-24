import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Loginpage/Auth";
import { socket, SocketContent } from "./context/socket";

function App() {
  return (
    <SocketContent.Provider value={socket}>
      <BrowserRouter>
        <div className="App" style={{ maxWidth: "100%" }}>
          <Routes>
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/auth/register" element={<Auth />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SocketContent.Provider>
  );
}

export default App;
