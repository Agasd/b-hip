const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Team = require('./models/Team');
const withAuth = require('./middleware');

const app = express();


/*
* In a real life scenario this would be an enviroment variable rather than being hardcoded
* */

const secret = 'tLp@:Pr<[}.#.4S!';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/bhip';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/allTeams', withAuth, function(req, res) {
  Team.find({},function (err,team) {
    res.status(200).send({
      content: team
    })
  });
});

app.post('/api/newTeam', withAuth, function(req, res) {
  const { name, partner } = req.body;
  const team = new Team({ name, partner });
  team.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Successful registration");
    }
  });
});
app.post('/api/oneTeam', withAuth, function(req, res) {
  const { id } = req.body;
  Team.findOne({ _id: id }, function (err, team) {
    if (err) {
      console.log(err);
      res.status(500).send("Error finding user please try again.");
    } else {
      res.status(200).send({content: team});
    }
  });
});
app.post('/api/delete', withAuth, function(req, res) {
  const { id } = req.body;
  console.log(req.body);
  console.log("id: "+id);
  Team.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting user please try again.");
    } else {
      res.status(200).send("Successful registration");
    }
  });
});
app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Successful registration");
    }
  });
});

app.get('/api/logout', function(req, res) {
  res.clearCookie("token").redirect('/').sendStatus(200);
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
