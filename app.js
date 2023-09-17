var express = require('express');
require("dotenv").config();
require("./middleware/database").connect();

var app = module.exports = express();

const cors = require("cors");
app.use(cors());
 
const mainApi = require('./router/mainApi')
const { API_PORT } = process.env;
const port = API_PORT;

const bodyParser = require('body-parser');
//app.use(express.methodOverride());
// Let's make our express `Router` first.
var router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
}))
router.use(bodyParser.json())
router.get('/error', function(req, res, next) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(new Error("This is an error and it should be logged to the console"));
});

router.use('/api', mainApi)
router.use(cors());

// Now we can tell the app to use our routing code:
app.use(router);


// Optionally you can include your custom error handler after the logging.

app.listen(port, function(){
  console.log("logger listening on port %d in %s mode", this.address().port, app.settings.env);
});