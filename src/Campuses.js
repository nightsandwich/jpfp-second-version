import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddCampus from "./AddCampus";
import { deleteCampus, loadCampuses } from "./store";

class Campuses extends Component {
    componentDidMount(){
        this.props.loadCampuses();
        //this.props.loadStudents();
    }

    render(){
        const {campuses, destroy} = this.props;
        return (
        <div>
            <h1>Campuses</h1>
            
            <div className='addContainer'>
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
                <div>
                    <AddCampus />
                </div>
            </div>
        </div>
    
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        destroy: (id) => dispatch(deleteCampus(id)),
        loadCampuses: () => dispatch(loadCampuses())
    }
}
export default connect(state=>state, mapDispatch)(Campuses);
