const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    content:String,
    username:String,
    createdAt:String,

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

});

module.exports = model('Message', messageSchema);