const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res)=>{
    const user = new User(req.body);

    try{
        await user.save();
        res.send(user).status(201);
    } catch(e){
        res.status(400).send(e);
    }
});
app.post('/tasks', async (req,res)=>{
        const task = new Task(req.body);
        try{
            await task.save();
            res.send(task).status(201);
        } catch(e){
            res.send(err).status(400);
        }
});
//Find all users
app.get('/users', async (req,res)=>{
    try{
        const result = await User.find({});
        res.send(result);

    } catch(err){
        res.send(err).status(500);
        console.log(err);
    }
});
app.get('/users/:id', (req,res)=>{
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

app.get('/tasks', (req,res)=>{
    Task.find({})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err).status(500);
        console.log(err);
    });
});
app.get('/tasks/:id', (req,res)=>{
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

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});

//Update User
app.patch('/users/:id', async(req, res )=>{
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

//Update Task
app.patch('/tasks/:id', async(req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch(err){
        res.status(400).send(err);
    }
});

//Delete user
app.delete('/users/:id',async (req, res)=>{
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
app.delete('/tasks/:id',async (req, res)=>{
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