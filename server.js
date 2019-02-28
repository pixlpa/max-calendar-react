const express = require('express');
const bodyParser = require('body-parser');
const { internal: internalServerError, isBoom, notFound: notFoundError } = require('boom');
const Max = require('max-api');
const app = express();

// all of the event storage and retrieval happens in the "events" module
const events = require('./services/events');
let agenda = null;
let timeouts = [];
let patch_status = {
    'fps': '0.00',
    'amp': '0.00',
    'soundon': 'off',
    'preset': 'start'
};

const scheduleEvent = (event) => {
    const timer = event.time - Date.now();
    // console.log("ms",timer);
    return setTimeout((action)=> Max.outlet('scheduledevent', action), timer, event.action);
};

const setAgenda = async () => {
    await events.clearPrevious();
    agenda = await events.getToday();
    // first clear the old timers
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }

    // clear the timeouts array
    timeouts = [];
    // create new timeouts
    for (let j = 0; j < agenda.length; j++) {
        timeouts.push(scheduleEvent(agenda[j]));
    }
};

// set up the timeouts once at launch and schedule an update in an hour just in case
setAgenda();
setInterval(setAgenda, 60 * 60 * 1000);
setInterval(()=>{Max.outlet('report');}, 30 * 1000);

// Express Setup***
// serve the static page from the public subfolder
app.use(express.static(__dirname + '/build/'));
const port = process.env.PORT || 5000;

// set up form parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handler for the event form input
app.post('/addevent', async (req, res, next) => {
    try {
        const data = req.body;
        await events.addEvent(data);
        await setAgenda();
        const response = await events.getAll();
        return void res.send({ express: response });
    } catch (err) {
        next(err);
    }
});

// handler for the event form input
app.post('/delete', async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);
        await events.removeEvent(data);
        await setAgenda();
        const response = await events.getAll();
        return void res.send({ express: response });
    } catch (err) {
        next(err);
    }
});

app.get('/express_backend', async (req, res, next) => {
    try {
        const data = await events.getAll();
        return void res.send({ events: data, stats: patch_status });
    } catch (err) {
        next(err);
    }
});

// 404 - Not Found Handler
app.use((req, res, next) => {
    next(notFoundError());
});

// Error Handler
app.use((err, req, res, next) => {
    if (isBoom(err)) {
        return void res
            .status(err.output.statusCode)
            .json(err.output.payload);
    }

    // Unhandled internal errors
    const boomErr = internalServerError();
    return void res
        .status(boomErr.output.statusCode)
        .json(boomErr.output.payload);
});


app.listen(port);

// Max Setup****
// set up the Max message inputs for node.script
Max.addHandlers({
    add: async (event) =>{
        await events.addEvent(event);
        await setAgenda(); // update the upcoming timeouts just in case
    },
    today: async () => {
        const todo = {'data': await events.getToday() };
        Max.outlet('todo', todo);
    },
    next: async () => {
        await Max.outlet('next', { 'data': events.getNext() });
    },
    all: async () => {
        Max.outlet('all', { 'data': await events.getAll() });
    },
    patch_status: (stats) => {
        patch_status = Object.assign(patch_status, stats);
        patch_status.amp = stats.amp != undefined ? stats.amp.toFixed(2) : "0.00";
        patch_status.fps = stats.fps != undefined ? stats.fps.toFixed(2) : "0.00";
    }
});
