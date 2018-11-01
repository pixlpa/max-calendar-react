const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var app = express();

const events = require('./services/events');
const Max = require('max-api');

app.use(express.static(__dirname+'/public'));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addevent', function(req, res) {
    const data = req.body;
    const packed = events.addEvent(data);
    res.send(packed);
});
app.listen(port);

Max.addHandlers({
    add: (event) =>{
        const added = events.addEvent(event);
    },
    today: ()=>{
        const todo = {'data': events.getToday()};
        Max.outlet("todo",todo);
    },
    next: ()=>{
        Max.outlet('next',{'data': events.getNext()});
    },
    all: ()=>{
        Max.outlet('all',{'data': events.getAll()});
    }
});