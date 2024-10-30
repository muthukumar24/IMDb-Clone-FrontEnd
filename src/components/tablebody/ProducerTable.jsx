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
import EditProducerModal from "../modals/EditProducerModal";
import { toast } from "react-toastify";

function ProducerTable({ producer, index, getProducers }) {
  const [disable, setDisable] = useState(false);
  const [showEditProducerModal, setShowEditProducerModal] = useState(false);
  const handleEditProducerModalShow = () => setShowEditProducerModal(true);
  const handleEditProducerModalClose = () => setShowEditProducerModal(false);

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

  const handleDeleteProducer = async (id) => {
    await fetch(`https://imdbclone-backend.onrender.com/cast/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setDisable(false);
          getProducers();
        }
      });
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{index + 1}</StyledTableCell>
      <StyledTableCell align="left">{producer.name}</StyledTableCell>
      <StyledTableCell align="center">{producer.dob}</StyledTableCell>
      <StyledTableCell align="center">{producer.gender}</StyledTableCell>
      <StyledTableCell align="left">{producer.bio}</StyledTableCell>
      <StyledTableCell align="center">
        <Fab
          onClick={handleEditProducerModalShow}
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
              handleDeleteProducer(producer._id);
            }}
            color="error"
            aria-label="delete"
          >
            <DeleteRoundedIcon />
          </Fab>
        )}
      </StyledTableCell>
      <EditProducerModal
        showEditProducerModal={showEditProducerModal}
        handleEditProducerModalClose={handleEditProducerModalClose}
        producer={producer}
        getProducers={getProducers}
      />
    </StyledTableRow>
  );
}

export default ProducerTable;