import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Skeleton, Container } from "@mui/material";
import { db, storage } from "../Firebase-config";
import { useState, useEffect } from "react";
import { collection, query } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageList, ImageListItem } from "@mui/material";
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
import "../CSS/Hotel.css";
import { getDocs, data, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { BackupOutlined, HouseSiding } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Iframe from "react-iframe";
import Reservations from "./Reservations";
import { useParams } from "react-router";

function Haus() {
  const [haus, setHaus] = useState([]);
  const [bilder, setBilder] = useState([]);
  const [display, setDisplay] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sortedColl, setSortedColl] = useState([]);
  const [imageIndex, setImageIndex] = useState([]);
  let navigate = useNavigate();
  const [flyers, setFlyers] = useState([]);
  const { idx } = useParams();

  async function fetchHaus() {
    let imageData = [];
    const storage = getStorage();
    const storageRef = ref(storage);
    let collectionHaus = await getDocs(collection(db, "haus"));
    let collectionData = [];
    let displayData = [];
    let flyer = [];

    collectionHaus.forEach(
      (d) => (collectionData = [...collectionData, { ...d.data(), id: d.id }])
    );

    console.log("Collection:");
    console.log(collectionData);

    for (let i = 0; i < collectionData.length; i++) {
      for (let j = 0; j < collectionData[i].images.length; j++) {
        getDownloadURL(ref(storage, collectionData[i].images[j])).then(
          (link) => {
            imageData = [
              ...imageData,
              { url: link, name: collectionData[i].images[j] },
            ];
          }
        );
      }
    }

    getDownloadURL(ref(storage, collectionData[0].images[0])).then((url) => {
      imageData = [
        ...imageData,
        { url: url, name: collectionData[0].images[0] },
      ];
      console.log("IMAGES + 1:");
      console.log(imageData);
      imageData.pop();
      function compare(a, b) {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;

        return 0;
      }

      imageData.sort(compare);
      setBilder(imageData);
      setImageIndex(imageData);
      console.log("IMAGES:");
      console.log(bilder);
    });

    for (let i = 0; i < collectionData.length; i++) {
      getDownloadURL(ref(storage, collectionData[i].displayImage)).then(
        (link) => {
          displayData = [
            ...displayData,
            { url: link, name: collectionData[i].displayImage },
          ];
          //console.log("DisplayData:");
          //console.log(displayData);
          function compare(a, b) {
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;

            return 0;
          }
          displayData.sort(compare);
          setDisplay(displayData);
        }
      );
    }

    setHaus(collectionData);
    console.log("HOUSEDATA:");
    console.log(haus);

    for (let i = 0; i < collectionData.length; i++) {
      getDownloadURL(ref(storage, collectionData[i].flyer)).then((pdf) => {
        flyer = [...flyer, { url: pdf, name: collectionData[i].flyer }];
        //console.log("DisplayData:");
        //console.log(displayData);
        function compare(a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;

          return 0;
        }
        flyer.sort(compare);
        setFlyers(flyer);
        console.log("FLYERS:");
        console.log(flyers);
      });
    }
    //console.log(house);
    //console.log(imageData);
    console.log("FLYERS:");
    console.log(flyers);
  }

  async function pushHaus() {
    /*
    await setDoc(doc(db, "reservations", "1"), {
      name: "name",
      ort: "zürich",
      country: "sitzerland",
    });
    */
  }

  useEffect(() => {
    fetchHaus();
    //pushHaus();
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/house");
    }

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

  const houseRes = (obj, idx) => {
    let id = idx;
    let ob = obj;
    console.log(id);
    console.log(ob);

    <Reservations obj={ob} idx={id} />;
  };

  return (
    <div className="haus">
      <div className="topright">
        <h1>Luxury Houses in Switzerland</h1>
      </div>
      <div className="divb">
        {imageIndex[0] &&
          display[haus.length - 1] &&
          haus.map((obj, idx) => (
            <Col className="box" key={idx.id}>
              <div>
                <img src={display[idx].url}></img>
                <div className="text">{obj.place}</div>
                <Button
                  variant="primary"
                  onClick={() => setShow(idx)}
                  className="buttonb"
                >
                  Mehr Infos
                </Button>
              </div>
              <div className="float-lg-left">
                <Modal
                  show={show === idx}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{obj.place}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        {obj.beschreibung}
                        <br />
                        <br />
                        <br />
                        <h4>Details:</h4>
                        <br />
                        Preis: {obj.price}
                        <br />
                        Zimmertyp: {obj.year}
                        <br />
                        Personen: {obj.place}
                        <br />
                        Frühstück verfügbar: {obj.free === true ? "Ja" : "Nein"}
                        <br />
                      </label>
                    </div>
                    <br />
                    {flyers
                      .filter((pdf) => parseInt(pdf.name.charAt(0)) === idx + 1)
                      .map((pdf, id) => (
                        <a href={pdf.url} target="_blank">
                          Download Flyer
                        </a>
                      ))}
                    <br />
                    {bilder
                      .filter((img) => parseInt(img.name.charAt(0)) === idx + 1)
                      .map((img, id) => (
                        <ImageListItem>
                          <img src={img.url}></img>
                        </ImageListItem>
                      ))}
                    Hotel auf Google Maps:
                    <br />
                    <Iframe
                      url={obj.googlemaps}
                      width="100%"
                      height="300px"
                      style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                    ></Iframe>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Schliessen
                    </Button>

                    <Button
                      /*onSubmit={handleBemerkung}*/ variant="primary"
                      onClick={() => navigate(`/reservation/${idx}`)}
                    >
                      Reservieren
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
          ))}
      </div>
    </div>
  );
}

export default Haus;
