import React from "react";
import { collection, Firestore, getDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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

function Reservations() {
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
  const { idx } = useParams();
  const [haus, setHaus] = useState({});
  const [resHaus, setReshaus] = useState({});
  let navigate = useNavigate();

  const theme = createTheme();
  let counter = 0;

  console.log("House ID:");
  console.log(idx);

  async function getHaus() {
    let collectionData = [];
    let collectionHaus = await getDocs(collection(db, "haus"));

    collectionHaus.forEach(
      (d) => (collectionData = [...collectionData, { ...d.data(), id: d.id }])
    );
    console.log(collectionData);
    setHaus(collectionData[idx]);
    console.log("RES HAUS:");
    console.log(haus);
  }
  console.log("RES HAUS:");
  console.log(haus);

  useEffect(() => {
    getHaus();
    //pushHaus();
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

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
    let authToken = sessionStorage.getItem("Auth Token");
    event.preventDefault();
    addDoc(collection(db, "reservations"), {
      email: authToken,
      name: name,
      vorname: vorname,
      strasse: strasse,
      ort: ort,
      plz: plz,
      resHaus: haus.place,
      resprice: haus.price,
      amenities: haus.amenities,
      bathrooms: haus.bathrooms,
      bedrooms: haus.bedrooms,
      beschreibung: haus.beschreibung,
      exterior: haus.exterior,
      features: haus.features,
      flyer: haus.flyer,
      free: haus.free,
      year: haus.year,
    });
  };

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="pos">
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Kontaktformular
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="vorname"
                  name="vorname"
                  label="Vorname"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(event) => setVorname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="nachname"
                  name="nachname"
                  label="Nachname"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="strasse"
                  name="strasse"
                  label="Strasse"
                  fullWidth
                  autoComplete="strasse"
                  variant="standard"
                  onChange={(event) => setStrasse(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="plz"
                  name="plz"
                  label="PLZ"
                  fullWidth
                  autoComplete="plz"
                  variant="standard"
                  onChange={(event) => setPlz(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="ort"
                  name="ort"
                  label="Ort"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={(event) => setOrt(event.target.value)}
                />
              </Grid>
            </Grid>
            <button type="submit">Submit</button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Reservations;
