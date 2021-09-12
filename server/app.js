//TODO: change decimal precision


const express = require('express')
const path = require('path')

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
          model: Student
        }
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
          model: Student
        }
      ]
    }));
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
          model: Campus
        }
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
  try{
    const _campus = await Campus.findByPk(req.params.id, {
      include: [
        {
          model: Student
        }
      ]
    });
    await _campus.update(req.body);
    const campus = (await Campus.findByPk(_campus.id, {
      include: [
        {
          model: Student
        }
      ]
    }));
    res.send(campus);
  }
  catch(ex){
    next(ex);
  }
})

app.put('/api/students/:id', async(req, res, next) => {
  try{
    const student = (await Student.findByPk(req.params.id));
    res.send(await student.update(req.body));
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

module.exports = app;

const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;
const faker = 'faker';
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/campus_students_db');

const Campus = db.define('campus', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    allowNull: true
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT
  }
});

const Student = db.define('student', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: STRING,
    allowNull: true
  },
  gpa: {
    type: DECIMAL(),
    validate: {
      min: 0,
      max: 4
    }
  }
});

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  
  const bebopU = await Campus.create({ name: 'Bebop University' , imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: '55 Bebop Avenue, Somewhere, NY 0000', description: 'What an amazing school. We do stuff. Lots of stuff.'});
  const spagTech = await Campus.create({ name: 'Spaghetti Tech', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: '56 Meatball Way, Saucetown, ID', description: 'sdfsdfsdfsdfdsfdsfsdfsdfdsf'});
  const coolSchool = await Campus.create({ name: 'Cool School', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: 'address', description: 'lkdjflksdjf' });
  const badSchool = await Campus.create({ name: 'Bad School', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: 'address', description: 'lkdjflksdjf' });
  const funzone = await Campus.create({ name: 'Funzone', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: 'address', description: 'lkdjflksdjf' });
  const pizzahut = await Campus.create({ name: 'Pizza Hut', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: 'address', description: 'lkdjflksdjf' });
  const fullstack = await Campus.create({ name: 'Fullstack Academy', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png', address: 'address', description: 'lkdjflksdjf' });

  await Promise.all([
    await Student.create({firstName: 'A', lastName: 'AA', email: 'AAA@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 3.4, campusId: bebopU.id}),
    await Student.create({firstName: 'B', lastName: 'BB', email: 'BBB@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 2.4, campusId: spagTech.id}),
    await Student.create({firstName: 'C', lastName: 'CC', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 1.4, campusId: coolSchool.id}),
    await Student.create({firstName: 'D', lastName: 'DD', email: 'DDD@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 0.4}),
    await Student.create({firstName: 'E', lastName: 'EE', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 1.4, campusId: badSchool.id}),
    await Student.create({firstName: 'F', lastName: 'FF', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png', gpa: 1.4, campusId: funzone.id}),
    await Student.create({firstName: 'G', lastName: 'GG', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2013/07/18/10/59/human-skeleton-163715_960_720.jpg', gpa: 1.4, campusId: pizzahut.id}),
    await Student.create({firstName: 'H', lastName: 'HH', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2013/07/18/10/59/human-skeleton-163715_960_720.jpg', gpa: 1.4, campusId: fullstack.id}),
    await Student.create({firstName: 'I', lastName: 'HH', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2013/07/18/10/59/human-skeleton-163715_960_720.jpg', gpa: 1.4, campusId: fullstack.id}),
    await Student.create({firstName: 'J', lastName: 'HH', email: 'CCC@gmail.com', imageUrl: 'https://cdn.pixabay.com/photo/2013/07/18/10/59/human-skeleton-163715_960_720.jpg', gpa: 1.4, campusId: spagTech.id}),
  ]);

};


init();