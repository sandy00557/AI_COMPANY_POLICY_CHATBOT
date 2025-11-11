import express from 'express';
import cors from 'cors';
import multer from 'multer';
const app=express();
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 5000;

//app.listen app.get() everything are methods.


app.listen(PORT,()=>{
    console.log(`Server 