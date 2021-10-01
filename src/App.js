import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCampuses, loadStudents } from './store';

import Nav from './Nav';
import Home from './Home';
// import Campuses from './Campuses';
import CampusesView from './CampusesView';
import Campus from './Campus';
import Students from './Students';
import Student from './Student';

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
            <Route component={Students} path='/students?page=:pg' /> 
            <Route component={Students} path='/students/' exact/>
            {/* <Route component={Campuses} path='/campuses?page=:pg' />                     */}
            <Route component={CampusesView} path='/campuses/' exact/> 
            <Switch>                                 
                <Route component={Campus} path='/campuses/:id' exact/>
                <Route component={Student} path='/students/:id' exact/>
            </Switch>
        </Router>
    );
    else return (
        <h1>Loading...</h1>
    )
}

export default App;
