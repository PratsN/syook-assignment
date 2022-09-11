import React from "react";
import Header from "./Header"
import "./Products.css"
import { Box } from "@mui/system"
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Products.css"


const Products =() => {

    const navigate = useNavigate();

//page to display when user login
    return (
        <>
        <Header hasHiddenAuthButtons={true}/>


       <Box className="product-main">
        <Stack className="product-form">

            To Cast your Votes Click Here !
            <button className="product-button" onClick={() => navigate("/dishes")}>Vote</button>
        </Stack>

      

       </Box>
       
        </>
    )
}

export default Products;