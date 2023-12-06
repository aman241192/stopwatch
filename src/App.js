import logo from "./logo.svg";
import "./App.css";
import Stopwatch from "./Component/Stopwatch/Stopwatch";
import { Box, Stack } from "@mui/material";
import Lists from "./Component/Lists/Lists";

function App() {
  return (
    <div className="App">
      <Box>
        <Stopwatch />
        <Lists />
      </Box>
    </div>
  );
}

export default App;
