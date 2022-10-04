import { useParams, Routes, Route } from "react-router-dom";
import Header from "./components/Admin/Header";
import Footer from "./components/Footer";
import {
  Main,
  ManagerUser,
  ManagerCalender,
  ManagerFilms,
  ManagerTicket,
  ManagerFoodAndDrink,
  ManagerDashboard,
} from "./components/Admin/Content";
import "./styles/App.scss";
import RemoveSpecialCharacters from "./utils/RemoveSpecialCharacters";

function AppAdmin() {
  const dict = {
    Main: { src: <Main /> },
    ManagerUser: { src: <ManagerUser /> },
    ManagerCalender: { src: <ManagerCalender /> },
    ManagerFilms: { src: <ManagerFilms /> },
    ManagerTicket: { src: <ManagerTicket /> },
    ManagerFoodAndDrink: { src: <ManagerFoodAndDrink /> },
    ManagerDashboard: { src: <ManagerDashboard /> },
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
        <Route path="/admin" element={<Main />} />
        <Route path="/admin/:slug" element={<Element />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppAdmin;
