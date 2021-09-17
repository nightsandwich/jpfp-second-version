import React from "react";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'

const Nav = ({campuses, students}) => {

    return (
    <div id='nav'>
        <NavLink to='/campuses?page=:1'> Campuses (Pagination) </NavLink>
        <NavLink to='/students?page=:1'> Students (Pagination)) </NavLink>
    </div>
    )
}

export default connect(state=>state)(Nav);