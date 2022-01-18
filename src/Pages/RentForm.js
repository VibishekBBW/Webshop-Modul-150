import React from "react";
import { Firestore } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

export default function RentForm() {
  /*
  constructor() {
    super();
    this.state = {
      vorname: "",
      nachname: "",
      strasse: "",
      plz: "",
      ort: "",
    };
  }
  */
  /*
  const [vorname, setVorname] = useState("");
  const [name, setName] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
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
    <React.Fragment>
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
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
