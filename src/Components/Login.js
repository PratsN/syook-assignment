import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const LoginData = [
    {
      id: 1,
      username: "amar",
      password: "amar123",
    },
    {
      id: 2,
      username: "akbar",
      password: "akbar123",
    },
    {
      id: 3,
      username: "antony",
      password: "antony123",
    },
    {
      id: 4,
      username: "john",
      password: "john123",
    },
    {
      id: 5,
      username: "paul",
      password: "paul123",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  //state to store input user credentials
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  //get the values enterred by user

  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    setInput((values) => ({ ...values, [id]: value }));
  };

  //submit the users credentials

  const handleSubmit = () => {
    const findUser = LoginData.find((user) => user.username === input.username);

    if (findUser) {
      persistLogin(findUser.username);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/products");
    } else {
      enqueueSnackbar("User not found", { variant: "warning" });
    }
  };

  //store the username to further user
  const persistLogin = (username) => {
    localStorage.setItem("username", username);
  };

  return (
    <>
      <Header hasHiddenAuthButtons={false}></Header>
      <Box className="hero">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username..."
            onChange={handleChange}
            value={input.username}
            fullWidth
          />

          <TextField
            required
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={input.password}
            fullWidth
            placeholder="Enter a password..."
          />
          <div>username : amar & password: amar123</div>
          <Button className="button" variant="contained" onClick={handleSubmit}>
            Login to DishPoll
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
