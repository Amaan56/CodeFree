

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({

email : {
    type : String
},
facebook : {
    type:String
},
tokens : Array,
profile : {
 name : {type : String, default : ''},
 picture : {type : String, default : ''}
},
coursesTeach : {
    course : {type : Schema.Types.ObjectId, ref : 'Course'}
},
coursesTaken : {
    course : {type : Schema.Types.ObjectId, ref : 'Course'}
}

})

module.exports = mongoose.model('User',UserSchema);