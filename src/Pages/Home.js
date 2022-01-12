import React from "react";
//import "../CSS/Home.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import image7 from "../images/7.jpg";
import image8 from "../images/8.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container as Cont,
  Form,
  Row,
  Button,
  ButtonGroup,
  Modal,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
/*
/*<div className="slider">
        <AliceCarousel autoPlay autoPlayInterval="3000">
          <img src={image1} className="sliderimg" />
          <img src={image2} className="sliderimg" />
          <img src={image3} className="sliderimg" />
          <img src={image4} className="sliderimg" />
          <img src={image5} className="sliderimg" />
          <img src={image6} className="sliderimg" />
          <img src={image7} className="sliderimg" />
          <img src={image8} className="sliderimg" />
        </AliceCarousel>
      </div>*/

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="home">
      <div>
        <img src={image1} className="wallpaper"></img>
        <div className="centered">
          Welcome to Vibi Rentals!
          <p></p>
          <Link to="/hotel" className="btn-left">
            <Button variant="success">Rent Hotel</Button>
          </Link>
          <Link to="/house" className="btn-right">
            <Button variant="success">Rent House</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
