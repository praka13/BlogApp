
const Like=require("../models/likeModel");
const Post=require("../models/postModel");

//like a post
exports.likePost=async(req,res)=>{
    try{

        const{post,user}=req.body;
        const like=new Like({
            post,user
        })
        const saveLike=await like.save();

        //update the post collection

        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:saveLike._id}},{new:true}).populate("likes").exec();

        res.json({
            post:updatedPost
        })


    }
    catch(err){

        return res.status(500).json({
            error:"Error while liking post"
        })

    }
}


//unlike a post

exports.unlikePost=async(req,res)=>{
    try{
        const {post,like}=req.body;
        const {id}=req.params;
        //find and delete like
        const deletedLike=await Like.findOneAndDelete(id);

        //update the post collection

        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.json({
            post:updatedPost,
        });

    }
    catch(err){

        return res.status(400).json({
            error:"Error while deleting post"
        }) 

    }
}