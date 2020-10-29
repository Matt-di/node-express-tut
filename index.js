var express = require('express');
var app = express();

var handlebars = require('express3-handlebars')
    .create({dafaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 8081);

var fortunes = [ "MAteos","DIngeta","Amante"];
// app.get is the method by which we're adding a routing

// express default status code is 200 thats why we dont specifying it
app.get('/',function(req,res){
    // when we use the render method we dont need  to specify status and type
    // it returns status 200 and type text/html
    res.render('home')
    // res.type('text/html');
    // res.send('<h1>Mat Express Site</h1>');
});

app.get('/about',function(req,res){
    // res.type('text/html');
    // res.send('<h1>About page</h1>');
    var randomFur=fortunes[Math.floor(Math.random()*fortunes.length)];

    res.render('about',{fortune:randomFur});
});


// app.use is the method by which Express adds middleware 
//custom 404 page
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404- Not Found');

});

app.use(function(err,req,res,next){
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.use(express.static(__dirname+'/public'));


app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate');

});