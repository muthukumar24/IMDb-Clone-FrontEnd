import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import IMDBIcon from "../assets/imdb_icon.png";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const formValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Atleast 4 charaters required.")
    .required("* Fill Username"),
  email: yup
    .string()
    .email("Enter valid email address")
    .required("* Fill Email Address"),
  password: yup.string().required("* Fill Password"),
});

function Signup() {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoadingButton(true);
      createUser(values);
    },
  });

  const createUser = async (values) => {
    await fetch('https://imdbclone-backend.onrender.com/user/signup', {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingButton(false);
        if (data.message) {
          toast.success(data.message)
          navigate("/login");
        } else {
          setErr(data.error);
        }
      });
  };
  return (
    <div className="signup-main-div d-flex justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="signup-div container-sm p-2 p-sm-5 d-flex flex-column justify-content-center align-items-center"
      >
        <img src={IMDBIcon} alt="imdb_icon" />
        <h3>SignUp</h3>
        <div className="mt-4 w-100">
          <TextField
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Username"
            fullWidth
            size="small"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-danger">{formik.errors.username}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3 w-100">
          <TextField
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Email"
            fullWidth
            size="small"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3 w-100">
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Password"
            fullWidth
            size="small"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>
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
        <Link
          className="mt-4 w-100 text-center text-decoration-none text-black login-link"
          to={"/login"}
        >
        Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Signup;