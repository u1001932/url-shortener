'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const dns = require('dns')
const URL = require('url-parse')
const parser = require('body-parser');

var cors = require('cors');

var app = express();
var urllist = [];

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));
app.use(parser.urlencoded({extended: false})); //handle POST
app.use(parser.json())

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.post('/api/shorturl/new', function(req, res){
  var url = new URL(req.body.url)
  dns.lookup(url.hostname + url.pathname, function(err, address, family){
    if(err) {
      res.json({"error": "invalid URL"})
    } 
    else{
        res.json({"original_url": url.hostname + url.pathname, "short_url": urllist.push(url.hostname + url.pathname) - 1});
    }
  
  })

})

app.get('/api/shorturl/:index', function(req, res){
  res.redirect('https://'+ urllist[parseInt(req.params.index)])
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});