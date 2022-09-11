import React from "react";
import "./Header.css"
import { Avatar, Button, Stack } from "@mui/material";
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Header =({hasHiddenAuthButtons }) => {

 
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  

    //logout button logic
    const logout = () => {
      localStorage.removeItem("username");
      navigate("/")
      enqueueSnackbar("You have Logged off successfully", { variant: "success" })
      window.location.reload()
    }

    //login button logic

    const login_btn = (
        <Stack>
        <button  className="login-btn" onClick={() => navigate("/login")}>LOGIN</button>
        </Stack>
       
    )

    //user login button display to avatar , name and logout button
    const logout_btn = (
      <Stack  spacing={2} direction="row" alignItems="center" >
      <Avatar src="avatar.png" alt={localStorage.getItem("username")} />
      <p>{localStorage.getItem("username")}</p>
      <button className="login-btn"onClick={logout}>LOGOUT</button>

    </Stack>
    )
//header logic to toggle between login and logout state
    
  const alternate_header = localStorage.getItem("username")  ? 
  [logout_btn] : [login_btn]


    return (
        <>
        <Box className="header">
            <Box className="logo">
                DishPoll
            </Box>

            {hasHiddenAuthButtons && 
          alternate_header 
      }

       {!hasHiddenAuthButtons &&
        <Button
      className="explore-button"
      variant="text"
      onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      }


        </Box>
        </>
    )
}

export default Header;