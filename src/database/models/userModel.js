import mongoose from 'mongoose';
import uuid from 'node-uuid';
import moment from 'moment';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, default: function genUUID() {
        return uuid.v1()
    }},
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, default: moment(Date.now()).format('LLLL') 
    },
    updatedAt: { 
        type: Date, default: moment(Date.now()).format('LLLL') 
    },
});

const users = mongoose.model('users', userSchema);


export default users
