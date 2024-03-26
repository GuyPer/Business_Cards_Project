import { Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Default.css";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import NotFound from "../../pages/NotFound/NotFound";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import { useContext, useEffect } from "react";
import Admin from "../../pages/Admin/Admin";
import User from "../../pages/User/User";
import FavoriteCards from "../../pages/FavoriteCards/FavoriteCards";
import BusinessCards from "../../pages/BusinessCards/BusinessCards";
import CreateNewCard from "../../pages/CreateNewCard/CreateNewCard";
import EditCard from "../../pages/EditCard/EditCard";
import CardDetails from "../../pages/CardDetails/CardDetails";
import { ThemeContext } from "../../context/ThemeContext";
import EditUser from "../../pages/EditUser/EditUser";


export default function Default() {

  const theme = useContext(ThemeContext)

  useEffect(() => {
    theme?.loadThemeFromLS()
  }, [])

  return (
    <div className="Default">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/favourites" element={<FavoriteCards />} />
        <Route path="/mycards" element={<BusinessCards />} />
        <Route path="/newcards" element={<CreateNewCard />} />
        <Route path="/mycards/editcard" element={<EditCard />} />
        <Route path="/user/edituser" element={<EditUser />} />
        <Route path="/mycards/cardDetails" element={<CardDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}
