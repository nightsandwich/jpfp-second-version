import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddCampus from "./AddCampus";
import { deleteCampus, loadCampuses } from "./store";

class Campuses extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: 'normal',
            filter: 'all'
        }
        this.chooseSort = this.chooseSort.bind(this);
        this.chooseFilter = this.chooseFilter.bind(this);
    }
    
    async componentDidMount(){
        try{
            this.props.loadCampuses();
        }
        catch (ex){
            console.log(ex);
        }
    }
    chooseSort(ev){
        this.setState({view: ev.target.value});
    }
    chooseFilter(ev){
        this.setState({filter: ev.target.value});
    } 
    render(){
        const {campuses, destroy} = this.props;
        const {view, filter} = this.state;
        const {chooseSort, chooseFilter} = this;
        
        const sortedByName = [...campuses].sort((a,b) => (a.name > b.name) ? 1 : -1); 
        const sortedByStudents = [...campuses].sort((a,b) => (a.students.length < b.students.length) ? 1 : (a.students.length === b.students.length) ? ((a.name > b.name) ? 1: -1) : -1);
        const campusesToRender = view === 'normal' ? sortedByName : sortedByStudents;
        
        return (
        <div>
            <h1>Campuses</h1>
            <div>
                Sort by:
                <select name='view' value={view} onChange={chooseSort}>
                    <option value={'normal'}>Name</option>
                    <option value={'students'}>Number of Students</option>
                </select>
            </div>
            <div>
                Filter by: 
                <select name='filter' value={filter} onChange={chooseFilter}>
                    <option value={'all'}>Show All</option>
                    <option value={'students'}>Campuses With Students</option>
                    <option value={'none'}>Campuses Without Students</option>
                </select>
            </div>
            <div className='addContainer'>
                <ul>
                    {
                        campusesToRender.filter(campus => {
                            return filter === 'all' ? 
                            campus : 
                            filter === 'students' ?
                            campus.students.length :
                            !campus.students.length
                        })
                        .map(campus => {
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
