import React, { Component } from 'react';
import {Switch, HashRouter as Router, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import { loadCampuses, loadStudents } from './store';

import Nav from './Nav';
import Campuses from './Campuses';
import Campus from './Campus';
import Students from './Students';
import Student from './Student';

export class _App extends Component {
    componentDidMount(){
        this.props.loadCampuses();
        this.props.loadStudents();
    }

    render() {
        return (
    
            <Router>
                    <Route component={Nav} path='/' />
                    
                        <Route component={Campuses} path='/campuses' exact/>                    
                        <Route component={Students} path='/students' exact/>
                        <Route component={Campus} path='/campuses/:id' />
                        <Route component={Student} path='/students/:id' />
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
