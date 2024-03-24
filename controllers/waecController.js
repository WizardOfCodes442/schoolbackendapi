// waecController.js

const Waec = require('../models/waec');
const Biodata = require('../models/biodata');
const Student = require('../models/student');

const getWaecByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log('Fetching WAEC details for student ID:', studentId);

    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodataId = student.biodata_id;

    if (!biodataId) {
      return res.status(404).json({ message: 'Biodata not found for the student' });
    }

    // Assuming that the waec_id is a field in the Biodata model
    const biodata = await Biodata.findById(biodataId);

    if (!biodata || !biodata.waec_id) {
      return res.status(404).json({ message: 'WAEC details not found for the student' });
    }

    const waec = await Waec.findById(biodata.waec_id);

    if (!waec) {
      return res.status(404).json({ message: 'WAEC details not found for the biodata' });
    }

    console.log('Fetched WAEC details:', waec);

    res.json(waec);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWaecByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const waec = new Waec(req.body);
    const newWaec = await waec.save();

    // Update Biodata's waec_id
    const biodataId = student.biodata_id;
    if (biodataId) {
      const biodata = await Biodata.findByIdAndUpdate(
        biodataId,
        { waec_id: newWaec._id },
        { new: true }
      );
      if (!biodata) {
        return res.status(404).json({ message: 'Biodata not found for the student' });
      }
    }

    res.status(201).json(newWaec);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWaecByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Assuming that the waec_id is a field in the Biodata model
    const biodataId = student.biodata_id;
    const biodata = await Biodata.findById(biodataId);

    if (!biodata || !biodata.waec_id) {
      return res.status(404).json({ message: 'WAEC details not found for the student' });
    }

    const updatedWaec = await Waec.findByIdAndUpdate(
      biodata.waec_id,
      req.body,
      { new: true }
    );

    res.json(updatedWaec);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteWaecByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const biodataId = student.biodata_id;

    // Assuming that the waec_id is a field in the Biodata model
    const biodata = await Biodata.findByIdAndUpdate(biodataId);

    if (!biodata || !biodata.waec_id) {
      return res.status(404).json({ message: 'WAEC Details not found for the student' });
    }

    await Waec.findByIdAndDelete(biodata.waec_id);

    // Update Biodata's waec_id to null
    const updatedBiodata = await Biodata.findByIdAndUpdate(
      biodataId,
      { waec_id: null },
      { new: true }
    );

    if (!updatedBiodata) {
      return res.status(404).json({ message: 'Biodata not found for the student' });
    }

    res.json({ message: 'WAEC details deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWaecByStudentId,
  createWaecByStudentId,
  updateWaecByStudentId,
  deleteWaecByStudentId
};
