const generateID = require ('../utils/generateID');
const Attendant = require('../models/Attendant');
exports.createAttendant = async (req, res) => {
    try {
        const {name} = req.body;
        const staffId = await generateID('attendant','STA');
         if (!name) {
            return res.status(400).json({
                message: "Certain fields are required"
            });
         };
        const newAttendant = new Attendant({
            name,
            staffId
        });

        await newAttendant.save();

        res.status(201).json({message: "New Attendant Added Successfully",
            data: newAttendant});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getAllAttendants = async (req, res) => {
    try {
        const attendant = await Attendant.find();
        res.json(attendant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAttendantbyId= async (req,res) =>{
    try{
        const id =req.params.id;
        const attendant = await Attendant.findOne({attendantId:id});
        if (!attendant) {
            return res.status(404).json({
                message: "Attendant not found"
            });
        }

        res.json(attendant);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
    };