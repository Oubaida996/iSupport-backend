'use strict' ;


const Posts = (db , DataTypes) => db.define('posts' , {
    post_title :{
        type :DataTypes.STRING,
        allowNull :false,
        

    },
    post_body :{
        type :DataTypes.STRING,
        allowNull :false,
        
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    }

});

module.exports =Posts;