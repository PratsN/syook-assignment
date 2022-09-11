import "./Landing.css"
import Header from "./Header";
import { Box } from "@mui/system"

const Landing = () => {
//display page of website
    return (
        <>
          <Header hasHiddenAuthButtons={true}></Header>
          <Box className="content">
            <div className="landing-text">
            <p className="hero-heading">
               Welcome to Dish-Poll....
               <br/>
               Please Login to Vote !
             </p>

            </div>
        
          </Box>
            
          
        </>
    )   
}


export default Landing;
