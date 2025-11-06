import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Added missing import

const app = express();

app.use(express.json()); // Added to parse JSON bodies

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to Mern Stack tutorial')
});

//Route for save a new book
app.post('/books', async (request,response)=>{ // Added async keyword
    try{
        if(
            !request.body.title ||  
            !request.body.author ||  
            !request.body.publishYear 
        ){
            return response.status(400).send({message: 'send all required fields: title,author,publishYear'});
        } // Removed extra parenthesis

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}); // Fixed closing brackets and parentheses






mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log('Error connecting to MongoDB:', error);
});