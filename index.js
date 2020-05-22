// For Routing, we are using Express
let express = require('express');
let todoController = require('./controllers/todoController');

// Firing Express
let app = express();

// Setting the FrontEnd to EJS
app.set('view engine', 'ejs');

// Setting up the Middleware for Images, CSS, Etc
app.use(express.static('./public'));

// Fire Controllers
todoController(app);

// Port to listen to
app.listen(3000);
console.log("Port 3000 is now active");