import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import {Button, PaginationItem, AppBar, Container, Toolbar} from '@mui/material';

const Nav = () => {
    const history = useHistory();
    const [campuses, students] = useSelector(({campuses, students}) => [campuses, students]);
    
    return (
        <AppBar position="static" style={{backgroundColor: 'linen', marginBottom: '1rem'}} >
          <Container maxWidth="md">
            <Toolbar>
                <PaginationItem style={{backgroundColor: 'dodgerblue'}} value='<'  shape='circular' onClick={()=>history.goBack()} type='previous'/>
                <PaginationItem style={{backgroundColor: 'dodgerblue'}} value='>'  shape='circular' onClick={()=>history.goForward()} type='next'/>"  "
                <Button variant='outlined' color='success' onClick={()=>history.push('/')}>Home</Button>"  "
                <Button variant='contained' color='success' onClick={()=>history.push('/campuses')}>Schools ({campuses.length})</Button>"  "
                <Button variant='contained' color='success'onClick={()=>history.push('/students')}>Students ({students.length})</Button>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Nav;