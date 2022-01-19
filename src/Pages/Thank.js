import React from "react";
import "../CSS/Hotel.css";
import { Mail } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
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

function About() {
  let navigate = useNavigate();

  /*
  Im Modul 150 geht es um E-Business Applikationen, wie zum Beispiel
          Webshops und E-Commerce Shops. Unser Auftrag hier war einen eigenen
          Webshop zu kreeiren. Dabei gab es mehrere Möglichkeiten. Wir konnten
          als Frontend Javascript verwenden und als Backend Spring Boot. Dazu
          kann man eine Datenbank Anbindung haben, ein Zahlungssystem und einen
          Web-Server. Ich habe mich dazu entschieden als Frontend React und als
          Backend Firebase zu benutzen. Firebase bringt viele Vorteile mit sich,
          wie eine Datenbank, ein Speicher, Benutzerauthenitfizierung,
          Benutzerverwaltung etc. Geniessen Sie meinen Webshop!
  */
  return (
    <div className="about">
      <div className="topright">
        <h1>Reservation completed!</h1>
      </div>

      <div className="textb">
        <h2>We have received your reservation!</h2>
        <p>We will contact you shortly!</p>
        <Link to="/">
          <Button>Go back to hub</Button>
        </Link>
        <Link to="/show-reservations">
          <Button className="space">Show Reservation</Button>
        </Link>
      </div>
    </div>
  );
}

export default About;
