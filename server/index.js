const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://zfpsoepnirdjev:efdb1ef78e26c935000c4eb68b9b46650efa6fe49546c7757a482d60d2fff576@ec2-34-227-120-94.compute-1.amazonaws.com:5432/d50ift7h6te4tg',
  ssl: {
    rejectUnauthorized: false
  }
});

const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port, ()=> console.log(`listening on port ${port}`));
