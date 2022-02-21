const Post = require("../models/Post.js");

async function createPost(post){

    const result = new Post(post);

    await result.save();

    return result;
};

async function getAllPost(){

    return await Post.find({}).lean();
};

async function getPostsByAuthor(userId){

    return Post.find({author: userId}).populate('author', 'fname lname').lean();
};

async function getOneById(id){

    return await Post.findById(id).populate('author', 'fname lname').populate('votes', 'email').lean();
};

async function getOneAndUpdate(id, post){

    return await Post.findByIdAndUpdate(id, post);

};

async function deletePost(id){

    return await Post.findOneAndDelete({_id: id});
};

async function vote(postId, userId, value){

    const post = await Post.findById(postId);
    
    if(post && post.votes.includes(userId)){
        throw new Error('You already vote!')
    };

    post.votes.push(userId);
    post.rating += value;

    await post.save();
};

module.exports = {
    createPost,
    getAllPost,
    getPostsByAuthor,
    getOneById,
    getOneAndUpdate,
    deletePost,
    vote
};