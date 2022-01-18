import React from "react";
import "../CSS/Hotel.css";
import { Mail } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";

function About() {
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
        <h1>About Me:</h1>
      </div>

      <div className="textb">
        {" "}
        <h2>Um was geht es hier?</h2>
        Im Modul 150 geht es um E-Business Applikationen, wie zum Beispiel
        Webshops und E-Commerce Shops. Unser Auftrag hier war einen eigenen
        Webshop zu kreeiren. Dabei gab es mehrere Möglichkeiten. Wir konnten als
        Frontend Javascript verwenden und als Backend Spring Boot. Dazu kann man
        eine Datenbank Anbindung haben, ein Zahlungssystem und einen Web-Server.
        Ich habe mich dazu entschieden als Frontend React und als Backend
        Firebase zu benutzen. Firebase bringt viele Vorteile mit sich, wie eine
        Datenbank, ein Speicher, Benutzerauthenitfizierung, Benutzerverwaltung
        etc. Geniessen Sie meinen Webshop!
        <br />
        <br />
        <br />
        <h2>Wie funktioniert es?</h2>
        Hier können sie ganz einfach auf die Produkte klicken und diese
        reservieren. Danach füllen sie ein Kontaktformular aus, um dieses Objekt
        zu reservieren.
        <br />
        <br />
        <br />
        <h2>Wer hat diesen Webshop erstellt?</h2>
        <Grid item xs={12} md={6}>
          <p>Vibishek Rathirajan</p>
          <p>Hardturmstrasse 269 </p>
          <p>8005 Zürich</p>
          <p>
            E-Mail:
            <a href="mailto:Vibishek@gmx.ch"> Vibishek@gmx.ch</a>
          </p>
        </Grid>
        <h2>Betreuer:</h2>
        <Grid item xs={12} md={6}>
          <p>Peter Rutschmann</p>
          <p>Berufsbildungsschule Winterthur </p>
          <p>
            E-Mail:
            <a href="peter.rutschmann@bbw.ch"> peter.rutschmann@bbw.ch</a>
          </p>
        </Grid>
      </div>
    </div>
  );
}

export default About;
