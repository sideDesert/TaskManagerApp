const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res)=>{
    const user = new User(req.body);

    try{
        await user.save();
        res.send(user).status(201);
    } catch(e){
        res.status(400).send(e);
    }
});

router.get('/users', async (req,res)=>{
    try{
        const result = await User.find({});
        res.send(result);

    } catch(err){
        res.send(err).status(500);
        console.log(err);
    }
});
router.get('/users/:id', (req,res)=>{
    const _id = req.params.id;
    User.findById(_id)
    .then((result)=>{
        if(!result){
            return res.send().status(404);
        }
        res.send(result);
    })
    .catch((err)=>{
        res.send(err).status(500);
        console.log(err);
    });
});
//Update User
router.patch('/users/:id', async(req, res )=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'password', 'age','name'];
    const isValidOperation = updates.every((update)=>{
        allowedUpdates.includes(update);
    });
    if(!isValidOperation){
        return res.send({error: 'Invalid Update'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, });
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch(err){
        res.status(400).send(err);
    }
});
//Delete user
router.delete('/users/:id',async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send();
        }
        res.send(user);
    } catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;
