const generateID = require ('../utils/generateID');
const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const authorId = await generateID('author', 'A');
         if (!name || !bio) {
            return res.status(400).json({
                message: "Certain fields are required"
            });
         };
        const newAuthor = new Author({
            authorId,
            name,
            bio
        });

        await newAuthor.save();

        res.status(201).json({message: "New Author Added Successfully",
            data: newAuthor});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getAllAuthors = async (req, res) => {
    try {
        const author = await Author.find();
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAuthorbyId= async (req,res) =>{
    try{
        const id =req.params.id;
        const author = await Author.findOne({authorId:id});
        if (!author) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        res.json(author);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
    };

    exports.updateAuthor = async(req,res)=>{
    try {
        const id= req.params.id;
        console.log(id)
         const { name, bio } = req.body;
         if (!name ||!bio)
         {
            return res.status(400).json({
                message: "At least one field is required"
            });
         }
         const updatedAuthor = await Author.findOneAndUpdate(
            {authorId:id},
            { name, bio },
            { returnDocument: 'after', runValidators: true }
     );
         if (!updatedAuthor){
            return res.status(404).json({
                message:"No updated author found"
            });
         }
         res.json({
            message:'Author has been updated',
            data:updatedAuthor
         });
    } catch(error) {
        res.status(500).json({
            message:"Server error",
            error:error.message
        });
    }
};
exports.deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id; // A001

        const deletedAuthor = await Author.findOneAndDelete({
            authorId: id
        });

        if (!deletedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        res.json({
            message: "Author deleted successfully",
            data: deletedAuthor
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};