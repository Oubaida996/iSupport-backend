'use strict';


const database = require('../db/models/index');
const message = require('./chat-app/message');
const { userJoin, getCurrentUser, leveCommunity, getUserCommunity } = require('./chat-app/user');


const host = 'http://localhost:3000';
const io = require('socket.io')(host);
// const chatConnection = io.connect(`${host}/chat`);

// change this one to add the community name from the database
let chatBox = "community";
function getCurrentTime() {

    let chatDate = new Date();
    let hour = chatDate.getHours();
    let min = chatDate.getMinutes();
    let chatTime = hour + ':' + min + ' ';
    return chatTime;
}

// when clinet get connect run
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('joinRoom', ({ username, community_id }) => {
        const user = userJoin(socket.id, username, community_id);
        socket.join(user.community_id);

        // to see the chat history
        // we need to create chat database

        let chatHistory = database.Chat.findAll({
            where: {
                community_id: user.community_id
            }
        }).then((model) => {
            for (item of model) {
                console.log(item.chat_message);
                let chatDate = new Date(item.createdAt);
                let hour = chatDate.getHours();
                let min = chatDate.getMinutes();
                let chatTime = hour + ':' + min + ' ';
                socket.emit('message',message(item.username + ' ' ,chatTime, item.chat_message));
            }
        })
        console.log('chat History',chatHistory);

        // welcome message
        socket.emit('message',message(' ',' ','welcom to this community'));

        // user joind message
        let chatTime = getCurrentTime();
        socket.broadcast.to(user.community_id).emit(
            'message',message(chatBox,chatTime, `${user.username} has joind this community chat`));

            // send user and community data
            io.to(user.community_id).emit('userCommunity',{
            community_id: user.community_id,
            users: getUserCommunity(user.community_id),
            });
    });

    // listen to chat message
    socket.on('message', (msg) => {
        const user = getCurrentUser(socket.id);

        let chatTime = getCurrentTime();
        io.to(user.community_id).emit('message',message(user.username,chatTime,msg ));
       console.log('user.username', user.community_id);
       database.Chat.create({
        chat_message: msg,
        username: user.username,
        community_id: user.community_id
       }); 
    }) ;

    // when clinet disconnect
    socket.on('disconnect', () => {
        const user = leveCommunity(socket.id);
        let chatTime = getCurrentTime();
        if(user){
            io.to(user.community_id).emit('message',
            message(chatBox,chatTime,`${user.username} has left`));

            // send users and community data
            io.to(user.community_id).emit('userCommunity',{
                community_id: user.community_id,
                users:getUserCommunity(user.community_id),
            })

        }
    })
})
