const express =require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
// const {createRequireFromPath}=require ("module")


router.get('/',(req,res)=>{
    db.events.findAll().then(events=>{
        res.json(events)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

router.post("/",(req,res)=>{
    db.events.create({
       event_name:req.body.event_name,
       event_location:req.body.event_location,
       time:req.body.time,
       meeting_spot:req.body.meeting_spot,
       event_category:req.body.event_category,
       num_of_attendees:req.body.num_of_attendees 
    }).then(newEvent => {
        res.json(newEvent);
    }).catch(err=>{
        console.log(err);
        res.status(500).end();
    })
})



router.get('/readsessions',(req,res)=>{
    res.json(req.session);
})


router.put("/update/:id", function (req, res) {

    db.events.update(
        {
            event_name:req.body.event_name,
            event_location:req.body.event_location,
            time:req.body.time,
            meeting_spot:req.body.meeting_spot,
            event_category:req.body.event_category,
            num_of_attendees:req.body.num_of_attendees 
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(function (dbEvents) {
        res.json(dbEvents);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

router.delete("/delete/:id", function (req, res) {
    db.events.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbEvents) {
        res.json(`deleted event: ${req.params.id}. Create a new event to have some fun!`);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});



module.exports = router 
