const { mongoose } = require('../index');

const chatSchema = mongoose.Schema({
    initiator: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    partner: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    messages: [{
        id: String,
        author: { type: mongoose.Schema.ObjectId, ref: 'User' },
        timestamp: String,
        msg: String,
        read: Boolean
    }]
});

chatSchema.methods.toInitiatorRepresentation = function() {
    return {
        id: this._id,
        partner: this.partner,
        messages: this.messages
    }
}

chatSchema.methods.toPartnerRepresentation = function() {
    return {
        id: this._id,
        partner: this.initiator,
        messages: this.messages
    }
}



module.exports = mongoose.model('Chat', chatSchema);