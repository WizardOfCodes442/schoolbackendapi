const Profile = require('../models/profile');
const Student = require('../models/student');
const { ObjectId } = require('mongoose').Types;

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log('Fetching profile for student ID:', studentId);

    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const profileId = student.profile_id;

    const profile = await Profile.findOne({ _id: new ObjectId(profileId) });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    console.log('Fetched profile:', profile);

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const profile = new Profile(req.body);
    const newProfile = await profile.save();

    // Update student's profile_id
    student.profile_id = newProfile._id;
    await student.save();

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      student.profile_id,
      req.body,
      { new: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const profileId = student.profile_id;

    await Profile.findByIdAndDelete(profileId);
    
    // Update student's profile_id to null
    student.profile_id = null;
    await student.save();

    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
