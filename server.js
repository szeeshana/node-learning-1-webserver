const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;    
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    let now = new Date().toString();
    console.log(`${now} ${req.method} ${req.url}`);
    let logs = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', logs+ '\n', (err)=>{
        if(err) {
            console.log(err);
        }
    });
    next();
});
/*  */
// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });
/*  */
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
app.get('/', (req, response)=> {
    response.render('home.hbs', {
        pageTitle: 'Home Page Here',
        welcomeMessage: 'Welcome To Website'
    });
    // response.send({
    //     name: 'Zeeshan',
    //     age: '205'
    // });
});
app.get('/about', (req, response)=>{
    // response.send('<h1>About Page Here</h1>');
    response.render('about.hbs',{
        pageTitle: 'About Page Yolo'
    });
});
app.get('/bad', (req, response)=>{
    response.send('<h1>Sorry ! Bad req !</h1>');
});
app.listen(port , ()=>{
    console.log(`server is UP ${port}`);
});