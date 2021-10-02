import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Home = () => {
    const [campuses, students] = useSelector(({campuses, students}) => [campuses, students]);

    return (
        <Box
        display="flex" 
        flexDirection='column'
        maxWidth='md'
        bgcolor="gold"
      >
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          Important
        </Box>
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          Database
        </Box>
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          Of
        </Box>
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          {campuses.length} Schools
        </Box>
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          And
        </Box>
        <Box m="auto" style={{fontFamily: 'Arial', fontSize: '3rem'}}>
          {students.length} Students
        </Box>
      </Box>
       
    )
}

export default Home;