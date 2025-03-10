require('dotenv').config();
require('express-async-errors');

const helmet= require('helmet') ;
const cors = require('cors') ;
const xss = require('xss-clean') ;
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const studentsRouter = require('./routes/students');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust procy',1) ;


app.use(rateLimiter({
  windows: 15 * 60* 100 , //15 mins
  max:100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/students', authenticateUser, studentsRouter);
app.use(express.static("public"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3200;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
