const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//BodyParser Middleare here..
app.use(bodyParser.json());
app.use(cors());

//DB config..
const db = require('./config/keys').mongoURI;

//Connecting to Mongo..
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('MongoDb connected..');
    }).catch(err => {
        console.log(err);
    });

// Routes.. 
const posts = require('./routes/api/posts');

app.use('/api/posts', posts);
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server started on port ${port}`));