import React, {Component} from "react";
import { connect } from "react-redux";
import AddStudent from './AddStudent';
import StudentList from "./StudentList";
import {loadStudents} from './store';

class Students extends Component {
    componentDidMount(){
        this.props.loadStudents();
    }
    render() {
        const {students} = this.props;
        return (
        <div>
            <h1> Students</h1>
            <div className='addContainer'>
                <StudentList students={students}/>
                <div>
                    <AddStudent />
                </div>
            </div>
        </div>
        );

    }
}

const mapDispatch = dispatch => {
    return {
        loadStudents: () => dispatch(loadStudents())
    }
}


export default connect(({students, campuses})=>({students, campuses}), mapDispatch)(Students);

