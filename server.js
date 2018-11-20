const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const Max = require('max-api');

//all of the event storage and retrieval happens in the "events" module
const events = require('./services/events');
let agenda = null;
let timeouts = [];

const scheduleEvent = (event) => {
    const timer = event.time - Date.now();
    //console.log("ms",timer);
    return setTimeout((action)=> Max.outlet("scheduledevent",action),timer,event.action);
};

const setAgenda = ()=>{
    agenda = events.getToday();
    //first clear the old timers
    for (let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }

    //clear the timeouts array
    timeouts = [];
    //create new timeouts
    for (let j = 0; j < agenda.length; j++){
        timeouts.push(scheduleEvent(agenda[j]));
    }
};

//set up the timeouts once at launch and schedule an update in an hour just in case
setAgenda();
setInterval(setAgenda, 60*60*1000);

//Express Setup***
//serve the static page from the public subfolder
app.use(express.static(__dirname+'/client/build/'));
const port = process.env.PORT || 5000;

//set up form parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handler for the event form input
app.post('/addevent', function(req, res) {
    const data = req.body;
    const packed = events.addEvent(data);
    setAgenda();
    const response = events.getAll();
    res.send({ express: response});
});

app.get('/express_backend', (req, res) => {
    const data = events.getAll();
    res.send({ express: data });
  });

app.listen(port);

//Max Setup****
//set up the Max message inputs for node.script
Max.addHandlers({
    add: (event) =>{
        const added = events.addEvent(event);
        setAgenda(); //update the upcoming timeouts just in case
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