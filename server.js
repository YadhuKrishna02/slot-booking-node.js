import express from "express";
import morgan from "morgan";
import connectDB from './connection/connection.js';
import AppError from "./utils/AppError.js";
import configKeys from './config.js';
import errorHandlingMidlleware from './middlewares/errorHandlingMiddleware.js';
import authRouter from "./routes/authRoutes.js";
import deanRouter from "./routes/deanRoutes.js";
import studentRouter from "./routes/studentRoutes.js";

const app = express()

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRouter());
app.use('/api/student', studentRouter());
app.use('/api/dean', deanRouter());
app.use(errorHandlingMidlleware);

// Catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new AppError('Not found', 404));
});

app.listen(configKeys.PORT, () => {
    console.log(`Server listening on port ${configKeys.PORT}`);
});