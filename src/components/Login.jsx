import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import IMDBIcon from "../assets/imdb_icon.png";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const formValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email address")
    .required("* Fill Email Address"),
  password: yup.string().required("* Fill Password"),
});

function Login() {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoadingButton(true);
      loginUser(values);
    },
  });

  const loginUser = async (values) => {
    await fetch('https://imdbclone-backend.onrender.com/user/login', {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingButton(false);
        if (data.message) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          setErr(data.error);
        }
      });
  };
  return (
    <div className="login-main-div d-flex justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="login-div container-sm p-2 p-sm-5 d-flex flex-column justify-content-center align-items-center"
      >
        <img src={IMDBIcon} alt="imdb_icon" />
        <h3>Login</h3>
        <div className="mt-4 w-100">
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
          Login
        </LoadingButton>
        <Link
          className="mt-4 text-decoration-none text-black signup-link"
          to={"/signup"}
        >
          Create Account
        </Link>
        
      </form>
    </div>
  );
}

export default Login;