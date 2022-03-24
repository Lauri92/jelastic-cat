'use strict';
import express from 'express';
import catRoute from './routes/catRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import passport from './utils/pass.js';
import session from 'express-session';
import cors from 'cors';
import db from './utils/db.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3000;
/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}));
*/
app.use(passport.initialize({}));
//app.use(passport.session({}));

/*
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({message: 'Please login'});
  }
};
 */

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
//app.use('/cat', loggedIn, catRoute);
//app.use('/user', loggedIn, userRoute);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));

db.on('connected', () => {
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });
});

