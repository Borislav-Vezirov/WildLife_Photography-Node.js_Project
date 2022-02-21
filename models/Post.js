const mongoose = require('mongoose');

const imagePattern  = /^https?:\/\//;

const userSchema = new mongoose.Schema({
    title    : {type: String, minlength: [6, 'Title must contain more than 5 characters']},
    keyword  : {type: String, minlength: [6, 'Keyword must contain more than 5 characters']},
    location : {type: String, maxlength: [15, 'Location should not be more than 15 characters']},
    date     : {type: String, minlength: [10, 'Date must be exactly 10 symbols'], maxlength: [10, 'Date must be exactly 10 symbols']},
    image    : {type: String, validate: {
        validator(value){
            return imagePattern.test(value);
        },
        message: 'Invalid image url'
    }},
    description : {type: String, minlength: [8, 'Description must contain more than 8 characters']},
    author: {type : mongoose.Types.ObjectId, ref: 'User', required: true}, 
    votes : {type: [mongoose.Types.ObjectId], ref: 'User', default: []}, 
    rating: {type : Number, default: 0} 

});

const Post = mongoose.model('Post', userSchema);

module.exports = Post;