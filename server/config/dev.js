// Used for development mode only
//this file is based on the production file

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  // jwtExpire: process.env.JWT_EXPIRE,
  // host: process.env.HOST,
  // user: process.env.USER,
  // password: process.env.PASSWORD,

  database: process.env.DATABASE,

  //for nodemailer
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,

  //url for swagger
  backendUrl: process.env.BACKEND_URL,
};
