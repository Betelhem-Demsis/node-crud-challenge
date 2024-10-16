const express = require('express');
const persons = require('./db/db');
const AppError = require('./utils/AppError');
const dotenv = require('dotenv');
const globalErrorHandler = require('./controllers/errorController');
const personRoute = require('./routes/personRoute');
const cors = require('cors');

dotenv.config({ path: "./.env" });

const app = express();


app.use(express.json());
app.use(cors());


app.set('db', persons);


app.use('/person', personRoute);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err.name, err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection:', err);
    server.close(() => {
        process.exit(1);
    });
});


module.exports = app;
