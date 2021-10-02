import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Container, Toolbar, Typography } from "@mui/material"

const Footer = () => {
    return (
        // <h5 >Made by Corinne at <Link to='http://wwww.fullstack.com'>Fullstack Academy</Link></h5>
        <AppBar position="static" variant='outlined' >
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" fontSize={12}>
               Made by Corinne at <Link to='http://wwww.fullstack.com'>Fullstack Academy</Link>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Footer;