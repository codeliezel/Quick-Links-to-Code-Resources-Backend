import mongoose from 'mongoose';
import uuid from 'node-uuid';
import moment from 'moment';

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    _id: { type: String, default: function genUUID() {
        return uuid.v1()
    }},
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        minimum: 200,
    },
    tags: {
        type: String,
        required: true,
    },
    userId: {
        type: 
        Schema.Types.ObjectId, 
        ref: 'users'
    },
    createdAt: { 
        type: Date, default: moment(Date.now()).format('LLLL') 
    },
    updatedAt: { 
        type: Date, default: moment(Date.now()).format('LLLL') 
    },
});

const links = mongoose.model('links', linkSchema);


export default links
