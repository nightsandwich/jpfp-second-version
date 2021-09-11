import {createStore, combineReducers, applyMiddleware} from 'redux';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';

import axios from 'axios';
import thunk from 'redux-thunk';


const campusesReducer = (state = [], action) => {
    if(action.type === LOAD_CAMPUSES){
        state = action.campuses;
    }
    if(action.type === ADD_CAMPUS){
        state = [...state, action.campus]
    }
    if(action.type === DELETE_CAMPUS){
        state = state.filter(campus => campus.id !== action.id)
    }
    return state;
};

const studentsReducer = (state = [], action) => {
    if(action.type === LOAD_STUDENTS){
        state = action.students;
    }
    if(action.type === ADD_STUDENT){
        state = [...state, action.student]
    }
    if(action.type === DELETE_STUDENT){
        state = state.filter(student => student.id !== action.id)
    }
    return state;
};

//store's reducer
const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

//action creators and thunks
const _loadCampuses = (campuses) => (
    {type: LOAD_CAMPUSES, campuses}
)
const loadCampuses = () => {
    return async (dispatch) => {
        const campuses = (await axios.get('/api/campuses')).data;
        dispatch(_loadCampuses(campuses));
    }
}

const _loadStudents = (students) => (
    {type: LOAD_STUDENTS, students}
)
const loadStudents = () => {
    return async (dispatch) => {
        const students = (await axios.get('/api/students')).data;
        dispatch(_loadStudents(students));
    }
}

const _addCampus = (campus) => (
    {type: ADD_CAMPUS, campus}
)
const addCampus = (campus) => {
    return async (dispatch) => {
        const added = (await axios.post('/api/campuses', campus)).data;
        dispatch(_addCampus(added));
    }
}

const _addStudent = (student) => (
    {type: ADD_STUDENT, student}
)
const addStudent = (student) => {
    return async (dispatch) => {
        const added = (await axios.post('/api/students', student)).data;
        dispatch(_addStudent(added));
    }
}

const _deleteCampus = (campus) => (
    {type: DELETE_CAMPUS, campus}
)
const deleteCampus = (id) => {
    return async (dispatch) => {
        const deleted = (await axios.delete(`/api/campuses/${id}`)).data;
        dispatch(_deleteCampus(deleted));
    }
}

const _deleteStudent = (student) => (
    {type: DELETE_STUDENT, student}
)
const deleteStudent = (id) => {
    return async (dispatch) => {
        const deleted = (await axios.delete(`/api/students/${id}`)).data;
        dispatch(_deleteStudent(deleted));
    }
}
export default store;
export {loadCampuses, loadStudents, addCampus, addStudent, deleteCampus, deleteStudent};