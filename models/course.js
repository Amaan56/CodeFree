import { Schema } from 'mongoose';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
 title : {
     type: String
 },
 desc : {
    type: String
},
wistiaId : {
    type: String
},
price : {
    type : Number
},
ownByTeacher : {
    type : Schema.Types.ObjectId,
    ref : 'User'
},
ownByStudent:[
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : 'User'
        }
    }
],
totalStudents : Number



})

module.exports = mongoose.model('Course',CourseSchema);