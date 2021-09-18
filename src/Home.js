import React from "react";
import { connect } from "react-redux";

const Home = ({campuses, students}) => {
    return (
    <div>
        <div className='home'>
            <h1>Important</h1>
            <h1>Database</h1>
            <h1>Of</h1>
            <h1>{campuses.length} Campuses</h1>
            <h1>And</h1>
            <h1>{students.length} Students</h1>
        </div>
    </div>
    )
}

export default connect(({campuses, students}) => ({campuses, students}))(Home);