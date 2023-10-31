const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const customersRouter = require('./routes/api/customers');

// load config
const configPath = path.join(__dirname, '..', 'config', '.env');
dotenv.config({ path: configPath });

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

//Middlewares
app.use(logger(formatsLogger)); // logger - разобраться что делает
//enable CORS
app.use(cors());
//parse incoming JSON data from HTTP request
app.use(express.json());

//Routes
app.use('/api/customers', customersRouter);

//Middlewares error?
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;