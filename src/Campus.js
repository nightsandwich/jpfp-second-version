import React from "react";
import { connect } from "react-redux";

const Campus = ({campus, students}) => {
    
    return (
    <>
        <div>{campus.name}</div>
        <img src={campus.imageUrl} alt={`Photo of ${campus.name}`}/>
        <p>{campus.description}</p>
        <p>Address: {campus.address}</p>
        
    </>
    );
}
const mapState = (state, otherProps) => {
    const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id * 1) || {};
    const students = state.students.filter(student => student.campusId === campus.id) || [];
    return {campus, students};
}
export default connect(mapState)(Campus);