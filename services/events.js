const fs = require('fs');

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

var makeTime = (event)=>{
    const timestring = `${event.date}T${event.time}`;
    return timestring;
}

const addEvent = (args) => {
    //read in events file
    let events = fetchEvents();
    //create the event object
    const ev = {
        'time': new Date(makeTime(args)).getTime(),
        'title': args.title,
        'action': args.action
    };
    //push it to the array
    events.push(ev);
    //save out the event file
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
    const today = getToday();
    let nexttime = today.reduce((min, p) => p.time < min ? p.time : min, today[0].time);
    return today.filter((event)=> event.time == nexttime );
}

module.exports={
    addEvent,
    removeEvent,
    getToday,
    getNext
}