import React, { useState, useEffect } from "react";
import "./stopwatch.css";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { currentTimeAction } from "../../Slice/counterSlice";
import Popup from "../Popup/Popup";

const Stopwatch = () => {
  const dispatch = useDispatch();

  //   Use State
  const [openDialog, setOpenDialog] = useState(false);
  const [saveVal, setsaveVal] = useState(0);
  const [disabledRest, setdisabledRest] = useState(false);
  const [formData, setformData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [time, setTime] = useState(0); // state to store time
  const [isRunning, setIsRunning] = useState(false); // state to check stopwatch running or not

  // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  //   disable save button if task is empty
  useEffect(() => {
    if (formData.title && formData.description) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  // Hours calculation, Minutes, Seconds,Milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStopHandler = () => {
    setsaveVal(`${hours}:${minutes}:${seconds}:${milliseconds}`);
    setIsRunning(!isRunning);
    if (isRunning) {
      setdisabledRest(false);
    } else {
      setdisabledRest(true);
    }
  };

  const saveHandler = () => {
    setsaveVal(`${hours}:${minutes}:${seconds}:${milliseconds}`);
    setOpenDialog(true);
  };

  // Method to reset timer back to 0
  const resetHandler = () => {
    setTime(0);
  };

  //   close dialog box
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDisabled(true);
  };

  //  collect form Data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => ({
      ...prevState,
      id: Math.random(),
      [name]: value,
      time: saveVal,
    }));
  };

  const handleSubmit = (event) => {
    console.log("formData", formData);
    debugger;
    event.preventDefault();
    dispatch(currentTimeAction(formData));
    setOpenDialog(false);
  };
  return (
    <>
      <Container sx={{ margin: "50px auto 0" }}>
        <Box margin="auto" width="400px">
          <Typography className="stopwatch-time" variant="h2">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </Typography>
          <Stack
            direction="row"
            marginTop="30px"
            spacing={2}
            justifyContent="space-between"
            className="stopwatch-buttons"
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={startAndStopHandler}
            >
              {isRunning ? "Pause" : "Start"}
            </Button>

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={resetHandler}
              disabled={disabledRest}
            >
              Reset
            </Button>

            <Button variant="contained" fullWidth onClick={saveHandler}>
              Save
            </Button>
          </Stack>
        </Box>
      </Container>

      <Popup
        title="Enter title"
        handleClose={handleCloseDialog}
        openPopup={openDialog}
      >
        <Box padding="20px" width="400px">
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter task name"
              fullWidth
              variant="outlined"
              name="title"
              onChange={handleInputChange}
            />

            <TextField
              id="outlined-basic"
              label="Enter task description"
              fullWidth
              variant="outlined"
              name="description"
              sx={{ marginTop: "10px" }}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Time"
              disabled
              name="time"
              value={saveVal}
              sx={{ marginTop: "10px" }}
              onChange={handleInputChange}
            />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              marginTop={2}
            >
              <Button
                variant="contained"
                onClick={handleCloseDialog}
                color="error"
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="success"
                type="submit"
                autoFocus
                disabled={disabled}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Popup>
    </>
  );
};

export default Stopwatch;
