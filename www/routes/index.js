var express = require('express');
var router = express.Router();
var config = require('../config').serialPort;
var SerialPort = require("SerialPort").SerialPort;

// Create a connection to our serial port
var sp = new SerialPort(config.port, {
	baudrate: config.baud
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parcel Shelf [Control Panel]' });
});

/* POST home page */
router.post('/', function (req, res, next) {
  var text = req.body.text || '';

  sp.write(text, function (err,results) {
    if (err) {
      console.log('Err: ' + err);
    }
    
    sp.drain(function(){
      res.redirect('back');
    });
  });
});

module.exports = router;
