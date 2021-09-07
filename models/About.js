const { model, Schema } = require('mongoose');

const aboutSchema = new Schema({
    username:String,
    aboutBody:String,

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

});

module.exports = model('About', aboutSchema);
