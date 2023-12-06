import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Lists() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.counter.list);

  return (
    <Container>
      {list.map((item) => (
        <Stack
          direction="row"
          marginTop={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction="row" spacing={2}>
            <Typography variant="h5"> {item.task}</Typography>
            <Typography variant="h5"> {item.time}</Typography>
          </Stack>
          <Button variant="contained" color="success">
            EDIT
          </Button>
        </Stack>
      ))}
    </Container>
  );
}

export default Lists;
