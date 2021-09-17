import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import {loadStudents, deleteStudent} from './store';

class Students extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: 'normal'
        }
        this.chooseSort = this.chooseSort.bind(this);
    }
    async componentDidMount(){
        try{
            this.props.loadStudents();
        }
        catch(ex){
            console.log(ex)
        }
    }
    chooseSort(ev){
        this.setState({view: ev.target.value});
    }
    
    render() {
        const {students, destroy} = this.props;
        const {view} = this.state;
        const {chooseSort} = this;
        const sortedByFirst = [...students].sort((a,b) => (a.firstName > b.firstName) ? 1 : -1); 
        const sortedByLast = [...students].sort((a,b) => (a.lastName > b.lastName) ? 1 : -1);
        const sortedByGpa = [...students].sort((a,b) => (a.gpa * 1 < b.gpa * 1) ? 1 : (a.gpa * 1 === b.gpa * 1) ? ((a.firstName > b.firstName) ? 1: -1) : -1);

        const studentsToRender = view === 'normal' ? sortedByFirst : view === 'last' ? sortedByLast : sortedByGpa;
        
        return (
        <div>
            <h1> Students</h1>
            <div>
                Sort by:
            <select name='view' value={view} onChange={chooseSort}>
                <option value={'normal'}>First Name</option>
                <option value={'last'}>Last Name</option>
                <option value={'gpa'}>Highest GPA</option>
            </select>
                
            </div>
            <div className='addContainer'>
                <ul>
                    {
                        studentsToRender.map(student => {
                            return (
                                <li key={student.id}>
                                    <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                    <button onClick={()=>destroy(student.id)}>X</button>
                                    <br/> 
                                    {student.campus ? ` (attending ${student.campus.name}) ` : ' (doing own thing) '}
                                    GPA: {student.campus ?  student.gpa : ' N/A '} 
                                </li>
                            );
                        })
                    }
                </ul>
                <div>
                    <AddStudent />
                </div>
            </div>
        </div>
        );

    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        loadStudents: () => dispatch(loadStudents()),
        destroy: (id) => dispatch(deleteStudent(id, history))
    }
}


export default connect(({students, campuses})=>({students, campuses}), mapDispatch)(Students);

