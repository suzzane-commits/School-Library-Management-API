const generateID = require ('../utils/generateID');
const Student = require('../models/Student');
exports.createStudent = async (req, res) => {
    try {
        const { name, email } = req.body;
        const studentId = await generateID('student','S');
         if (!name || !email) {
            return res.status(400).json({
                message: "Certain fields are required"
            });
         };
        const newStudent = new Student({
            name,
            email,
            studentId
        });

        await newStudent.save();

        res.status(201).json({message: "New Student Added Successfully",
            data: newStudent});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getAllStudents = async (req, res) => {
    try {
        const student = await Student.find();
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStudentbyId= async (req,res) =>{
    try{
        const id =req.params.id;
        const student = await Student.findOne({studentId:id});
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
    };

    exports.updateStudent = async(req,res)=>{
    try {
        const id= req.params.id;
        console.log(id)
         const { name, email } = req.body;
         if (!name ||!email)
         {
            return res.status(400).json({
                message: "At least one field is required"
            });
         }
         const updatedStudent = await Student.findOneAndUpdate(
            {studentId:id},
            { name, email },
            { returnDocument: 'after', runValidators: true }
     );
         if (!updatedStudent){
            return res.status(404).json({
                message:"No updated student found"
            });
         }
         res.json({
            message:'Student has been updated',
            data:updatedStudent
         });
    } catch(error) {
        res.status(500).json({
            message:"Server error",
            error:error.message
        });
    }
};
exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id; // A001

        const deletedStudent = await Student.findOneAndDelete({
            studentId: id
        });

        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            data: deletedStudent
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};