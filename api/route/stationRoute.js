const express = require('express');
const router = express.Router();

const Station  = require('../models/stationModel');

/*
router.route('/business').get(function(req,res) {
    let business = new Business(req.body);
    business.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json({nobusinessfound: 'No businesses found'}));
});
*/

router.route('/').get(function (req, res) {
    // eslint-disable-next-line array-callback-return
    Station.find(function(err, stations){
    if(err){
      console.log(err);
    }
    else {
      res.json(stations);
    }
  });
});

router.route('/add').post(function (req, res) {
    let station = new Station(req.body);
    console.log(station);
    station.save()
      .then(station => {
        res.status(200).json({'station': 'Station was added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });
  

router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Station.findById(id, function (err, station){
        res.json(station);
    });
  });
  
router.route('/update/:id').post(function (req, res) {
      Station.findById(req.params.id, function(err, station) {
      if (!station)
        res.status(404).send("data is not found");
      else {
          station.name = req.body.name;
          station.city = req.body.city ;
          station.fueltypes = req.body.fueltypes;
  
          station.save().then(station => {
            res.json('Update complete');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });

  router.route('/delete/:id').get(function (req, res) {
      Station.findByIdAndRemove({_id: req.params.id}, function(err, station){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
  });
  
module.exports = router;