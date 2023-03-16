const express = require("express");
const userModel = require("../models/user");
const exerciseSchema = require("../models/exercise.js").exerciseSchema;
const exerciseModel = require("../models/exercise.js").exerciseModel;
const router = new express.Router();

router.post("/users", async (req, res) => {
  try {

    let requestedUserName = req.body.username;

    let existingUser = await userModel.findOne({
      username: requestedUserName
    });
    if (existingUser) {
      console.log('user Found!!');
      res.json(existingUser);
      return;
    }

    console.log('user not Found, creating new!');

    let newUser = new userModel({
      username: requestedUserName
    });
    let savedUser = await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.log('error', err);
    res.json(err);
  }
})

router.post("/users/:_id/exercises", async (req, res) => {
  try {

    let effectiveDate = req.body.date ? new Date(req.body.date) : new Date();

    let exercise = new exerciseModel({
      description: req.body.description,
      duration: parseInt(req.body.duration),
      date: effectiveDate.toDateString(),
      timestamp: effectiveDate.getTime()
    });

    let updatedUser = await userModel.findOneAndUpdate(
      {_id: req.params._id},
      { $push: { log: exercise } },
      { new: true });

    let response = {
      username: updatedUser.username,
      description: req.body.description,
      duration: parseInt(req.body.duration),
      date: effectiveDate.toDateString(),
      _id: updatedUser._id.valueOf()
    }

    console.log('response', response);
    res.json(response);

  } catch (err) {
    console.log('error', err);
    res.json(err);
  }
})

router.get("/users/:_id/logs", async (req, res) => {
  try {
    let requestedUserId = req.params._id;
    let {limit, from, to} = req.query;

    let queryFilter = { _id: requestedUserId};

    if(from || to){
      queryFilter['log.timestamp'] = {};
      if(from){
        queryFilter['log.timestamp']['$gte'] = new Date(from).getTime();
      }
      if(to){
        queryFilter['log.timestamp']['$lte'] = new Date(to).getTime();
      }
    }

    console.log('queryFilter', queryFilter);

    let limiter = {};
    if(limit){
      limit = parseInt(limit);
       limiter = {log : {$slice: [0,limit]}}
    }

    let existingUser = await userModel.find(
      queryFilter, limiter
    );

    //console.log('existingUser', existingUser);
    
    if (existingUser) {
      let response = {...existingUser[0]._doc};
      response.count = response.log.length;
      delete response.__v;
      console.log('response', response);
      res.json(response);
    } else {
      res.json({
        error: "user not found"
      })
    }
  } catch (err) {
    console.log('error', err);
    res.json(err);
  }
})

router.get("/users", async (req, res) => {
  try {
    let allUsers = await userModel.find({});
    res.json(allUsers);
  } catch (err) {
    console.log('error', err);
    res.json(err);
  }
})

module.exports = router;