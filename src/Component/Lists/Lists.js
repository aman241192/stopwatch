import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popup/Popup";
import { editDataAction } from "../../Slice/counterSlice";

function Lists() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.counter.list);

  const [openPopup, setOpenPopup] = useState(false);
  const [editData, setEditData] = useState({});

  const editCloseHandler = () => {
    setOpenPopup(false);
  };

  const editClickHandler = (item) => {
    setEditData(item);
    setOpenPopup(true);
  };

  const handleInputChange = (e) => {
    setEditData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDataAction(editData));
    setOpenPopup(false);
  };

  return (
    <Container sx={{ mt: "20px" }}>
      {list.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => editClickHandler(item)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Popup
        title="Enter title"
        handleClose={editCloseHandler}
        openPopup={openPopup}
      >
        <Box padding="20px" width="400px">
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter task name"
              fullWidth
              variant="outlined"
              name="title"
              defaultValue={editData?.title}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Enter task description"
              fullWidth
              variant="outlined"
              name="description"
              defaultValue={editData?.description}
              sx={{ marginTop: "10px" }}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Time"
              disabled
              name="time"
              value={editData?.time}
              sx={{ marginTop: "10px" }}
            />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              marginTop={2}
            >
              <Button
                variant="contained"
                onClick={editCloseHandler}
                color="error"
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="success"
                type="submit"
                autoFocus
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Popup>
    </Container>
  );
}

export default Lists;
