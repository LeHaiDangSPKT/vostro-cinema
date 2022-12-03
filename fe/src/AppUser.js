import Header from "./components/Header";
import Footer from "./components/Footer";
import { useParams, Routes, Route } from "react-router-dom";
import { Main, Recruit, ResetPassword, Feedback } from "./components/Contents";

import { Invoice } from "./components/Me";

import { ManagerInfo, History } from "./components/Me";
import "./styles/index.scss";

import RemoveSpecialCharacters from "./utils/RemoveSpecialCharacters";

function AppUser() {
  const dict = {
    Recruit: { src: <Recruit /> },
    Feedback: { src: <Feedback /> },
    ResetPassword: { src: <ResetPassword /> },
    ManagerInfo: { src: <ManagerInfo /> },
    History: { src: <History /> },
    Invoice: { src: <Invoice /> },
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

export default AppUser;
