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

//Handle Production..
if (process.env.NODE_ENV === 'production') {
    //Static folder for production here..
    app.use(express.static(__dirname + '/public'));

    //Hanlde SPA..
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
// https://www.youtube.com/watch?v=X-JZ-QPApUs