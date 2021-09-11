import React, { Component } from 'react';
import {Switch, HashRouter as Router, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import { loadCampuses, loadStudents } from './store';
import Nav from './Nav';
import Campuses from './Campuses';
import AddCampus from './AddCampus';
import Students from './Students';

export class _App extends Component {
    componentDidMount(){
        this.props.loadCampuses();
        this.props.loadStudents();
    }

    render() {
        return (
    
            <Router>
                    <Route component={Nav} path='/' />
                    <div>
                        <Route component={Campuses} path='/campuses' />
                        <Route component={AddCampus} path='/campuses' />
                    </div>
                    <Route component={Students} path='/students' />
            </Router>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        loadCampuses: () => dispatch(loadCampuses()),
        loadStudents: () => dispatch(loadStudents())
    }
}

const App = connect(state=>state, mapDispatch)(_App);

export default App;
