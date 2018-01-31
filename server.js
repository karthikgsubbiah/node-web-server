const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.use((req, res , next) => {
  var now = new Date();
  var log = `${req.method} ${req.url}`;
  var message = now + " " + log;
  fs.appendFile('server.log',message + '\n', (err) => {
    if(err){
      console.log(err);
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to our site!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send('Bad request');
});

app.listen(port, () => {
  console.log(`Server is up on port 3000`);
});
