import React  from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
  } from "@mui/material";
import "./DishCard.css"
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'

const DishCard = ({dishes , handleVotes , checkCount , disable}) => {

const {dishName , description , image ,id} = dishes;


//writing a datacard container logic to display each item using mui card component
    return (
     <>
     <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={dishName}
        />
        <CardContent style={{height : "25vh"}}>

            <div className="card-container">
            <Typography gutterBottom variant="h5" component="div">
            {dishName}
            </Typography>
            <div> <Checkbox 
                  checked={dishes.votes}
                  onChange={() => handleVotes(id)}
                  onClick={()=>checkCount(id)}
                  disabled={disable}
            
            /></div>
            </div>
         
          <Typography variant="body2" >
            {description }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

        </>

    )
}

export default DishCard;