const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        console.log(user);
        res.send(user).status(201);
    }).catch((err)=>{
        res.send(err).status(400);
        console.log(err);
    });

});
app.post('/tasks', (req,res)=>{
        const task = new Task(req.body);
        task.save()
        .then(()=>{
            console.log(task);
            res.send(task).status(201);
        })
        .catch((err)=>{
            res.send(err).status(400);
        });
});

app.get('/users', (req,res)=>{
    User.find({})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err).status(500);
        console.log(err);
    });
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