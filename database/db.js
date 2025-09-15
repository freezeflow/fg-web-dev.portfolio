import mongoose from 'mongoose'
import { DB_URI } from '../config/config.js';

export default async function db(){
    try{
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected successfuly');
    } catch(error){
        console.log('Connection unsuccessful:', error);
    }
}
