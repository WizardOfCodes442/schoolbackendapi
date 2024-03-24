const Biodata = require('../models/biodata');
const Student = require('../models/student');
const { ObjectId } = require('mongoose').Types;

const getBiodataByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodata = await Biodata.findById(student.biodata_id);
    res.json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBiodata = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodata = new Biodata(req.body);
    const newBiodata = await biodata.save();

    // Update student's biodata_id
    student.biodata_id = newBiodata._id;
    await student.save();

    res.status(201).json(newBiodata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBiodata = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedBiodata = await Biodata.findByIdAndUpdate(
      student.biodata_id,
      req.body,
      { new: true }
    );

    res.json(updatedBiodata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBiodata = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodataId = student.biodata_id;

    await Biodata.findByIdAndDelete(biodataId);

    // Update student's biodata_id to null
    student.biodata_id = null;
    await student.save();

    res.json({ message: 'Biodata deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBiodataByStudentId,
  createBiodata,
  updateBiodata,
  deleteBiodata,
};
