import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LoadingScreen  from "../components/LoadingScreen";
import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  TableContainer,
  TableBody,
} from "@mui/material";
import ActorTable from "./tablebody/ActorTable";
import CreateActorModal from "./modals/CreateActorModal";

function Actors() {
  const [actors, setActors] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateActorModal, setShowCreateActorModal] = useState(false);
  const handleCreateActorModalShow = () => setShowCreateActorModal(true);
  const handleCreateActorModalClose = () => setShowCreateActorModal(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const getActors = async () => {
    const res = await fetch('https://imdbclone-backend.onrender.com/cast/actors', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    if (data.data) {
      setActors(data.data);
    } else {
      setErr(data.err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getActors();
  }, []);
  return (
    <div className="mt-5 d-flex flex-column align-items-center container">
      <div className="mb-5 text-uppercase d-flex justify-content-between align-items-center w-100">
        <h2>Actors List</h2>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreateActorModalShow}
        >
          <AddIcon />
        </Fab>
      </div>
      <div className="w-100">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <LoadingScreen h={"15%"} w={"3.5%"} c={"#e4d00a"} />
          </div>
        ) : (
          <div className="w-100">
            {err === "" ? (
              <div className="w-100 mb-5">
                {actors.length === 0 ? (
                  <p className="w-100 text-danger text-center fs-3">
                    There is no Actors to display
                  </p>
                ) : (
                  <TableContainer component={Paper} className="table-container">
                    <Table sx={{ minWidth: 1000 }}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">S.NO</StyledTableCell>
                          <StyledTableCell align="left">NAME</StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ width: "125px" }}
                          >
                            DOB
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            GENDER
                          </StyledTableCell>
                          <StyledTableCell align="left">BIO</StyledTableCell>
                          <StyledTableCell align="center">EDIT</StyledTableCell>
                          <StyledTableCell align="center">
                            DELETE
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {actors.map((actor, index) => (
                          <ActorTable
                            actor={actor}
                            index={index}
                            getActors={getActors}
                            key={index}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            ) : (
              <p className="text-danger text-center">{err}</p>
            )}
          </div>
        )}
      </div>
      <CreateActorModal
        showCreateActorModal={showCreateActorModal}
        handleCreateActorModalClose={handleCreateActorModalClose}
        getActors={getActors}
      />
    </div>
  );
}

export default Actors;