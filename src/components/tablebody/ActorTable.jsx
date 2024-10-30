import React, { useState } from "react";
import {
  Fab,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditActorModal from "../modals/EditActorModal";
import { toast } from "react-toastify";

function ActorTable({ actor, index, getActors }) {
  const [disable, setDisable] = useState(false);
  const [showEditActorModal, setShowEditActorModal] = useState(false);
  const handleEditActorModalShow = () => setShowEditActorModal(true);
  const handleEditActorModalClose = () => setShowEditActorModal(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleDeleteActor = async (id) => {
    await fetch(`https://imdbclone-backend.onrender.com/cast/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setDisable(false);
          getActors();
        }
      });
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{index + 1}</StyledTableCell>
      <StyledTableCell align="left">{actor.name}</StyledTableCell>
      <StyledTableCell align="center">{actor.dob}</StyledTableCell>
      <StyledTableCell align="center">{actor.gender}</StyledTableCell>
      <StyledTableCell align="left">{actor.bio}</StyledTableCell>
      <StyledTableCell align="center">
        <Fab
          onClick={handleEditActorModalShow}
          size="small"
          color="success"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
      </StyledTableCell>
      <StyledTableCell align="center">
        {disable ? (
          <Fab disabled size="small" color="error" aria-label="delete">
            <DeleteRoundedIcon />
          </Fab>
        ) : (
          <Fab
            size="small"
            onClick={() => {
              setDisable(true);
              handleDeleteActor(actor._id);
            }}
            color="error"
            aria-label="delete"
          >
            <DeleteRoundedIcon />
          </Fab>
        )}
      </StyledTableCell>
      <EditActorModal
        showEditActorModal={showEditActorModal}
        handleEditActorModalClose={handleEditActorModalClose}
        actor={actor}
        getActors={getActors}
      />
    </StyledTableRow>
  );
}

export default ActorTable;