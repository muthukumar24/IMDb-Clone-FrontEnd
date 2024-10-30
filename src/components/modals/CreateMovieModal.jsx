import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CreateActorModal from "./CreateActorModal";
import CreateProducerModal from "./CreateProducerModal";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const formValidationSchema = yup.object().shape({
  name: yup.string().required("* Fill Name"),
  yearOfRelease: yup.string().required("* Fill Year of Release"),
  poster: yup.string().required("* Fill Poster"),
  plot: yup.string().required("* Fill Plot"),
  director: yup.string().required("* Fill Director"),
  producer: yup.string().required("* Select Producer"),
  actors: yup.array().required("* Select Actors"),
});

function CreateMovieModal({
  showCreateMovieModal,
  handleCreateMovieModalClose,
  getMovies,
  getActors,
  getProducers,
  actors,
  producers,
}) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");

  const [showCreateActorModal, setShowCreateActorModal] = useState(false);
  const handleCreateActorModalShow = () => setShowCreateActorModal(true);
  const handleCreateActorModalClose = () => setShowCreateActorModal(false);

  const [showCreateProducerModal, setShowCreateProducerModal] = useState(false);
  const handleCreateProducerModalShow = () => setShowCreateProducerModal(true);
  const handleCreateProducerModalClose = () =>
    setShowCreateProducerModal(false);

  const [actorsName, setActorsName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setActorsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      yearOfRelease: "",
      poster: "",
      plot: "",
      director: "",
      producer: "",
      actors: [],
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoadingButton(true);
      const actorsID = [];
      for (let i = 0; i < actorsName.length; i++) {
        for (let j = 0; j < actors.length; j++) {
          if (actorsName[i] === actors[j].name) {
            actorsID.push(actors[j]._id);
          }
        }
      }
      formik.values.actors = actorsID;
      createMovie(values);
    },
  });

  const createMovie = async (values) => {
    await fetch('https://imdbclone-backend.onrender.com/movie/create', {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingButton(false);
        if (data.message) {
          toast.success(data.message);
          formik.resetForm();
          formik.values.actors = [];
          setActorsName([]);
          handleCreateMovieModalClose();
          getMovies();
        } else {
          setErr(data.error);
        }
      });
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={showCreateMovieModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleCreateMovieModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>CREATE NEW MOVIE</h3>
        </Modal.Title>
      </Modal.Header>
      <form className="w-100" onSubmit={formik.handleSubmit}>
        <Modal.Body className="p-4">
          <div>
            <TextField
              id="name"
              name="name"
              type="text"
              variant="outlined"
              size="small"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              fullWidth
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-danger">{formik.errors.name}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <TextField
              id="yearOfRelease"
              name="yearOfRelease"
              type="text"
              variant="outlined"
              size="small"
              label="Year of Release"
              value={formik.values.yearOfRelease}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              fullWidth
            />
            {formik.touched.yearOfRelease && formik.errors.yearOfRelease ? (
              <p className="text-danger">{formik.errors.yearOfRelease}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <TextField
              id="poster"
              name="poster"
              type="text"
              variant="outlined"
              size="small"
              label="Poster"
              value={formik.values.poster}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              fullWidth
            />
            {formik.touched.poster && formik.errors.poster ? (
              <p className="text-danger">{formik.errors.poster}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <TextField
              id="plot"
              name="plot"
              type="text"
              variant="outlined"
              size="small"
              label="Plot"
              value={formik.values.plot}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              fullWidth
            />
            {formik.touched.plot && formik.errors.plot ? (
              <p className="text-danger">{formik.errors.plot}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <TextField
              id="director"
              name="director"
              type="text"
              variant="outlined"
              size="small"
              label="Director"
              value={formik.values.director}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              fullWidth
            />
            {formik.touched.director && formik.errors.director ? (
              <p className="text-danger">{formik.errors.director}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3 d-flex justify-content-between ">
            <FormControl sx={{ minWidth: 250 }} size="small">
              <InputLabel id="producer-select">Producer</InputLabel>
              <Select
                labelId="producer-select"
                id="producer"
                name="producer"
                type="select"
                fullWidth
                label="Producer"
                value={formik.values.producer}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
              >
                {producers.map((pro, index) => (
                  <MenuItem value={pro._id} key={index}>
                    {pro.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.producer && formik.errors.producer ? (
                <p className="text-danger">{formik.errors.producer}</p>
              ) : (
                ""
              )}
            </FormControl>
            <Button variant="contained" onClick={handleCreateProducerModalShow}>
              Add Producer
            </Button>
          </div>
          <div className="mt-3 d-flex justify-content-between ">
            <FormControl sx={{ maxWidth: 300, minWidth: 300 }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">Actors</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={actorsName}
                onChange={handleChange}
                input={<OutlinedInput label="Actors" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {actors.map((actor, index) => (
                  <MenuItem key={index} value={actor.name}>
                    <Checkbox checked={actorsName.indexOf(actor.name) > -1} />
                    <ListItemText primary={actor.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleCreateActorModalShow}>
              Add Actors
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 text-center">
              {err ? (
                <Typography className="mt-3" color={"error"}>
                  {err}
                </Typography>
              ) : null}
            </div>
            <LoadingButton
              className="mt-3"
              variant="contained"
              loading={loadingButton}
              type="submit"
            >
              Create
            </LoadingButton>
          </div>
        </Modal.Body>
      </form>
      <CreateActorModal
        showCreateActorModal={showCreateActorModal}
        handleCreateActorModalClose={handleCreateActorModalClose}
        getActors={getActors}
      />
      <CreateProducerModal
        showCreateProducerModal={showCreateProducerModal}
        handleCreateProducerModalClose={handleCreateProducerModalClose}
        getProducers={getProducers}
      />
    </Modal>
  );
}

export default CreateMovieModal;