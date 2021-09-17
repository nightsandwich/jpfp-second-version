import {createStore, combineReducers, applyMiddleware} from 'redux';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT_SCHOOL = 'DELETE_STUDENT_SCHOOL';

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
    if(action.type === UPDATE_CAMPUS){
        state = state.map(campus => campus.id === action.campus.id ? action.campus : campus)
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
    if(action.type === UPDATE_STUDENT){
        state = state.map(student => student.id === action.student.id ? action.student : student)
    }
    if(action.type === DELETE_STUDENT_SCHOOL){
        state = state.map(student => student.id === action.student.id ? action.student : student)
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
const addCampus = (campus, history) => {
    return async (dispatch) => {
        const added = (await axios.post('/api/campuses', campus)).data;
        dispatch(_addCampus(added));
        
        //not necessary?
        //history.push('/campuses');
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

const _deleteCampus = (id) => (
    {type: DELETE_CAMPUS, id}
)
const deleteCampus = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/campuses/${id}`);
        dispatch(_deleteCampus(id * 1));
        
    }
}

const _deleteStudent = (id) => (
    {type: DELETE_STUDENT, id}
)
const deleteStudent = (id, history) => {
    return async (dispatch) => {
        await axios.delete(`/api/students/${id}`);
        dispatch(_deleteStudent(id * 1));
        //history.push('/students');
    }
}

const _updateCampus = (campus) => (
    {type: UPDATE_CAMPUS, campus}
)
const updateCampus = (campus, history) => {
    return async (dispatch) => {
        const updated = (await axios.put(`/api/campuses/${campus.id}`, campus)).data;
        dispatch(_updateCampus(updated));
//        history.push('/campuses');
    }
}

const _updateStudent = (student) => (
    {type: UPDATE_STUDENT, student}
)
const updateStudent = (student, history) => {
    return async (dispatch) => {
        const updated = (await axios.put(`/api/students/${student.id}`, student)).data;
        dispatch(_updateStudent(updated));
//        history.push('/students');
    }
}

const _deleteStudentSchool = (student) => (
    {type: DELETE_STUDENT_SCHOOL, student}
)
const deleteStudentSchool = (student) => {
    return async (dispatch) => {
        const updated = (await axios.put(`/api/students/${student.id}`, {campusId: null})).data;
        dispatch(_deleteStudentSchool(updated));
    }
}

export default store;
export {loadCampuses, loadStudents, addCampus, addStudent, deleteCampus, deleteStudent, updateCampus, updateStudent, deleteStudentSchool };