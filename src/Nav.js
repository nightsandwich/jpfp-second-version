import React from "react";
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Nav = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [campuses, students] = useSelector(({campuses, students}) => [campuses, students]);
    
    return (
    <div id='nav'>
        <Button id='basic-button' aria-controls='basic-menu' aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
            Dashboard
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        <NavLink style={{textDecoration: 'none', color: 'dodgerBlue'}} className='none' to='/'> <MenuItem onClick={handleClose}>Home</MenuItem> </NavLink>
        <NavLink style={{textDecoration: 'none', color: 'dodgerBlue'}} to='/campuses'><MenuItem onClick={handleClose}>Campuses ({campuses.length}) </MenuItem></NavLink>
        <NavLink style={{textDecoration: 'none', color: 'dodgerBlue'}} to='/students'> <MenuItem onClick={handleClose}>Students ({students.length}) </MenuItem></NavLink>
        </Menu>
        {/* <Button id='basic-button' aria-controls='basic-menu' aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
            Add Data
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        <NavLink style={{textDecoration: 'none', color: 'dodgerBlue'}} to='/campuses/add'><MenuItem onClick={handleClose}>Add Campus </MenuItem></NavLink>
        <NavLink style={{textDecoration: 'none', color: 'dodgerBlue'}} to='/students'> <MenuItem onClick={handleClose}>Add Student </MenuItem></NavLink>
        </Menu> */}
    </div>
    )
}

export default Nav;