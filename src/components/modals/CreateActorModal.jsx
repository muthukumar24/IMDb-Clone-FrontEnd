import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const formValidationSchema = yup.object().shape({
  name: yup.string().required("* Fill Name"),
  gender: yup.string().required("* Fill Gender"),
  dob: yup.string().required("* Fill DOB"),
  bio: yup
    .string()
    .min(10, "Atleast 10 character required")
    .required("* Fill Bio"),
});

function CreateActorModal({
  showCreateActorModal,
  handleCreateActorModalClose,
  getActors,
}) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      dob: "",
      bio: "",
      professionalType: "Actor",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoadingButton(true);
      createActor(values);
    },
  });

  const createActor = async (values) => {
    await fetch('https://imdbclone-backend.onrender.com/cast/create', {
      method: "POST",
      body: JSON.stringify({
        ...values,
        dob: values.dob.split("-").reverse().join("-"),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingButton(false);
        if (data.message) {
          toast.success(data.message)
          formik.resetForm();
          handleCreateActorModalClose();
          getActors();
        } else {
          setErr(data.error);
        }
      });
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={showCreateActorModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleCreateActorModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>CREATE NEW ACTOR</h3>
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <TextField
                id="dob"
                name="dob"
                type="date"
                variant="outlined"
                size="small"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                fullWidth
              />
              {formik.touched.dob && formik.errors.dob ? (
                <p className="text-danger">{formik.errors.dob}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select
                  labelId="gender-select"
                  id="gender"
                  name="gender"
                  type="select"
                  fullWidth
                  label="Gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="text-danger">{formik.errors.gender}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-3">
            <TextField
              id="bio"
              name="bio"
              type="text"
              variant="outlined"
              label="Bio"
              multiline
              rows={3}
              fullWidth
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
            />
            {formik.touched.bio && formik.errors.bio ? (
              <p className="text-danger">{formik.errors.bio}</p>
            ) : (
              ""
            )}
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
    </Modal>
  );
}

export default CreateActorModal;