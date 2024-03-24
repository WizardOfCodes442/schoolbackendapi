const Student = require('../models/student');

// Create Student
//const { v4: uuidv4 } = require('uuid');

const createStudent = async (req, res) => {
    try {
        const { profile_id, biodata_id, coursereglist_id } = req.body;

        // Generate a random ID
        //const studentId = uuidv4();

        const newStudent = new Student({
            //studentId,
            profile_id,
            biodata_id,
            coursereglist_id
        });

        const createdStudent = await newStudent.save();
        res.status(201).json({studentId: createdStudent._id});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


  
// Get All Students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student by ID
const updateStudentById = async (req, res) => {
  try {
    const { profile_id, biodata_id, coursereglist_id } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profile_id,
          biodata_id,
          coursereglist_id
        }
      },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Student by ID
const deleteStudentById = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById
};
