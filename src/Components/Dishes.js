import React , {useState , useEffect} from "react";
import Header from "./Header"
import { Box } from "@mui/system"
import {Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DishCard from "./DishCard"
import { Grid} from "@mui/material";
import { useSnackbar } from "notistack";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Dishes.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Dishes =() => {

  //get the API data

    const API_URL = `https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json`



    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [data , setData] = useState([])
    const [disable, setDisable] = useState(false);
    const [rating, setRating] = useState([]);
    const [limit, setLimit] = useState(3);
    const [unique , setUnique] = useState([])
    const [reset , setReset] = useState([])
    const [table , setTable] = useState(data)

    //fetch the data from API endpoints for further use

    const fetchData = async () => {
        try {
            let response = await axios.get(API_URL)
            //console.log(response.data)
            setData(response.data.map((item) => Object.assign(item, { votes: false })));
            setTable(response.data.map((item) => Object.assign(item, { value: Math.floor(Math.random()*10)*30})))
           

            return response.data
        }
        catch(error) {
            console.log(error)
        }
        
    }
    console.log("table" , table)
    console.log(data)

    //to render the data
    useEffect(() => {
        fetchData()
      },[])

      //create a new object to store the input choosen by user

    const handleVotes = (id) =>{
        const dishIndex = data.findIndex((item) =>  {return item.id === id})

        if (dishIndex !== -1) {
            data[dishIndex].votes = !data[dishIndex].votes;
          }

        const newVote = {
            id: data[dishIndex].id,
            title : data[dishIndex].dishName,
            ranking :30
        
          };

          setRating((newItem) => {
            return [...newItem, newVote];
          });

          setData(data)

    }

    console.log("rating" , rating)

    //checkbox button logic to disable the card after 3 valid choices

    const checkCount =(id) =>{

        const dishIndex = data.findIndex((item) => {return item.id === id });

          

          if (dishIndex !== -1) {
          data[dishIndex].votes ? setLimit(limit + 1) : setLimit(limit - 1);
          }

          if (limit === 1) {
            setDisable(true)
          }

          
    }

    console.log(limit)

    //submit the users response

    const handleSubmit= () => {

      const values = [...new Set(rating.map(item => item))].slice(-3)

      setUnique(values)
      
     
      if (unique.length < 3){
        enqueueSnackbar("Hurray ! Your votes has been submitted Successfully !", { variant: "success" })
    
      }
     

    }

//change votes logic
    const changeVote = () => {

      setDisable(false)
      setRating([...reset])
      setLimit(3)
      setUnique([...reset])

      const arraycopy = data.map((item) => {
        if (item.votes === true) {
          item.votes = !item.votes;
        }
        return item;
      });
    }

  
    const result = table.sort((a, b) => {
    return (b.value - a.value);
});


console.log("result",result.slice(0,10))

console.log("unique" , unique)




    return (
        <>
        <Header hasHiddenAuthButtons={true}/>




    <Tabs>
    <TabList>
     
      <Tab>Polling</Tab>
      <Tab>Results</Tab>
    </TabList>
   

    <TabPanel>

      <Box className="submit-change-btn">

      <Stack >
        Want to Explore more ? Click here !
      
      <button className="dishes-button" onClick={() => navigate("/products")}>Home</button>
        </Stack>

        <Stack >
        To submit your choices , Click here ! 
        <button className="dishes-button" onClick={handleSubmit}>Submit</button>
      
        
        </Stack>

        <Stack >
        Change your mind , Click here !
      
      <button className="dishes-button" onClick={changeVote}>Change</button>
        </Stack>

       

   

      </Box>

      
    <Box 
                sx={{
                  width: { xs: '90%', md: '90%' },
                  margin: "auto",
                  padding: "2"
             
                }}
              >  
              <div className="cast-vote ">You can Cast maximum 3 votes and to see the Results Please goto Result section</div>

             
                <Grid container spacing={2}>

          { data.map((item) => {
            return (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <DishCard dishes={item} handleVotes={handleVotes} checkCount={checkCount} disable={disable}
                 ></DishCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>

    </TabPanel>


    <TabPanel>
   

     
      {rating.length === 0 ? (
        <div className="cast-vote"> You haven't cast any votes yet...
          Please vote for your favourite Dish in Polling section</div>
      ) : (
        <div className="table">

    

          
<div className="alignment-table">
<div>
  
            
<Stack className="result-table">
            See what You vote</Stack>

    <TableContainer className="table">
      <Table style={{ width: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dish</TableCell>
            <TableCell align="right">Points</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {unique.map((row, key) => (
            <TableRow
              key={row.id}
              
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>

              
            
                <TableCell align="right">{row.ranking - key * 10}</TableCell>          
              
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</div>

<div>
  
<Stack className="result-table">
            Polling Results</Stack>

          <TableContainer className="table">
      <Table style={{ width: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dish</TableCell>
            <TableCell align="right">Points</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dishName}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


</div>

</div>




        </div>    
      )}
    </TabPanel>
  </Tabs>

   
        </>
    )
}

export default Dishes;