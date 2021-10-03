const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;
const faker = require('faker');
const hipsum = require('lorem-hipsum');

const db = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/campus_students_db');

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
  
//--------------------------------------//
  const numCampuses = 30;
  const numStudentsWithSchool = 40;
  const numStudentsWithoutSchool = 10;
  const gpaHigh = 4;
  const gpaDecimals = 10;
  const descriptionSentences = 5;
  const descriptionVariation = 3;
//--------------------------------------//

  const gpaGenerator = () => {
    return Math.floor(Math.random() * (gpaHigh * gpaDecimals) + 1) / (gpaDecimals);
  }
  const campusIdGenerator = () => {
    return Math.floor(Math.random() * (numCampuses)+1);
  }
  const campusEnding = () => {
    const arr = ['School', 'University', 'College', 'Academy', 'Center'];
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }
  const emailEnding = () => {
    const arr = ['gmail', 'hotmail', 'yahoo', 'blah', 'me'];
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }
  const description = () => {
    const random = Math.floor(Math.random() *  (descriptionSentences - descriptionVariation) + descriptionVariation);
    let retStr = 'OUR MISSION: ';
    for (let i = 1; i <= random; i++){
      retStr += `${faker.company.catchPhrase()}! `;
    }
    retStr += ' WE GUARANTEE IT.'
    return retStr;
  }

  const campuses = Array(numCampuses).fill().map((campus) => {
    return {
      name: `${faker.random.words()} ${campusEnding()}`, 
      imageUrl: faker.image.nature(), 
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} (${faker.address.zipCode()})`, 
      description: description()
    }
  })

  //capitalizes first letter of each word in campus name
  campuses.forEach(campus => {
    campus.name = campus.name.split(' ').map(word => {
      return word[0].toUpperCase() + word.slice(1);
    } ).join(' ');
  });
  campuses.forEach(campus => {
    campus.name = campus.name.split('-').map(word => {
      return word[0].toUpperCase() + word.slice(1);
    } ).join(' ');
  });
  await Promise.all(campuses.map(campus => {
    Campus.create(campus);
  }))

  const students = Array(numStudentsWithSchool).fill().map((student) => {
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

  const students2 = Array(numStudentsWithoutSchool).fill().map((_) => {
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

module.exports = {
    syncAndSeed,
    models: {
        Student,
        Campus
    }
}