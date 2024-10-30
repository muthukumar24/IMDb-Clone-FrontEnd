import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LoadingScreen from "../components/LoadingScreen";
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
import ProducerTable from "./tablebody/ProducerTable";
import CreateProducerModal from "./modals/CreateProducerModal";

function Producers() {
  const [producers, setProducers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateProducerModal, setShowCreateProducerModal] = useState(false);
  const handleCreateProducerModalShow = () => setShowCreateProducerModal(true);
  const handleCreateProducerModalClose = () =>
    setShowCreateProducerModal(false);

  const getProducers = async () => {
    const res = await fetch(
      'https://imdbclone-backend.onrender.com/cast/producers',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setLoading(false);
    if (data.data) {
      setProducers(data.data);
    } else {
      setErr(data.error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    setLoading(true);
    getProducers();
  }, []);
  return (
    <div className="mt-5 d-flex flex-column align-items-center container">
      <div className="mb-5 text-uppercase d-flex justify-content-between align-items-center w-100">
        <h2>Producers List</h2>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreateProducerModalShow}
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
                {producers.length === 0 ? (
                  <p className="w-100 text-danger text-center fs-3">
                    There is no Producers to display
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
                        {producers.map((producer, index) => (
                          <ProducerTable
                            producer={producer}
                            index={index}
                            getProducers={getProducers}
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
      <CreateProducerModal
        showCreateProducerModal={showCreateProducerModal}
        handleCreateProducerModalClose={handleCreateProducerModalClose}
        getProducers={getProducers}
      />
    </div>
  );
}

export default Producers;