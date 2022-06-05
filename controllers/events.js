const { response } = require('express');
const Event = require('../models/Event-model');

const getEvents = async( req, res) => {

    const events = await Event.find()
                              .populate('user','name');

    res.json({
        ok:true,
        msg: events
    })
}

const createEvent = async ( req, res) => {

    const event = new Event(req.body)

    try{
        event.user = req.uid;
        const savedEvent = await event.save();
        res.json({
            ok: true,
            event: savedEvent
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}

const updateEvent = async( req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{
        const event = await Event.findById(eventId);
        if( !event ){
            res.status(404).json({
                ok: false,
                msg: "The event with that id does not exits"
            });
        }
        
        if( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permissions to edit this event'
            })
        }
        const newEvent = {
            ...req.body,
            user : uid
        }
       
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        res.json({
            ok:true,
            event: updatedEvent
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate with administrator"
        })
    }


    res.json({
        ok:true,
        eventId
    })
}

const deleteEvent = async( req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{
        const event = await Event.findById(eventId);
        if( !event ){
            res.status(404).json({
                ok: false,
                msg: "The event with that id does not exits"
            });
        }
        
        if( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permissions to delete this event'
            })
        }
        
       
        await Event.findByIdAndDelete(eventId);
        
        res.json({
            ok:true,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Comunicate with administrator"
        })
    }


    res.json({
        ok:true,
        eventId
    })
}

module.exports ={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}