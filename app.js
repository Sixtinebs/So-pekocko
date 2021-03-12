const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users');
const Sauces = require('./models/sauces');
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS'
}
app.use(cors(corsOptions));

//connect to API
mongoose.connect('mongodb+srv://sopekocko:sopekocko@cluster0.swkyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('api/auth/login', (req, res, next) => {
    console.log(req);
    Users.find()
        .then(users => res.status(200).json( users ))
        .catch(error => res.status(400).json({ error }))
})

app.post('/api/auth/signup', (req, res, next) => {
    delete req.body.userId;
    const user = new Users({
        ...req.body
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Inscription réussite ! '}))
        .catch(error => res.status(400).json({ error }));
});


//app.listen(process.env.PORT || 3000)
module.exports = app;