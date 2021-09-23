const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex =  require('knex');

const Signin = require('./Controllers/signIn.js');
const Register = require('./Controllers/register.js');
const Image = require('./Controllers/image.js');
const Profile = require('./Controllers/profile.js');

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'rishi',
        database : 'postgres'
    }
});

app.get('/', (req, res) => { res.send('Success') }  )
app.post('/signin', (req, res) => { Signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { Register.handleRegister(req, res, db, bcrypt) } )
app.get('/profile/:id', (req, res) => { Profile.handleProfileGet(req, res, db) } )
app.put('/image', (req, res) => {Image.handleImage(req, res, db) } )
app.post('/imageUrl', (req, res) => {Image.handleApiCall(req, res) } )

app.listen(3000, () => {
    console.log('app is running on port 3000');
})