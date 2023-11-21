import express from 'express';
import Post from '../models/Post.js'
import User from '../models/User.js';
import mongoose from "mongoose";
const router = express.Router();


// create post
router.post('/', async (req, res) => {
    const newpost = new Post(req.body)
    try {
        const savedPost = await newpost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
});

// update post
router.patch('/:id', async (req, res) => {
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post');

    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost)

    // try {
    //     const post = await Post.findById(req.params.id);
    //     if(post.userId === req.body.userId){
    //         const updatePost = await post.findByIdAndUpdate(id, {$set: req.body}, {new:true});
    //         res.json(updatePost)
    //         // res.status(200).json("update post successfully")
    //     }else{
    //         res.status(403).json("you can update only your post")
    //     }
    // } catch (error) {
    //     res.status(500).json(error)
    // }

});

// delete post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("delete post successfully")
    } catch (error) {
        res.status(500).json(error)
    }

});

// like/disliked a post
router.patch('/:id/like', async (req, res) => {
    const {id} = req.params;

    if(!req.body.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    const post = await Post.findById(id);
    
    const index = post.likes.findIndex((id) => id === String(req.body.userId));
    
    if(index === -1){
        post.likes.push(req.body.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.body.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost)

});



// get post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
});

// gets posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(currentUser.followings.map((friendId) => {return Post.find({userId: friendId})}));
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json("error")
    }
});

// get user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;


// update post
// router.put('/:id', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if(post.userId === req.body.userId){
//             await post.updateOne({$set: req.body}, {new:true});
//             res.status(200).json("update post successfully")
//         }else{
//             res.status(403).json("you can update only your post")
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }

// });


// like/disliked a post
// router.put('/:id/like', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if(!post.likes.includes(req.body.userId)) {
//             await post.updateOne({$push: {likes: req.body.userId}});
//             res.status(200).json("The post has been liked")
//         }else{
//             await post.updateOne({$pull: {likes: req.body.userId}})
//             res.status(200).json("The post has been disliked")
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }

// });