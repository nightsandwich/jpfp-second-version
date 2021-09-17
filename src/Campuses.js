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

    componentDidMount(){
        this.props.loadCampuses();
    }
    
    chooseSort(ev){
        this.setState({...this.state, view: ev.target.value});
    }
    chooseFilter(ev){
        this.setState({...this.state, filter: ev.target.value});
    } 
    render(){
        const {campuses, destroy, start, end} = this.props;
        const {view, filter} = this.state;
        const {chooseSort, chooseFilter} = this;
        
        const sortedByName = [...campuses].sort((a,b) => (a.name > b.name) ? 1 : -1); 
        const sortedByStudents = [...campuses].sort((a,b) => (a.students.length < b.students.length) ? 1 : (a.students.length === b.students.length) ? ((a.name > b.name) ? 1: -1) : -1);
        const sortedByState = [...campuses].sort((a,b) => (a.address.split(', ').slice(2,3).join('').split(' (')[0] > b.address.split(', ').slice(2,3).join('').split(' (')[0]) ? 1 : -1);
        const campusesToRender = view === 'normal' ? sortedByName : view === 'students' ? sortedByStudents : sortedByState;
        
        const filteredCampuses = campusesToRender.filter(campus => {
            return filter === 'all' ? 
            campus : 
            filter === 'students' ?
            campus.students.length :
            !campus.students.length
        });
        const paginatedCampuses = filteredCampuses.filter((campus,idx) => idx + 1 >= start && idx + 1 <= end ? campus : '');
        
        return (
        <div>
            <h1>Campuses</h1>
            <div>
                Sort by:
                <select name='view' value={view} onChange={chooseSort} >
                    <option value={'normal'}>Name</option>
                    <option value={'students'}>Number of Students</option>
                    <option value={'states'}>State</option>
                </select>
            </div>
            <div>
                Filter by: 
                <select name='filter' value={filter} onChange={chooseFilter} disabled={start !== 1}>
                    <option value={'all'}>Show All</option>
                    <option value={'students'}>Campuses With Students</option>
                    <option value={'none'}>Campuses Without Students</option>
                </select>
            </div>
            <div className='addContainer'>
                <ul>
                    {
                        paginatedCampuses.map(campus => {
                            return (
                                <li key={campus.id}>
                                    <button onClick={()=>destroy(campus.id)}><small>DELETE</small></button><span> </span>
                                    <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                                    <small>  ({campus.address.split(', ').slice(2,3).join('').split(' (')[0]})</small>
                                    <div className='count'>
                                    {campus.students.length === 0 ? '--No students--' : campus.students.length === 1 ? '--1 student--' : `--${campus.students.length} students--`}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <div>
                    <AddCampus />
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className='pagnav'>
                Go to Campuses 
                {
                    filteredCampuses.map((campus, idx) => {
                        return (((idx + 1) % 10 === 1) ? 
                        <Link key={campus.id} to={`campuses?page=${(idx + 10) / 10}`}> {`<${idx + 1}>`} </Link>
                        : '');
                    })
                }
            </div>
        </div>
    
        );
    }
}
const mapState = (state, otherProps) => {
    const start = (10 * (otherProps.location.search.slice(6) - 1)) + 1;
    const end = start + 9;
    return {
        campuses: state.campuses,
        start: start,
        end: end,
    }
}

const mapDispatch = (dispatch) => {
    return {
        destroy: (id) => dispatch(deleteCampus(id)),
        loadCampuses: () => dispatch(loadCampuses())
    }
}
export default connect(mapState, mapDispatch)(Campuses);


