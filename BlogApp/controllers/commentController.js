
const Comment=require("../models/commentModel");
const Post =require("../models/postModel")

exports.createComment=async(req,res)=>{
    try{
        //fetch data from req body

        const{post,user,body}=req.body;
        const comment=new Comment({
            post,user,body
        }) ;
        //save the new comment into the database

        const saveComment=await comment.save();

        //find the post by ID,add the new comment to the comment array

        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:saveComment._id}},{new:true})
                            .populate("comments")//populate the comment array with commnt document
                            .exec()


        res.json({
            post:updatedPost,
        });




    }
    catch(err){
        return res.status(500).json({
            error:"Error while creating comment"
        })

    }
}