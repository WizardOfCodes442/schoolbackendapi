
const Student = require('../models/student');
const Coursereglist = require('../models/coursereglist');
const Coursereg = require('../models/coursereg');
const coursereglist = require('../models/coursereglist');



const getCourseregList = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const coursereglistid = student.coursereglist_id;
    
    const coursereglists = await Coursereglist.findOne({ _id: coursereglistid });
    console.log(coursereglists.length);

    if (!coursereglists) {
      return res.json({ message: 'Coursereglist not found for the student' });
    }
    if (!coursereglists || coursereglists.length === 0) {
      return res.json({ message: 'Coursereglists not found for the student' });
    }
    let rawlistCourseRegs = [];
    Object.entries(coursereglists).forEach(([key, value])=> {
      rawlistCourseRegs.push(value);
    })

    let courseregkeys = rawlistCourseRegs[2];
    let arrayofCourseRegsKeys = [];
    Object.entries(courseregkeys).forEach(([key, value])=> {
      arrayofCourseRegsKeys.push(value);
    });

    let CourseregList = [];
    for (let i = 2; i < arrayofCourseRegsKeys.length; i++) {
      CourseregList.push(await Coursereg.findById(arrayofCourseRegsKeys[i]));
    }




    console.log(CourseregList);

    return res.json(CourseregList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCourseregByIndex = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const coursereglistid = student.coursereglist_id;
    
    const coursereglists = await Coursereglist.findOne({ _id: coursereglistid });
    console.log(coursereglists.length);

    if (!coursereglists) {
      return res.json({ message: 'Coursereglist not found for the student' });
    }
    if (!coursereglists || coursereglists.length === 0) {
      return res.json({ message: 'Coursereglists not found for the student' });
    }
    let rawlistCourseRegs = [];
    Object.entries(coursereglists).forEach(([key, value])=> {
      rawlistCourseRegs.push(value);
    })

    let courseregkeys = rawlistCourseRegs[2];
    let arrayofCourseRegsKeys = [];
    Object.entries(courseregkeys).forEach(([key, value])=> {
      arrayofCourseRegsKeys.push(value);
    });

    let CourseregList = [];
    for (let i = 2; i < arrayofCourseRegsKeys.length; i++) {
      CourseregList.push(await Coursereg.findById(arrayofCourseRegsKeys[i]));
    }



    //console.log(req.params.courseregId)
    console.log(CourseregList[req.params.courseregId-1]);

    return res.json(CourseregList[req.params.courseregId-1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Implement similar logic for other functions

const createCoursereg = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    const courseregData = req.body;

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const coursereglistid = student.coursereglist_id;
    
    const coursereglists = await Coursereglist.findOne({ _id: coursereglistid });
    console.log(coursereglists.length);

    if (!coursereglists) {
      return res.json({ message: 'Coursereglist not found for the student' });
    }
    if (!coursereglists || coursereglists.length === 0) {
      return res.json({ message: 'Coursereglists not found for the student' });
    }
    let rawlistCourseRegs = [];
    Object.entries(coursereglists).forEach(([key, value])=> {
      rawlistCourseRegs.push(value);
    })

    let courseregkeys = rawlistCourseRegs[2];
    let arrayofCourseRegsKeys = [];
    Object.entries(courseregkeys).forEach(([key, value])=> {
      arrayofCourseRegsKeys.push(value);
    });

    let CourseregList = [];
    for (let i = 2; i < arrayofCourseRegsKeys.length; i++) {
      CourseregList.push(await Coursereg.findById(arrayofCourseRegsKeys[i]));
    }

    CourseregList.push(courseregData);



    //console.log(req.params.courseregId)
    //console.log(CourseregList[req.params.courseregId-1]);

    return res.json(CourseregList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourseregByIndex = async (req, res) => {
  const studentId = req.params.id;
  const index = req.params.index;
  const courseregData = req.body;

  try {
    const coursereglist = await Coursereglist.findOne({ student: studentId });

    if (!coursereglist || !coursereglist.courseregs[index]) {
      return res.status(404).json({ message: 'Coursereglist or index not found' });
    }

    const courseregId = coursereglist.courseregs[index];
    const updatedCoursereg = await Coursereg.findByIdAndUpdate(courseregId, courseregData, { new: true });

    res.json(updatedCoursereg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourseregByIndex = async (req, res) => {
  const studentId = req.params.id;
  const index = req.params.index;

  try {
    const coursereglist = await Coursereglist.findOne({ student: studentId });

    if (!coursereglist || !coursereglist.courseregs[index]) {
      return res.status(404).json({ message: 'Coursereglist or index not found' });
    }

    const courseregId = coursereglist.courseregs[index];
    await Coursereg.findByIdAndDelete(courseregId);

    coursereglist.courseregs.splice(index, 1);
    await coursereglist.save();

    res.json({ message: 'Coursereg deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getCourseregList,
  getCourseregByIndex,
  createCoursereg,
  updateCourseregByIndex,
  deleteCourseregByIndex,
};


