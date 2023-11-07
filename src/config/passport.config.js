import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import userModel from '../dao/models/user.model.js';
import config from './config.js';

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    'register',
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        if (username === config.adminEmail && password === config.adminPassword) {
          const user = {
            name: 'Coder House',
            email: username,
            rol: 'Admin',
            _id: 'Admin',
          };
          return done(null, user);
        }
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (err) {
          //return done(err);
        }
      }
    )
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.62d564f261133d94',
        clientSecret: '486585253a04d3f98536371e284ce8c5bed35953',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
        scope: ['user:email'],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await userModel.findOne({ email: email });

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: '',
              email: email,
              age: 18,
              password: '',
              rol: 'User',
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            //ya existe el usuario
            done(null, user);
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    if (id != 'Admin') {
      const user = await userModel.findById(id);
      done(null, user);
    } else {
      const user = {
        name: 'Coder House',
        email: 'adminCoder@coder.com',
        rol: 'Admin',
        _id: 'Admin',
      };
      done(null, user);
    }
  });
};

export default initializePassport;
