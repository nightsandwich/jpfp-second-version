import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddCampus from "./AddCampus";
import { deleteCampus } from "./store";

const Campuses = ({campuses, destroy}) => {

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
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> ({campus.students.length} Students)
                            <button onClick={()=>destroy(campus.id)}>X</button>
                        </li>
                    );
                })
            }
        </ul>
        </div>
    </div>

    );
}
const mapDispatch = (dispatch) => {
    return {
        destroy: (id) => dispatch(deleteCampus(id))
    }
}
export default connect(state=>state, mapDispatch)(Campuses);
