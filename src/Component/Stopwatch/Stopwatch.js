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
import Dialog from "@mui/material/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { currentTimeAction } from "../../Slice/counterSlice";

const Stopwatch = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [saveVal, setsaveVal] = useState(0);

  const [formData, setformData] = useState("");
  const [disabled, setDisabled] = useState(true);
  // state to store time
  const [time, setTime] = useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation, Minutes, Seconds,Milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStopHandler = () => {
    setsaveVal(`${hours}:${minutes}:${seconds}:${milliseconds}`);
    setIsRunning(!isRunning);
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
      [name]: value,
      time: saveVal,
    }));
  };

  useEffect(() => {
    if (formData.task) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  const handleSubmit = (event) => {
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
            >
              Reset
            </Button>
            <Button variant="contained" fullWidth onClick={saveHandler}>
              Save
            </Button>
          </Stack>
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box padding="20px" width="400px">
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" marginBottom="10px">
              Enter title to save task
            </Typography>

            <TextField
              id="outlined-basic"
              label="Enter task name"
              fullWidth
              variant="outlined"
              name="task"
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
      </Dialog>
    </>
  );
};

export default Stopwatch;
