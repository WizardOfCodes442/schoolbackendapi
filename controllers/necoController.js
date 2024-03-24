//necoController

const Neco = require ('../models/neco');
const Biodata = require('../models/biodata');
const Student = require('../models/student');
const biodata = require('../models/biodata');

const getNecoByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        console.log('Fetching student neco details for student ID :', studentId);

        const student = await Student.findOne({_id: studentId});

        if(!student) {
            return res.status(404).json({message: ' Student not found'});
        }

        const biodataId = student.biodata_id;

        if (!biodataId) {
            return res.status(404).json({message:'Biodata not found for the student'});
        }

        //Assuming that the waec_id is a field in the Biodata model 
        const biodata = await Biodata.findById(biodataId);

        if (!biodata || !biodata.neco_id) {
            return res.status(404).json({message: 'Neco details not found for this student id'});

        }

        const neco = await Neco.findById(biodata.neco_id);

        if (!neco) {
            return res.status(404).json({message: 'Neco details not found for this biodata id'});
        }

        console.log('Fetched  NECO details: ', neco);
        res.json(neco);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const createNecoByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({_id: studentId});
        
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        const { subjects, exam_year, school } = req.body;
        const grades = req.body.grade; // Corrected to 'grade' instead of 'grades'

        const neco = new Neco({
            subjects,
            exam_year,
            school,
            grades,
        });

        const newNeco = await neco.save();

        // Update Biodata's neco_id 
        const biodataId = student.biodata_id;
        if(biodataId) {
            const biodata = await Biodata.findByIdAndUpdate(
                biodataId,
                {neco_id: newNeco._id},
                {new: true}
            );
        }
        if (!biodata) {
            res.status(404).json({message: 'Biodata not found for the student'});
        }

        res.status(201).json(newNeco);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateNecoByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({_id: studentId});

        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        //Asumming that the neco_id is a field in the Biodata model 
        const biodataId = student.biodata_id;
        const biodata = await Biodata.findById(biodataId);

        if (!biodata || !biodata.neco_id) {
            return res.status(404).json({message: 'NECO details not found for the student '});

        }

        const updatedNeco = await Neco.findByIdAndUpdate(
            biodata.neco_id,
            req.body,
            {new: true}
        );

        response.json(updatedNeco);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteNecoByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findOne({_id: studentId});

        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        const biodataId = student.biodata_id;

        //Assuming that the neco_id is a field in the Biodata model
        const biodata = await Biodata.findByIdAndUpdate(biodataId);

        if (!biodata || !biodata.neco_id) {
            return res.status(404).json({message: 'Neco Details not found for the student'});

        }

        await Neco.findByIdAndDelete(biodata.neco_id);

        //Update Biodata's neco_id to null 
        const updatedBiodata = await Biodata.findByIdAndUpdate(
            biodataId,
            {neco_id: null},
            {new: true}
        );

        if (!updatedBiodata) {
            return res.status(404).json({message: 'Biodata not found for the student '});
        }

        res.json({message: 'WAEC details deleted'});
    } catch(error) {
        response.status(500).json({message: error.message});
    }
}

module.exports = {
    getNecoByStudentId,
    createNecoByStudentId,
    updateNecoByStudentId,
    deleteNecoByStudentId
}