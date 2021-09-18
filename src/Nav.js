import React from "react";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'

const Nav = ({campuses, students}) => {

    return (
    <div id='nav'>
        <NavLink className='none' to='/'> Home  </NavLink>
        <NavLink to='/campuses?page=1'> Campuses ({campuses.length}) </NavLink>
        <NavLink to='/students?page=1'> Students ({students.length}) </NavLink>
    </div>
    )
}

export default connect(state=>state)(Nav);