# Junior Phase Final Project

## Getting started

1. Fork and clone this repo.
2. `npm install`.
3. `npm run start:dev`
## Details

### The Premise

You are the CTO of a company which manages Campuses and Enrollments. Create a RESTful web platform that allows you to manage your students and campuses. Before getting started, please carefully review the expectations as outlined below.

### The tools

For this project, you must use Express to handle HTTP requests and Sequelize to interface with your database. Likewise, you must use React, Redux and React-Redux on the front-end. This means that all important state (i.e. students and campuses) must be managed by the Redux store (unimportant state, like form data, may be managed by stateful React components). Components that display student/campus data should therefore be connected to the Redux store. 

- other client side libraries you will need
- redux
- react-redux
- react-router-dom
- redux-thunk
- axios

### Requirements + Rubric (see rubric file)

## Requirements

- the application needs to be deployed
- the application needs to load without errors (blank screens are not acceptable)
- do not copy and paste previous code!
- you will have ample time to complete project, NO EXTENSIONS WILL BE GIVEN
- build incrementally! 
- if you have an error, fix the error, before attempting to **add** functionality


### Views and Functionality

You can determine views and functionality from the requirements and wireframes shown below.

<img src='https://github.com/FullstackAcademy/jpfp-template-a-flex/blob/main/wireframes.png' />



#### Seed

- [Y] Write a sync function which sync's and seeds your database when your application starts 

### Tier 1: All Campuses and Students (20/61)

- [Y] Display the campuses component when the url matches `/campuses`
- [Y] Display the students component when the url matches `/students`
- [Y] Add a links to the navbar that can be used to navigate to the campuses view and the students view

#### Backend Requirements

- Write a `campuses` model with the following information:
  - [Y] name - not empty or null
  - [Y] imageUrl - string can be null 
  - [Y] address - not empty or null
  - [Y] description - extremely large text
- Write a `students` model with the following information:
  - [Y] firstName - not empty or null
  - [Y] lastName - not empty or null
  - [Y] email - not empty or null; must be a valid email
  - [Y] imageUrl - string can be null 
  - [Y] gpa - decimal between 0.0 and 4.0
- [Y] Students may be associated with at most one campus. Likewise, campuses may be associated with many students


### Tier 2: Single Student and Single Campus (12/61)


- Write a component to display a single campus with the following information:
  - [Y] The campus's name, image, address and description
  - [Y] A list of the names of all students in that campus (or a helpful message if it doesn't have any students)
- [Y] Display the appropriate campus's info when the url matches `/campuses/:campusId`
- [Y] Clicking on a campus from the campuses view should navigate to show that campus

- Write a component to display a single student with the following information:
  - [Y] The student's full name, email, image, and gpa
  - [Y] The name of their campus (or a helpful message if they don't have one)
- [Y] Display the appropriate student when the url matches `/students/:studentId`
- [Y] Clicking on a student from the students view should navigate to show that student

- [Y] Clicking on the name of a student in the campus view should navigate to show that student in the student view
- [Y] Clicking on the name of a campus in the student view should navigate to show that campus in the campus view


### Tier 3: Adding a Campus and Adding a Student (10/61)


#### Frontend

- [Y] Write a component to display a form for adding a new campus that contains inputs for _at least_ the name and address.
- [Y] Display this component as part of the campuses view, alongside the list of campuses
- Submitting the form with a valid name/address should:

  - [Y] Make an AJAX request that causes the new campus to be persisted in the database
  - [Y] Add the new campus to the list of campuses without needing to refresh the page

- [Y] Write a component to display a form for adding a new student that contains inputs for _at least_ first name, last name and email
- [Y] Display this component as part of the students view, alongside the list of students
- Submitting the form with a valid first name/last name/email should:
  - [Y] Make an AJAX request that causes the new student to be persisted in the database
  - [Y] Add the new student to the list of students without needing to refresh the page



### Tier 4: Removing a Campus and Removing a Student (8/61)


#### Frontend

- [Y] In the campuses view, include an `X` button next to each campus
- Clicking the `X` button should:

  - [Y] Make an AJAX request that causes that campus to be removed from database
  - [Y] Remove the campus from the list of campuses without needing to refresh the page

- [Y] In the students view, include an `X` button next to each student
- Clicking the `X` button should:
  - [Y] Make an AJAX request that causes that student to be removed from database
  - [Y] Remove the student from the list of students without needing to refresh the page


### Tier 5: Updating a Campus and Updating a Student (11/61)


#### Frontend

- [Y] Write a component to display a form updating _at least_ a campus's name and address
- [Y] Display this component as part of the campus view
- Submitting the form with valid data should:
  - [Y] Make an AJAX request that causes that campus to be updated in the database
  - [Y] Update the campus in the current view without needing to refresh the page
- [Y] In the campus view, display an `Unregister` button next to each of its students, which removes the student from the campus (in the database as well as this view); hint: the student is still in the database but is no longer associated with the campus

- [Y] Write a component to display a form updating a student
- [Y] Display this component as part of the student view
- Submitting the form with valid data should:
  - [Y] Make an AJAX request that causes that student to be updated in the database
  - [Y] Update the student in the current view without needing to refresh the page



### Bonus Tier: Finishing Touches (23 EC)



#### Finishing Touches

- [Y] If a user attempts to add a new student or campus without a required field, a helpful message should be displayed
- [ ] If a user attempts to access a page that doesn't exist (ex. `/potato`), a helpful "not found" message should be displayed
- [ ] If a user attempts to view a student/campus that doesn't exist, a helpful message should be displayed
- [ ] Whenever a component needs to wait for data to load from the server, a "loading" message should be displayed until the data is available
- [ ] Overall, the app is spectacularly styled and visually stunning

#### Ordering

- [Y] Create option for students to be ordered based on lastName on all-students view
- [Y] Create option for students to be ordered based on GPA on all-students view
- [Y] Create option for campuses to be ordered based on number of enrolled students on all-campuses view

#### Filtering

- [Y] Create a filter on all-students view to only show students who are not registered to a campus
- [Y] Create a filter on the all-campuses view to only show campuses that do not have any registered students

#### Seeding & Pagination

- [Y] Seed 100+ students and 100+ campuses
- [Y] Implement _front-end_ pagination for the students view (e.g. `/students?page=1` renders the first ten students, and `/students?page=2` renders students 11-20)
- [Y] Implement _front-end_ pagination for the campuses view (e.g. `/campuses?page=1` renders the first ten campuses, and `/campuses?page=2` renders campuses 11-20)
- [ ] Implement _back-end_ pagination for students (e.g. `/api/students?page=1` returns the first ten students' data, and `/api/students?page=2` returns students 11-20)
- [ ] Implement _back-end_ pagination for campuses (e.g. `/api/campuses?page=1` returns the first ten campuses' data, and `/api/campuses?page=2` returns campuses 11-20)


* `RUBRIC.md` - contains the grading rubric for additional factors, as well as the formula for calculating the total score


## Evaluation

- Requirements score (70%)
- Rubric score (30%)
- Extra credit (15% max)
