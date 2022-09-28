import Header from "./components/Header";
import Footer from "./components/Footer";
import { useParams } from "react-router-dom";
import {
  Main,
  BuyTicket,
  Calender,
  System,
  Recruit,
  ResetPassword,
  Feedback,
} from "./components/Contents";

import { ManagerInfo, History } from "./components/Me";
import { Routes, Route } from "react-router-dom";

import "./styles/App.scss";

import RemoveSpecialCharacters from "./utils/RemoveSpecialCharacters";
function App() {
  const dict = {
    BuyTicket: { src: <BuyTicket /> },
    Calender: { src: <Calender /> },
    System: { src: <System /> },
    Recruit: { src: <Recruit /> },
    Feedback: { src: <Feedback /> },
    ResetPassword: { src: <ResetPassword /> },
    ManagerInfo: { src: <ManagerInfo /> },
    History: { src: <History /> },
  };
  const Element = () => {
    let params = useParams();
    params = RemoveSpecialCharacters(params.slug);
    return dict[params].src;
  };
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:slug" element={<Element />} />
        <Route path="/password/:slug" element={<Element />} />
        <Route path="/me/:slug" element={<Element />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
