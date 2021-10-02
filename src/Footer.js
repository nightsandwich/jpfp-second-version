import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Container, Toolbar, Typography } from "@mui/material"

const Footer = () => {
    return (
        <AppBar position="static" style={{backgroundColor: 'linen', marginTop: '1rem'}} >
          <Container maxWidth="md">
            <Toolbar>
              <Typography fontSize={17} color='black'>
               Made by Corinne at <Link to='http://wwww.fullstack.com'>Fullstack Academy</Link>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Footer;