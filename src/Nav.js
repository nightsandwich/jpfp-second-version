import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import {Button, PaginationItem} from '@mui/material';

const Nav = () => {
    const history = useHistory();
    const [campuses, students] = useSelector(({campuses, students}) => [campuses, students]);
    
    return (
    <div style={{display: 'flex',  flexDirection: 'column' }}>
        <div style={{display: 'flex', justifyContent:'space-evenly', maxWidth:'50%'}}>
                <Button variant='contained' color='primary' onClick={()=>history.push('/')}>Home</Button>
                <Button variant='contained' color='success' onClick={()=>history.push('/campuses')}>Campuses ({campuses.length})</Button>
                <Button variant='contained' color='success'onClick={()=>history.push('/students')}>Students ({students.length})</Button>
        </div>
        <div style={{display: 'flex', marginTop: '1rem'}}> 
            <PaginationItem value='<' variant='outlined' shape='circular' color='primary' onClick={()=>history.goBack()} type='previous'/>
            <PaginationItem  value='>' variant='outlined' shape='circular' color='secondary' onClick={()=>history.goForward()} type='next'/>
        </div>
    </div>
    )
}

export default Nav;