import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddCampus from "./AddCampus";

const Campuses = ({campuses}) => {
    console.log(campuses);
    return (
    <div>
        <div>
        <h1>Campuses</h1>
        <div>
            <AddCampus />
        </div>
        <ul>
            {
                campuses.map(campus => {
                    return (
                        <li key={campus.id}>
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> ({campus.students.length} Students Currently Enrolled)
                        </li>
                    );
                })
            }
        </ul>
        </div>
    </div>

    );
}

export default connect(state=>state)(Campuses);