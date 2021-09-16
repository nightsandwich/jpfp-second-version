import React from "react";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'

const Nav = ({campuses, students}) => {

    return (
    <>
        <NavLink to='/campuses'> Campuses ({campuses.length}) </NavLink>
        <NavLink to='/students'> Students ({students.length}) </NavLink>
    </>
    )
}

export default connect(state=>state)(Nav);