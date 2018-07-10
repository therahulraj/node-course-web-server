const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials'); //this is setup
//this will take absolute path to files where handlebar partial files are being stored.
app.set('view engine', 'hbs');





//about rendering static web pages.
// ------------------------------------------------------------------------------------------------------------------------------------------------
//inorder to use a middleware    //for help.html
app.use(express.static(__dirname + '/public')); //takes the absolute path of the folder //you want to serve up

//if gonna sevrve /help we have to  we need to provide the path to the public folder.
//this means we need to provide the path from the root drive, which can be tricky because your project move around.
//luckily we have __dirname variable which gets passed into our file by that wrapper function we explored this variable
//stores the path to your projects directory.

//it takes a middleware function you wnat to use this a built-in.
// ------------------------------------------------------------------------------------------------------------------------------------------------


//1st middleware.
// ------------------------------------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {   //next exist so you can tell express that when your middleware function is done.
  //and this is usesful you can have as much a middleware as you like to register to a single app.
  //we use next to tell express when it is done.
  //so if we do something asynchronous the middleware is not going to move on only when we call next.
  //so if your middleware doesn't come next your handlers for each request fo each request they're
  //never going to fire
  //so if we don't use next(); then the request is not going to finish the problem is not that its
  //not going to finish but there is no next(); in the middleware we used.
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
   if(err) {
     console.log('there was an error appending file.');
   }
 });
  next();

})
// ------------------------------------------------------------------------------------------------------------------------------------------------






// ------------------------------------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.render('maintanance.hbs');
})
// ------------------------------------------------------------------------------------------------------------------------------------------------







// about handlebar helpers
// ------------------------------------------------------------------------------------------------------------------------------------------------
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (test) => {
  return test.toUpperCase();
})
// ------------------------------------------------------------------------------------------------------------------------------------------------






// ----------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {    //this let us to register a handler using this we setting this method to handle the http get request.
      //request stores a ton of information coming in about headers, body, the methods that are used
      //response has a bunch of methods set for you can use to send and costomise the data that you want to send it back.
      //res.send('hello express.');
      res.send({
        name: "rahul raj",
        surname: "raj"
      })
      //this is the response of the http request so someone if veiws our website they
      //are going to see this result and if they are making a request then they are going
      //get this back as body data.
});


app.get('/about', (req, res) => { ///this allows to set other routes other than root route
  res.send('<H1>ABOUT PAGE.</H1>');
})
// -------------------------------------------------------------------------------------------------------------------------------------------------------




//this is method used to render the handlebar templates.
// ------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/rendering', (req, res) => {
  res.render('rendering.hbs', {
    pageTitle: 'about page',
    currentYear: new Date().getFullYear()
  }); //is going to let you render any of the tempelates you have to setup
  //with your current veiw engine.
  //this is enought to render your current static page rendering.
})
// -------------------------------------------------------------------------------------------------------------------------------------------------------








app.listen(3000, () => {
  console.log('the server is up on: port 3000') //this is let you to do something as it takes little time to get started.
});
//this is going to bind the application to a port on our machine.
//the apps that use listen hangs as long it shut down manually its waiting for the request to come in.
//its going to listen to request until you tell to stop.
