const fs = require('fs');
const Max = require('max-api');

var fetchEvents = () => {
    try{
        var notesString = fs.readFileSync('./events-data.json');
        return JSON.parse(notesString);
    } catch (e){
        return [];
    }
};

var saveEvents = (notes) => {
    fs.writeFileSync('./events-data.json',JSON.stringify(notes));
};

//combine the date and time inputs into one date string
var makeTime = (event)=>{
    const timestring = `${event.date}T${event.time}`;
    return timestring;
}

//expects an object input based on the html form
const addEvent = (args) => {
    let events = fetchEvents();
    //create the event object
    const ev = {
        'time': new Date(makeTime(args)).getTime(),
        'title': args.title,
        'action': args.action
    };
    events.push(ev);
    saveEvents(events);
    return ev;
};

const removeEvent = (title) =>{
    //read events file
    //array filter using the title attribute
    //delete
    //save
};

const getToday = () => {
    const today = Date.now();
    let events = fetchEvents();
    var matchedEvents = events.filter((note) => note.time >= today && note.time < (today+(24*60*60*1000)));
    return matchedEvents;
}

const getNext = () => {
    const today = Date.now();
    let events = fetchEvents();
    let matchedEvents = events.filter((note) => note.time >= today);
    return matchedEvents;
}

const getAll = () => {
    return fetchEvents();
}

const clearPrevious = () => {
    let events = fetchEvents();
    const future = events.filter((event)=> event.time >= now);
    saveEvents(future);
}

module.exports={
    addEvent,
    removeEvent,
    getToday,
    getNext,
    getAll,
    clearPrevious
}