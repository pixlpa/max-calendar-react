const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const uuid = require('uuid/v4');

const EVENTS_FILEPATH = join(__dirname, '..', 'events-data.json');

const fetchEvents = async () => {
    try {
        const notesString = await readFile(EVENTS_FILEPATH);
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveEvents = async (notes) => {
    await writeFile(EVENTS_FILEPATH, JSON.stringify(notes, null, 2));
};

// combine the date and time inputs into one date string
const makeTime = (event)=>{
    const timestring = `${event.date}T${event.time}`;
    return timestring;
};

// expects an object input based on the html form
const addEvent = async (args) => {
    let events = await fetchEvents();
    // create the event object
    const ev = {
        'id': uuid(),
        'time': new Date(makeTime(args)).getTime(),
        'title': args.title,
        'action': args.action
    };
    events.push(ev);
    await saveEvents(events);
    return ev;
};

const removeEvent = async (id) =>{
    // read events file
    // array filter using the id attribute
    // delete
    // save
};

const getToday = async () => {
    const today = Date.now();
    const events = await fetchEvents();
    return events.filter((note) => note.time >= today && note.time < (today + (24 * 60 * 60 * 1000)));
};

const getNext = async () => {
    const today = Date.now();
    let events = await fetchEvents();
    return events.filter((note) => note.time >= today);
};

const getAll = () => {
    return fetchEvents();
};

const clearPrevious = async () => {
    const events = await fetchEvents();
    const now = Date.now();
    const future = events.filter((event)=> event.time >= now);
    await saveEvents(future);
};

module.exports = {
    addEvent,
    removeEvent,
    getToday,
    getNext,
    getAll,
    clearPrevious
};
