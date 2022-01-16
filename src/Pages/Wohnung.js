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
import { getDocs, data } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { BackupOutlined, HouseSiding } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Iframe from "react-iframe";

//<Link to="/form">Mieten</Link>

function Wohnung() {
  const [house, setHouse] = useState([]);
  const [image, setImage] = useState([]);
  const [anfahrt, setAnfahrt] = useState([]);
  const [display, setDisplay] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sortedColl, setSortedColl] = useState([]);
  const [imageIndex, setImageIndex] = useState([]);
  const [backup, setBackup] = useState([]);
  const [newArr, setNewArr] = useState([]);
  let navigate = useNavigate();

  async function fetchHouses() {
    let imageData = [];
    const storage = getStorage();
    const storageRef = ref(storage);
    let collectionHouses = await getDocs(collection(db, "houses"));
    let collectionData = [];
    let displayData = [];
    let anf = [];

    collectionHouses.forEach(
      (doc) =>
        (collectionData = [...collectionData, { ...doc.data(), id: doc.id }])
    );

    for (let i = 0; i < collectionData.length; i++) {
      for (let j = 0; j < collectionData[i].images.length; j++) {
        getDownloadURL(ref(storage, collectionData[i].images[j])).then(
          (url) => {
            imageData = [
              ...imageData,
              { url: url, name: collectionData[i].images[j] },
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
      setImage(imageData);
      setImageIndex(imageData);
      console.log("IMAGES:");
      console.log(image);
    });

    for (let i = 0; i < collectionData.length; i++) {
      getDownloadURL(ref(storage, collectionData[i].displayImage)).then(
        (url) => {
          displayData = [
            ...displayData,
            { url: url, name: collectionData[i].displayImage },
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

    setHouse(collectionData);
    console.log("HOUSEDATA:");
    console.log(house);

    //console.log(house);
    //console.log(imageData);

    for (let i = 0; i < collectionData.length; i++) {
      getDownloadURL(ref(storage, collectionData[i].doc)).then((pdf) => {
        anf = [...anf, { url: pdf, name: collectionData[i].doc }];
        //console.log("DisplayData:");
        //console.log(displayData);
        function compare(a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;

          return 0;
        }
        anf.sort(compare);
        setAnfahrt(anf);
        console.log("ANFAHRT:");
        console.log(anfahrt);
      });
      console.log(anfahrt);
    }
  }

  /*
  function setImageName(setter, name, imageData = image.slice()) {
    console.log(name, imageData);
    let index = imageData.findIndex((img) => img.name === name);
    if (index != -1) {
      setter(imageData[index].url);
      imageData.splice(index, 1);
      setImage(imageData);
    }
  }
  */

  /*
  const housecoll = query(collection(db, "houses"));
  */

  /*
  async function fetchHouses() {
    let collectionHouses = await getDocs(collection(db, "houses"));
    let collectionData = [];

    collectionHouses.forEach(
      (doc) =>
        (collectionData = [...collectionData, { ...doc.data(), id: doc.id }])
    );

    setHouse(collectionData);
    console.log(house.length);
    console.log(collectionData);
  }
  */
  /*
  function sortImages() {
    let sortedImages = image;
    sortedImages.name.sort();
    console.log("SORTED IMAGES");
    console.log(sortedImages);
  }
  

  
  function filterImages(props) {
    let name = imageIndex.name;
    newArr = name.filter((f) => f.charAt(0) === this.props.idx + 1);

    setImageIndex(newArr);
    console.log("Filter Array");
    console.log(newArr);

    return imageIndex.map((i) => (
      <ImageList variant="masonry" cols={3} gap={8}>
        <img src={i.url} idx={this.props.idx}></img>
      </ImageList>
    ));
  }

  console.log("Filter Array");
  console.log(newArr);

  */

  /*
  async function ImagesShow(props) {
    for (let i = 0; i < image.length; i++) {
      if (parseInt(image[i].name.charAt(0)) === props.idx + 1) {
        console.log("BACK UP TO PUSH:");
        console.log(image[i]);
        backup.push(image[i]);
      }
    }

    console.log("Backup Images:");
    console.log(backup);

    for (let j = 0; j < backup.length; j++) {
      if (backup[j] === backup[j + 1]) {
        console.log(backup[j]);
        backup.splice(j, j);
      }
    }
    console.log("Backup cleared:");
    console.log(backup);

    return (
      <>
        {backup.map((e, id) => (
          <p>{id}</p>
        ))}
        {backup.map((h) => (
          <img src={h.url}></img>
        ))}
      </>
    );
  }
  */

  useEffect(() => {
    fetchHouses();
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/hotel");
    }

    if (!authToken) {
      navigate("/sign-in");
    }
  }, []);

  /*
  function Bemerkung(props) {
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.idx.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="recipient-name" className="col-form-label">
                {props.idx.beschreibung}
                <br />
                <br />
                <br />
                <h4>Details:</h4>
                <br />
                Preis: {props.idx.price}
                <br />
                Zimmertyp: {props.idx.roomtype}
                <br />
                Personen: {props.idx.personen}
                <br />
                Frühstück inbegriffen:{" "}
                {props.idx.breakfast === true ? "Ja" : "Nein"}
                <br />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schliessen
            </Button>
            <Link to="/form">
              //<Button onSubmit={handleBemerkung} variant="primary">
                Reservieren
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    );
}
*/

  /*
                      {
                        image.map((item) => (
                          <ImageListItem key={item.id}>
                            <img
                              src={item.url}
                              alt={item.title}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ));
                      }
                      */

  return (
    <div className="wohnung">
      <div className="topright">
        <h1>Hotels in Zürich</h1>
      </div>
      <div className="divb">
        {imageIndex[0] &&
          display[house.length - 1] &&
          house.map((obj, idx) => (
            <Col className="box" key={idx.id}>
              <div>
                <img src={display[idx].url}></img>
                <div className="text">{obj.name}</div>
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
                    <Modal.Title>{obj.name}</Modal.Title>
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
                        Zimmertyp: {obj.roomtype}
                        <br />
                        Personen: {obj.personen}
                        <br />
                        Frühstück verfügbar:{" "}
                        {obj.breakfast === true ? "Ja" : "Nein"}
                        <br />
                      </label>
                    </div>
                    <br />
                    {anfahrt
                      .filter((pdf) => parseInt(pdf.name.charAt(0)) === idx + 1)
                      .map((pdf, id) => (
                        <a href={pdf.url} target="_blank">
                          Download Anfahrt
                        </a>
                      ))}
                    <br />
                    {image
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
                    <Link to="/form">
                      <Button /*onSubmit={handleBemerkung}*/ variant="primary">
                        Reservieren
                      </Button>
                    </Link>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
          ))}
      </div>
    </div>
  );
}

export default Wohnung;
