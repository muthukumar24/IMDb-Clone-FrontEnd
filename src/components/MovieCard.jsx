import React, { useState } from "react";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditMovieModal from "./modals/EditMovieModal";
import { toast } from "react-toastify";

function MovieCard({
  movie,
  getMovies,
  getActors,
  getProducers,
  actors,
  producers,
}) {
  const [disable, setDisable] = useState(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const handleEditMovieModalShow = () => setShowEditMovieModal(true);
  const handleEditMovieModalClose = () => setShowEditMovieModal(false);

  const handleDeleteMovie = async (id) => {
    await fetch(`https://imdbclone-backend.onrender.com/movie/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setDisable(false);
          getMovies();
        }
      });
  };
  return (
    <div className="col mb-5">
      <div className="card bg-black h-100 overflow-hidden text-white">
        <img className="movie-img" src={movie.poster} alt={movie.name} />
        <div className="card-header d-flex justify-content-between align-items-center ">
          <h5>{movie.name}</h5>
          <h6>{movie.yearOfRelease}</h6>
        </div>
        <div className="card-body">
          <p>
            <span className="text-warning">Director : </span>
            {movie.director}
          </p>
          <p className="mt-1">
            <span className="text-warning">Producer : </span>
            {movie.producer.name}
          </p>
          <div className="mt-1">
            <p>
              <span className="text-warning">Cast : </span>
              {movie.actors.map((actor, index) =>
                index === movie.actors.length - 1 ? (
                  <span key={index}>{actor.name} </span>
                ) : (
                  <span key={index}>{actor.name}, </span>
                )
              )}
            </p>
          </div>
          <p className="movie-plot-div mt-1">
            <span className="text-warning">Plot : </span>
            <span className="movie-plot">{movie.plot}</span>
          </p>
        </div>
        <div className="card-footer">
          <div className="mb-2">
            <Fab
              onClick={handleEditMovieModalShow}
              size="small"
              color="success"
              aria-label="edit"
            >
              <EditIcon />
            </Fab>
          </div>
          <div className="mb-2">
            {disable ? (
              <Fab disabled size="small" color="error" aria-label="delete">
                <DeleteRoundedIcon />
              </Fab>
            ) : (
              <Fab
                size="small"
                onClick={() => {
                  setDisable(true);
                  handleDeleteMovie(movie._id);
                }}
                color="error"
                aria-label="delete"
              >
                <DeleteRoundedIcon />
              </Fab>
            )}
          </div>
        </div>
      </div>
      <EditMovieModal
        showEditMovieModal={showEditMovieModal}
        handleEditMovieModalClose={handleEditMovieModalClose}
        movie={movie}
        getMovies={getMovies}
        getActors={getActors}
        getProducers={getProducers}
        actors={actors}
        producers={producers}
      />
    </div>
  );
}

export default MovieCard;