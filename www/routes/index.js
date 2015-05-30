var express = require('express');
var router = express.Router();
var config = require('../config');
var SerialPort = require("SerialPort").SerialPort;
var crypto = require('crypto');

/**
 * AuthCheck
 *
 * @param req
 * @param res
 * @param next
 */
var authCheck = function (req, res, next) {
  if (!config.security.requireAuth) {
    // Authentication is turned off
    next();
  }
  else {
    // Check if our IP is in the allowed IPs
    if (config.security.allowedIPs.indexOf(req.ip) != -1) {
      next();
    }
    // Check if our session is authenticated
    else if (req.session.isAuthed) {
      next();
    }
    // Not authenticated. Redirect to login
    else {
     res.redirect('/login');
    }
  }
}


//Create a connection to our serial port
var sp = new SerialPort(config.serialPort.port, {
	baudrate: config.baud
});

/* GET home page. */
router.get('/', authCheck, function(req, res, next) {
  res.render('index');
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

/* GET Login */
router.get('/login', function (req, res, next) {
  // Check if security.requireAuth is turned off
  if (!config.security.requireAuth) {
    res.redirect('/');
  }
  else {
    if (req.session.isAuthed) {
      // We're already authenticated, redirect back to home
      res.redirect('/');
    }
    else {
      res.render('login');
    }
  }
});

/* POST login */
router.post('/login', function (req, res) {
  // Generate hash from required password
  var password = req.body.password || '';
  console.log(req.body);
  var hash = crypto.createHash('sha256').update(password).digest('hex');
  console.log("p: %s\nh:%s\nc:%s", password, hash, config.security.password);
  if (config.security.password == hash) {
    req.session.isAuthed = true;
    res.redirect('/');
  }
  else {
    res.render('login', {error: 'Incorrect password'});
  }
});


/* GET logout */
router.get('/logout', function (req, res){
  req.session.isAuthed = false;
  res.redirect('/');
});

module.exports = router;
