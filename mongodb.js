// CRUD operations
const mongodb =  require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database');
    }
    console.log("Connected!");
    const db = client.db(databseName);    
});