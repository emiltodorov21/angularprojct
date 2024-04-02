const express = require("express");
const Book = require("../models/Books");
const router = express.Router();
const AuthenticationMIddleware = require("../AuthenticationMiddleware");

router.post("*", AuthenticationMIddleware);
router.put("*", AuthenticationMIddleware);
router.delete("*", AuthenticationMIddleware);

router.get("/", async (req, res) => {
   const allBooks = await Book.find()
   res.json(allBooks);
})

router.get("/Random", async (req, res) => {
   try {
      const randomBook = await Book.aggregate([{ $sample: { size: 1 } }]);
      console.log(randomBook);
      res.json(randomBook[0]);
   } catch (err) {
      res.status(400).json(err);
   }

})

router.get("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const allBooks = await Book.findById(id)
      console.log(allBooks);
      res.json(allBooks);
   } catch (err) {
      res.status(400).json(err);
   }

})

router.get("/owned/:ownerId", async (req, res) => {
   try {
      const ownerId = req.params.ownerId;
      const ownerBooks = await Book.find( {ownerId: ownerId})
      console.log("OWNED BOOKS", ownerBooks, "OWNED BOOKS");
      res.json(ownerBooks);
   } catch (err) {
      res.status(400).json(err);
   }

})

router.post("/Add", async (req, res) => {
   const bookInfo = req.body;
   await Book.create(bookInfo);
   res.status(200).send("Book Added");
})

router.put("/Edit/:id", async (req, res) => {
   try {
      const bookId = req.params.id
      console.log("CHECK THE ID", bookId);
      const updateInfo = req.body;
      console.log("CHECK THE BODY", updateInfo);
      const returnedBook = await Book.findByIdAndUpdate(bookId, updateInfo, {
         new: true
      })
      res.json(returnedBook);
   } catch (err) {
      console.log("Error from BE", err);
      res.status(400).json(err);
   }
})

router.delete("/Delete/:id", async (req, res) => {
   try {
      const bookId = req.params.id
      await Book.findByIdAndDelete(bookId);
      res.json({ message: "Book deleted" });
   } catch (err) {
      res.status(400).json(err);
   }
})

router.put("/Watched/:id" , async (req,res) => {
   try {
      const bookId = req.params.id
      const {currentUserId} = req.body;
      console.log("BOOK ID IS", bookId);
      console.log("CURREND USER ID IS", currentUserId);
      findIfWatched = await Book.findById(bookId);
      if( findIfWatched.watchedCounter.includes(currentUserId)) {
         const returnedBook = await Book.findByIdAndUpdate(bookId, {
            $pull: { "watchedCounter": currentUserId } ,
         } , { new: true})
         console.log("RETURNED BOOK ID , REMOVED",returnedBook.watchedCounter )
         res.json( {hasWatched: false});
      } else {
         const returnedBook = await Book.findByIdAndUpdate(bookId, {
            "$push": { "watchedCounter": currentUserId } ,
         } , { new: true})
         console.log("RETURNED BOOK ID , ADDED",returnedBook.watchedCounter )
         res.json(  {hasWatched: true});
      }
   } catch (err) {
      res.status(400).json(err);
   }
})

//Comments Section

router.post("/Comments/:id/Add", async (req, res) => {
   console.log("COMMENTS ID POST FIRED");
   try {
      const bookId = req.params.id;
      const {owner, comment, username} = req.body;
      commentInfo = {
         owner:owner,
         comment:comment,
         username:username
      }
      console.log("COMMENTS INFO", commentInfo)
      updatedBook = await Book.findByIdAndUpdate(bookId , { $push: { comments: commentInfo } , new:true });
      res.json(updatedMBook);
   } catch (err) {
      res.status(400).json(err);
   }
});

router.get("/Comments/:id/All", async (req, res) => {
   try {
      const bookId = req.params.id;
      const allBookComments = await Book.find( {_id:bookId}, {comments:1})
      const currentComments = allBookComments[0].comments;
      console.log("CURRENT Book COMMENTS:", currentComments)
      if (currentComments.length===0) {
         return res.status(400).json({message:"No comments"});
      }
      res.json(currentComments);
   } catch (err) {
      res.json({})
   }
})

router.put("/Comments/:id/Delete", async (req,res)=> {
   try {
      const bookId = req.params.id;
      const {commentId} = req.body;
      console.log("COMMENT ID", commentId);
      console.log("BOOKID", bookId);
      const deletedComment = await Book.findOneAndUpdate( 
         {_id: bookId},
         {$pull: { comments: {_id: commentId}}}
         )
      res.json({message: "Comment Deleted"});
   } catch (err) {
      res.status(400).json(err);
   }
})


module.exports = router;