import React from "react";
import { collection, Firestore, getDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { db, storage } from "../Firebase-config";
import { getDocs, data, doc, setDoc, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import "../CSS/Hotel.css";
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
import "bootstrap/dist/css/bootstrap.min.css";

function ShowReservations() {
  /*
    constructor(){
    this.state = {
        vorname: ""
      nachname: "",
      strasse: "",
      plz: "",
      ort: "",
        };
    };
    */

  const [vorname, setVorname] = useState("");
  const [name, setName] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  const [res, setRes] = useState([]);
  const [resHaus, setReshaus] = useState({});
  let navigate = useNavigate();
  let authToken = sessionStorage.getItem("Auth Token");

  const theme = createTheme();
  let counter = 0;

  async function getHaus() {
    let collectionData = [];
    let collectionHaus = await getDocs(collection(db, "reservations"));

    collectionHaus.forEach(
      (d) => (collectionData = [...collectionData, { ...d.data(), id: d.id }])
    );
    console.log(collectionData);
    setRes(collectionData);
    console.log("RES HAUS:");
    console.log(res);
  }
  console.log("RES HAUS:");
  console.log(res);

  useEffect(() => {
    getHaus();
    //pushHaus();

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

  /*
  const handleSubmit = (event) => {
    counter = counter + 1;
    /*
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        console.log(formData);
        */
  /*
    let authToken = sessionStorage.getItem("Auth Token");
    event.preventDefault();
    addDoc(collection(db, "reservations"), {
      email: authToken,
      name: name,
      vorname: vorname,
      strasse: strasse,
      ort: ort,
      plz: plz,
    });
    */
  /*
  {res
        .filter((r) => r.email === authToken)
        .map((r, id) => (
          <div className="divb">
            <h2>{r.resHaus}</h2>
          </div>
        ))}
  */

  return (
    /*
      <form>
        <input type="text" name="vorname" placeholder="Vorname" />
        <input type="text" name="nachname" placeholder="Nachname" />
        <input type="email" name="email" placeholder="E-Mail" />
        <button type="submit">Submit</button>
      </form>
      */
    <div className="reservation">
      <div className="topright">
        <h2>Your Reservations</h2>
      </div>

      <table class="table" className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Place</th>
            <th scope="col">Year</th>
            <th scope="col">Price</th>
            <th scope="col">features</th>
            <th scope="col">amenities</th>
            <th scope="col">exterior</th>
            <th scope="col">bathrooms</th>
            <th scope="col">bedrooms</th>
          </tr>
        </thead>
        {res
          .filter((r) => r.email === authToken)
          .map((r, id) => (
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{r.idx}</td>
                <td>{r.resHaus}</td>
                <td>{r.year}</td>
                <td>{r.resprice}</td>
                <td>{r.features}</td>
                <td>{r.amenities}</td>
                <td>{r.exterior}</td>
                <td>{r.bathrooms}</td>
                <td>{r.bedrooms}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default ShowReservations;
