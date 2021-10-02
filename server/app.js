const {syncAndSeed, models: {Student, Campus}} = require('./db');
const express = require('express');
const path = require('path');

const app = express()

app.use(express.json());
// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.get('/api/campuses', async(req, res, next) => {
  try{
    res.send(await Campus.findAll({
      include: [
        {
          model: Student,
          include: Campus
        }
      ],
      order: [
        ['id']
      ]
    }));
  }
  catch(ex){
    next(ex)
  }
});

app.get('/api/campuses/:id', async(req, res, next) => {
  try{
    res.send(await Campus.findByPk(req.params.id,{
      include: [
        {
          model: Student,
        }
      ]
    }));
  }
  catch(ex){
    next(ex)
  }
});

app.get('/api/campuses?page=:pg', async(req, res, next) => {
  try{
    const campuses = (await Campus.findAll({
      include: [
        {
          model: Student
        }
      ],
      order: [
        ['id']
      ]
    }));
    const start = (10 * (req.params.pg - 1)) + 1;
    const end = start + 9;
    res.send(campuses.filter(campus => {campus.id >= start && campus.id <= end}));
  }
  catch(ex){
    next(ex)
  }
  
});

app.get('/api/students', async(req, res, next) => {
  try{
    res.send(await Student.findAll({
      include: [
        {
          model: Campus,
          include: Student
        }
      ],
      order: [
        ['id']
      ]
    }));
  }
  catch(ex){
    next(ex)
  }
});

app.get('/api/students/:id', async(req, res, next) => {
  try{
    res.send(await Student.findByPk(req.params.id,{
      include: [
        {
          model: Campus
        }
      ]
    }));
  }
  catch(ex){
    next(ex)
  }
});

app.post('/api/campuses', async(req, res, next) => {
  try{
    const _campus = (await Campus.create(req.body));
    const campus = (await Campus.findByPk(_campus.id, {
      include: [
        {
          model: Student
        }
      ]
    }));
    res.status(201).send(campus);
  }
  catch(ex){
    next(ex);
  }
})

app.post('/api/students', async(req, res, next) => {
  try{
    const _student = (await Student.create(req.body));
    const student = (await Student.findByPk(_student.id, {
      include: [
        {
          model: Campus
        }
      ]
    }));
    res.status(201).send(student);
  }
  catch(ex){
    next(ex);
  }
})

app.delete('/api/campuses/:id', async(req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id, {
      include: [
        {
          model: Student
        }
      ]
    });
    await campus.destroy();
    res.sendStatus(201)
  }
  catch(ex){
    next(ex)
  }
});

app.delete('/api/students/:id', async(req, res, next) => {
  try{
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Campus
        }
      ]
    });
    await student.destroy();
    res.sendStatus(201)
  }
  catch(ex){
    next(ex)
  }
});

app.put('/api/campuses/:id', async(req, res, next) => {
  const { name, address, imageUrl, description} = req.body;
  try{
    const _campus = await Campus.findByPk(req.params.id);
    await _campus.update({name, address, imageUrl, description});
    const campus = await Campus.findByPk(req.params.id, {
      include: [
        {
          model: Student
        }
      ]
    });
    res.send(campus);
  }
  catch(ex){
    next(ex);
  }
})

app.put('/api/students/:id', async(req, res, next) => {
  const {firstName, lastName, email, imageUrl, gpa, campusId} = req.body;
  try{
    const _student = await Student.findByPk(req.params.id);
    await _student.update({firstName, lastName, email, imageUrl, gpa, campusId});
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Campus
        }
      ]
    });
    res.send(student);
  }
  catch(ex){
    next(ex);
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send({error: err.errors[0].message} || 'Internal server error.')
})

const init = async() => {
  try{
    await syncAndSeed();
  }
  catch(ex){
    console.log(ex);
  }
};

init();

module.exports = app;
