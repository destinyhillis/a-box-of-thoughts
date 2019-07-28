const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('./db/db');

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(express.static(path.join(__dirname, "client", "build")))

const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: process.env.APPLICATION_ID,
  secret: process.env.UNSPLASH_SECRET
});
const whitelist = [process.env.REACT_ADDRESS, process.env.REACT_APP_BACKEND_ADDRESS, 
  process.env.MONGODB_URI, "https://api.unsplash.com/search/photos", 
  "https://a-box-of-thoughts.herokuapp.com", "https://a-box-of-thoughts.herokuapp.com/boards"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(session({
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
}))

app.use(morgan('short'));
app.use(bodyParser.json());

const userController = require('./controllers/UserController');
const boardController = require('./controllers/BoardController'); 
app.use('/users', userController);
app.use('/boards', boardController);


app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});




const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log("back-end server working")
})