var express = require('express');
var mongoose = require('mongoose');
var route = express.Router();

var drModel = require('../models/dr-model.js')


route.get('/',(req,res)=>{

  drModel.find({deleted: false},(err,result)=>{
    if (err) return err;

    res.render('allDr',{
      alldr : result
    });
  });
})

route.get('/deleted',(req,res)=>{

  drModel.find({deleted: true},(err,result)=>{
    if (err) return err;

    res.render('allDr',{
      alldr : result
    });
  });
})

route.get('/:id',(req,res)=>{
  drModel.findOne({"_id" : req.params.id}, (err,result)=>{
    if(err) return err;

    res.render('editDr',{
      _id : req.params.id,
      name : result.name,
      location : result.location,
      tlf: result.tlf,
      email: result.email,
      admin: result.admin,
      logs: result.logs,
      note: result.note,
      deleted: result.deleted,
      colorline: result.colorline
    });
  })
});

route.get('/delete/:id',(req,res)=>{
  drModel.findOneAndUpdate({'_id' : req.params.id},{deleted : true},(err, result)=>{
    if(err) return err;

    console.log(result, 'removed');

    res.redirect('/');
  });
})

//POST

route.post('/',(req,res)=>{
    var newDr = new drModel({
      name : req.body.name,
      location : req.body.location,
      tlf: req.body.tlf,
      email: req.body.email,
      admin: req.body.admin,
      logs: req.body.logs,
      note: req.body.note,
      deleted: false,
      colorline: "#ffffff"
    })

    newDr.save((err,result)=>{
      if(err) return err;

      console.log('Nueva autoescuela añadida', result);
      res.redirect('/');
    })
})

route.post('/:id',(req,res)=>{
  var query = { '_id': req.params.id };
  drModel.findOneAndUpdate(query,{
    name : req.body.name,
    location : req.body.location,
    tlf: req.body.tlf,
    email: req.body.email,
    admin: req.body.admin,
    logs: req.body.logs,
    note: req.body.note,
    deleted: req.body.deleted,
    colorline: req.body.colorline
  },(err,result)=>{
    if(err) return err;
    console.log('EDITED:', result)
    res.redirect('/');
  })
})



module.exports = route;
