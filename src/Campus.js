import React from "react";
import { connect } from "react-redux";

const Campus = ({campus, students}) => {
    
    return (
    <>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} alt={`Photo of ${campus.name}`}/>
        <h3>{campus.address}</h3>
        <p>{campus.description}</p>
        <div>
            <h1>{students.length} Students</h1>
        </div>
    </>
    );
}
const mapState = (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {};
    const students = state.students.filter(student => student.campusId === campus.id) || [];
    return {campus, students};
}
export default connect(mapState)(Campus);