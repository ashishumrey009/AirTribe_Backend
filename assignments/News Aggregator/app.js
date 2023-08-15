// index.js
const express = require('express');
const newsRoutes = require('./routes/newsRoutes'); 
const mongoose = require('mongoose')
const routes = express.Router();

const bodyParser = require('body-parser')
const {signin}= require('./controllers/authController')
const {signup}= require('./controllers/authController')
require("dotenv")
  .config();
const port = 3000;
const app = express();
app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
routes.use(bodyParser.json())

try {
  mongoose.connect("mongodb://localhost:27017/usersdb",
  {
    useUnifiedTopology:true,
    useNewUrlParser:true
  })
  console.log("connected to mongodb")
} catch (error) {
  console.log(error)
}
routes.post('/register',signup);
routes.post('/signin', signin);
routes.use('/news', newsRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
