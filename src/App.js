import React, { useEffect } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCampuses, loadStudents } from './store';

import Nav from './Nav';
import Campuses from './Campuses';
import Campus from './Campus';
import Students from './Students';
import Student from './Student';
import UpdateStudent from './UpdateStudent';
import UpdateCampus from './UpdateCampus';
import Home from './Home';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCampuses());
        dispatch(loadStudents());
    }, [])

    return (

        <Router>        
            <Route component={Nav} path='/' />
            <Route component={Home} path='/' exact/>
            <Route component={Students} path='/students?page=:pg' /> 
            <Route component={Students} path='/students/' exact/>
            <Route component={Campuses} path='/campuses?page=:pg' />                    
            <Route component={Campuses} path='/campuses/' exact/>                    
        
            <div className='updatecontainer'>
                <Route component={Campus} path='/campuses/:id' exact/>
                <Route component={UpdateCampus} path='/campuses/:id' exact/>
                <Route component={Student} path='/students/:id' exact/>
                <Route component={UpdateStudent} path='/students/:id' exact/>
            </div>
        </Router>
    );
}

export default App;
