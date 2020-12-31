import express, {Request,Response, NextFunction} from "express";
import  createHttpError from 'http-errors';
import  path from 'path';
import  cookieParser from 'cookie-parser';
import  logger from 'morgan';
import  mongoose from 'mongoose';

mongoose.Promise = global.Promise;

import handleConnectionToDB from './db/db';
import indexRouter from './routes/index';
import usersRouter from './routes/user';
import ordersRouter from './routes/order';
import productsRouter from './routes/product';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/order', ordersRouter);
app.use('/product', productsRouter);

// connect to db
handleConnectionToDB()
// const {Request, Response, Error} = express


app.use( (req, res, next) => {
  next(createHttpError(404));
});

// error handler
app.use( (err:Error, req:Request, res:Response, next:NextFunction)  => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
});

module.exports = app;
