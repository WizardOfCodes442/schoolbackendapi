// jambController.js

const Jamb = require('../models/jamb');
const Biodata = require('../models/biodata');
const Student = require('../models/student');

const getJambByStudentId = async (req, res) => {
    try {
      const studentId = req.params.id;
      console.log('Fetching JAMB details for student ID:', studentId);
  
      const student = await Student.findOne({ _id: studentId });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const biodataId = student.biodata_id;
  
      if (!biodataId) {
        return res.status(404).json({ message: 'Biodata not found for the student' });
      }
  
      // Assuming that the jamb_id is a field in the Biodata model
      const biodata = await Biodata.findById(biodataId);
  
      if (!biodata || !biodata.jamb_id) {
        return res.status(404).json({ message: 'JAMB details not found for the student' });
      }
  
      // Check if biodata.jamb_id is a valid ObjectId
      //const isValidObjectId = mongoose.Types.ObjectId.isValid(biodata.jamb_id);
  
      //if (!isValidObjectId) {
      //  return res.status(404).json({ message: 'Invalid JAMB ID format' });
      //}
  
      // Use findOne with a query based on the JAMB ID
      console.log(biodata.jamb_id)
      const jamb = await Jamb.findOne({ _id: biodata.jamb_id });
  
      if (!jamb) {
        return res.status(404).json({ message: 'JAMB details not found for the biodata' });
      }
  
      console.log('Fetched JAMB details:', jamb);
  
      res.json(jamb);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const createJambByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { registration_number, exam_year, score } = req.body;

    const jamb = new Jamb({
      registration_number,
      exam_year,
      score,
    });

    const newJamb = await jamb.save();

    // Update Biodata's jamb_id
    const biodataId = student.biodata_id;
    if (biodataId) {
      const biodata = await Biodata.findByIdAndUpdate(
        biodataId,
        { jamb_id: newJamb._id },
        { new: true }
      );
      if (!biodata) {
        res.status(404).json({ message: 'Biodata not found for the student' });
      }
    }

    res.status(201).json(newJamb);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateJambByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Assuming that the jamb_id is a field in the Biodata model
    const biodataId = student.biodata_id;
    const biodata = await Biodata.findById(biodataId);

    if (!biodata || !biodata.jamb_id) {
      return res.status(404).json({ message: 'JAMB details not found for the student' });
    }

    const updatedJamb = await Jamb.findByIdAndUpdate(
      biodata.jamb_id,
      req.body,
      { new: true }
    );

    res.json(updatedJamb);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteJambByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodataId = student.biodata_id;

    // Assuming that the jamb_id is a field in the Biodata model
    const biodata = await Biodata.findByIdAndUpdate(biodataId);

    if (!biodata || !biodata.jamb_id) {
      return res.status(404).json({ message: 'JAMB Details not found for the student' });
    }

    await Jamb.findByIdAndDelete(biodata.jamb_id);

    // Update Biodata's jamb_id to null
    const updatedBiodata = await Biodata.findByIdAndUpdate(
      biodataId,
      { jamb_id: null },
      { new: true }
    );

    if (!updatedBiodata) {
      return res.status(404).json({ message: 'Biodata not found for the student' });
    }

    res.json({ message: 'JAMB details deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJambByStudentId,
  createJambByStudentId,
  updateJambByStudentId,
  deleteJambByStudentId
};
