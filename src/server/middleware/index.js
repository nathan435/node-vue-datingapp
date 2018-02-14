const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('./passport');
const parseAuthToken = require('./parseAuthToken');


const applyMiddleware = (app) => {
    // Cross Origin Ressource CORS
    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
    app.use(bodyParser.json({ limit: '5mb' }));
    // passport for auth
    app.use(passport.initialize());
    app.use(parseAuthToken);
  
    return app;
}

module.exports = applyMiddleware;