const { response } = require('express');

const getEvents = ( req, res) => {

    res.json({
        ok:true,
        msg: 'getEvents'
    })
}

const createEvent = ( req, res) => {

    //Verificar que tenga el evento
    console.log(req.body)

    res.json({
        ok:true,
        msg: 'createEvent'
    })
}

const updateEvent = ( req, res) => {

    res.json({
        ok:true,
        msg: 'updateEvent'
    })
}

const deleteEvent = ( req, res) => {

    res.json({
        ok:true,
        msg: 'deleteEvent'
    })
}

module.exports ={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}