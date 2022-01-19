import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Wohnung from "./Pages/Wohnung";
import Reservations from "./Pages/Reservations";
import HouseForm from "./Pages/HouseForm";
import Haus from "./Pages/Haus";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Thank from "./Pages/Thank";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { useState } from "react";
import { app, storage } from "./Firebase-config";
import Review from "./Pages/AllForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
} from "firebase/auth";
import { db } from "./Firebase-config";
import { auth } from "./Firebase-config";
import RentForm from "./Pages/RentForm";
import HotelForm from "./Pages/HotelForm";
import AllForm from "./Pages/AllForm";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import ShowReservations from "./Pages/ShowReservations";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const handleAction = (id, e) => {
    e.preventDefault();
    console.log(email, password);
    setUserData(email);
    if (id === 2) {
      console.log(id);
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate("/");
          sessionStorage.setItem("Auth Token", email);
          console.log(response);
          const user = response.user;
          toast.success("Logged-in successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            toast.error("E-Mail is already in use", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          if (error.code === "auth/weak-password") {
            toast.error(
              "Password should be at least 6 characters long for safety reasons!",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
        });
    } else if (id === 1) {
      console.log(id);
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const user = response.user;

          navigate("/");
          sessionStorage.setItem("Auth Token", email);
          //let gettoken = sessionStorage.getItem("Auth Token");
          //console.log(gettoken);
          console.log(user);
          toast.success("Logged-in successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the password", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    /*
    if (authToken) {
      navigate("/");
    }
    */
    //<Route path="/house-form" exact element={<HouseForm />} />

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div>
      <>
        <Navbar />

        <Routes>
          <Route path="/hotel" element={<Wohnung />} />
          <Route path=":idx" element={<Haus />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route
            path="/sign-in"
            element={
              <Login
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={(e) => handleAction(1, e)}
                toast={ToastContainer}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={(e) => handleAction(2, e)}
                toast={ToastContainer}
              />
            }
          />
          <Route path="/rent-form" element={<RentForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/hotel-form" element={<HotelForm />} />
          <Route path="/form" element={<AllForm />} />
          <Route path="/thank-you" element={<Thank />} />

          <Route path="/" exact element={<Home />} />
          <Route path="/reservation/:idx" exact element={<Reservations />} />
          <Route path="/your-reservations" element={<ShowReservations />} />
        </Routes>
      </>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
