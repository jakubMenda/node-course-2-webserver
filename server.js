const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
    const log = `${new Date().toString()}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) console.log(error);
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Hello express!');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Thats bad!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
