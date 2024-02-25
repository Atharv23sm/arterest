const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});


const postSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    filename: String,
    caption: String,
    username: String,
    created_At: { type: Date, default: Date.now }
});

const users = mongoose.model("users", userSchema);
const posts = mongoose.model("posts", postSchema);

module.exports = { users, posts };
