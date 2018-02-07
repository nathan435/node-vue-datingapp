const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('./passport');
const parseAuthToken = require('./parseAuthToken');


const applyMiddleware = (app) => {
    // Cross Origin Ressource CORS
    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // passport for auth
    app.use(passport.initialize());
    app.use(parseAuthToken);
  
    return app;
}

module.exports = applyMiddleware;