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
  try{
    const _campus = await Campus.findByPk(req.params.id);
    await _campus.update(req.body);
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
  try{
    const _student = await Student.findByPk(req.params.id);
    await _student.update(req.body);
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

module.exports = app;

const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;
const faker = require('faker');
const db = new Sequelize(process.env.HEROKU_POSTGRESQL_CRIMSON_URL || 'postgres://localhost/campus_students_db');

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
    type: DECIMAL(10,1),
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
  
  const gpaGenerator = () => {
    return Math.floor(Math.random() * (4 * 10)) / (1*10);
  }
  
  const campusIdGenerator = () => {
    return Math.floor(Math.random() * (100)+1);
  }
  const campusEnding = () => {
    const random = Math.floor(Math.random() * 5);
    const arr = ['School', 'University', 'College', 'Academy', 'Center'];
    return arr[random];
  }
  const emailEnding = () => {
    const random = Math.floor(Math.random() * 5);
    const arr = ['gmail', 'hotmail', 'yahoo', 'blah', 'me'];
    return arr[random];
  }
//change to more data later
  const campuses = Array(100).fill().map((campus) => {
    return {
      name: faker.random.words() + ' ' + campusEnding(), 
      imageUrl: faker.image.nature(), 
      address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state() + ' (' + faker.address.zipCode() + ')', 
      description: faker.lorem.paragraph($nb=8)
    }
  })
  //capitalizes first letter of each word in campus name
  campuses.forEach(campus => {
    campus.name = campus.name.split(' ').map(word => {
      return word[0].toUpperCase() + word.slice(1);
    } ).join(' ');
  });
  await Promise.all(campuses.map(campus => {
    Campus.create(campus);
  }))

  const students = Array(100).fill().map((student) => {
    return {
      firstName: faker.name.firstName(), 
      lastName: faker.name.lastName(),
      imageUrl: faker.image.people(),
      email: '',
      gpa: gpaGenerator(),
      campusId: String(campusIdGenerator()) 
    }
  });
  
  students.forEach(student => {
    student.email = `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@${emailEnding()}.com`;
  });
  
  await Promise.all(students.map(student => {
    Student.create(student);
  })); 

  const students2 = Array(30).fill().map((student) => {
    return {
      firstName: faker.name.firstName(), 
      lastName: faker.name.lastName(),
      email: '', 
      imageUrl: faker.random.image(),
      gpa: 0.0,
      campusId: null
    }
  });
  students2.forEach(student => {
    student.email = `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@${emailEnding()}.com`;
  });
  await Promise.all(students2.map(student => {
    Student.create(student);
  }))
};


init();