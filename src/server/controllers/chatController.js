const Chat = require('../database/models/Chat');
const moment = require('moment');

const findAllChatsForUser = async (userId) => {
    try {
        const chatsAsInitiator = Chat.find({
            'initiator': userId
        });
        const chatsAsPartner = Chat.find({
            'partner': userId
        });

        const chats = await Promise.all([
            chatsAsInitiator,
            chatsAsPartner
        ]);

        const combinedChats = [
            ...chats[0].map(chat => chat.toInitiatorRepresentation()),
            ...chats[1].map(chat => chat.toPartnerRepresentation())
        ];

        return combinedChats;

    } catch (e) {
        return e;
    }
}

// Find if there is a chat with a user, as initiator or partner
const findChatWith = async (initiatorId, partnerId) => {
    try {
        const findResults = await Chat.findOne({ $or:[
            {'initiator': initiatorId, 'partner': partnerId},
            {'initiator': partnerId, 'partner': initiatorId }
        ]})
        return findResults;
    } catch (e) {
        return e;
    }
}

// Create new chat for initiator and partner
const createChatFor = async (initiatorId, partnerId) => {
    try {
        // find if there is a chat already
        const findResults = await findChatWith(initiatorId, partnerId);
        if (findResults) return findResults;

        const newChat = await Chat.create({
            initiator: initiatorId,
            partner: partnerId
        })

        return newChat;
    } catch (e) {
        console.log(e);
        return e;
    }
}

// Set messages in a chat for a user as read
// returns the chat and the representation for the user
const userReadChat = async (userId, chatId) => {
    try {
        // find the chat with userId and chatId (organised in frontend this way) as second user
        const chat = await findChatWith(userId, chatId);
        if (!chat) throw new Error();
        let isUpdate = false;
        chat.messages.forEach((message, index) => {
            if (message.author.toString() === chatId && !message.read) {
                message.read = true;
                isUpdate = true;
            }
        })
        chat.markModified('messages');
        if (isUpdate) {
            const updatedChat = await chat.save();
            return {
                isUpdate,
                chat: updatedChat
            }
        } else {
            return {
                isUpdate,
                chat
            }
        }
    } catch (e) {
        console.log(e);
        return e;
    }
}

// Create a new chat message by a user for a chat
// if the chat does not exist create the new chat before
const newChatMessage = async (userId, partnerId, message) => {
    try {
        let chat = await findChatWith(userId, partnerId);

        if (!chat) chat = await createChatFor(userId, partnerId);
        chat.messages.push(message);
        const updatedChat = await chat.save();
    } catch (e) {
        console.log(e);
        return e;
    }
}


module.exports = {
    findAllChatsForUser,
    findChatWith,
    createChatFor,
    userReadChat,
    newChatMessage
}