const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')


const app = express();

// app.use(logger); //init middleware

// body parser (middleware) for post
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// set a static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));