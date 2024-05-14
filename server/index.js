import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import TodoModel from './mongodb/models/todo.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 5000;

// app.get('/',async(req,res)=>{
//     res.status(200).json({
//         message: 'Welcome To Task Manager 3 from Anshul',
//     });
// });

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
})

app.put('/update/:id',(req,res)=> {
    const {id} = req.params;
    // console.log("This is my id that I want to edit.. -> ",id);
    TodoModel.findByIdAndUpdate({_id: id},{done: true})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
})

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
})

app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then((data)=> res.json(data))
    .catch((err)=> res.json(err));
})

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`Server is running on Port ${PORT}`);
        })
    }
    catch(err){
        console.log(err);
    }
}

startServer();

