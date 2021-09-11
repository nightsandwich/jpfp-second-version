import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'

const Nav = ({campuses, students}) => {

    return (
    <>
        <Link to='/campuses'> Campuses ({campuses.length}) </Link>
        <Link to='/students'> Students ({students.length}) </Link>
    </>
    )
}

export default connect(state=>state)(Nav);