const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.send(task).status(201);
    } catch(e){
        res.send(err).status(400);
    }
});
//Find all users


router.get('/tasks', (req,res)=>{
    Task.find({})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err).status(500);
        console.log(err);
    });
});
router.get('/tasks/:id', (req,res)=>{
    const _id = req.params.id;
    Task.findById(_id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err).status(500);
        console.log(err);
    });
});




//Update Task
router.patch('/tasks/:id', async(req, res)=>{
    const updates = Object.keys(req.body);
try{
    const user = await Task.findById(req.params.id);
    updates.forEach((update)=>{
        user[update] = req.body[update];
    });
    await user.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
    if(!user){
        return res.status(404).send();
    }
    res.send(user);
} catch(err){
    res.status(400).send(err);
}
});


router.delete('/tasks/:id',async (req, res)=>{
try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        res.status(404).send();
    }
    res.send(task);
} catch(err){
    res.status(500).send(err);
}
});

module.exports = router;