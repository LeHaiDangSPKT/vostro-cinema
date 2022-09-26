import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  Main,
  BuyTicket,
  Calender,
  System,
  Recruit,
} from "./components/Contents";
import { Routes, Route } from "react-router-dom";

import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/buy-ticket" element={<BuyTicket />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/system" element={<System />} />
        <Route path="/recruit" element={<Recruit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
