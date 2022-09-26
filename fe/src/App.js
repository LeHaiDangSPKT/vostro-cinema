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
} from "./components/Contents";
import { Routes, Route } from "react-router-dom";

import "./styles/App.scss";

import RemoveSpecialCharacters from "./utils/RemoveSpecialCharacters";
function App() {
  const dict = {
    Recruit: { src: <Recruit /> },
    BuyTicket: { src: <BuyTicket /> },
    Calender: { src: <Calender /> },
    System: { src: <System /> },
    Recruit: { src: <Recruit /> },
    ResetPassword: { src: <ResetPassword /> },
  };
  const Test = () => {
    let params = useParams();
    params = RemoveSpecialCharacters(params.slug);
    console.log(params);
    return dict[params].src;
  };
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:slug" element={<Test />} />
        <Route path="/password/:slug" element={<Test />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
