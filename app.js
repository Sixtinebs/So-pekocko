const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

const userRoute = require('./routes/user');
const sauceRoute = require('./routes/sauce');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS'
}
app.use(cors(corsOptions));

//connect to API
mongoose.connect('mongodb+srv://sopekocko:sopekocko@cluster0.swkyz.mongodb.net/So-Pekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//My routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoute );
app.use('/api/auth', userRoute );


//app.listen(process.env.PORT || 3000)
module.exports = app;