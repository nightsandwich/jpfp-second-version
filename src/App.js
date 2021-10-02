import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCampuses, loadStudents } from './store';

import Nav from './Nav';
import Home from './Home';
import CampusesView from './CampusesView';
import Campus from './Campus';
import StudentsView from './StudentsView';
import Student from './Student';
import Footer from './Footer';

const App = () => {
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try{
            Promise.all([
                dispatch(loadCampuses()),
                dispatch(loadStudents())
            ]);
            setLoading(true);
        }catch(ex){
            console.log(ex);
        }
    }, []);

    if (loading) return (

        <Router>        
            <Route component={Nav} path='/' />
            <Route component={Home} path='/' exact/>
            <Route component={CampusesView} path='/campuses/' exact/> 
            <Route component={Campus} path='/campuses/:id'/>
            <Route component={StudentsView} path='/students/' exact/>
            <Route component={Student} path='/students/:id'/>
            <Route component={Footer} path='/' />
        </Router>
    );
    else return (
        <h1>Loading...</h1>
    )
}

export default App;
