import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/VerifyUser.jsx";
import CarListing from "./pages/CarListing.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signOutSuccess } from "./redux/user/user.js";
import Search from "./pages/Search.jsx";
import Car from "./pages/Car.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  const user = useSelector(state => state.user );
  const dispatch = useDispatch();

  useEffect(() => {
   handleToken()
  }, [])
  

  const handleToken =  async () => {

    try {
      const res = await fetch("api/user/verify")
      const data = await res.json();
      console.log(data)
      if(data.success === false ) {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <BrowserRouter  >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<Car />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/car-listing" element={<CarListing />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
