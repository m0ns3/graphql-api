existCourse = (courses, id) => {
  let courseExists = false;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === id) {
      courseExists = true;

      break;
    }
  }
  return courseExists;
};

existStudent = (students, id) => {
  let studentExists = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      studentExists = true;

      break;
    }
  }
  return studentExists;
};

existGrade = (grades, id) => {
  let gradesExists = false;

  for (let i = 0; i < grades.length; i++) {
    if (grades[i].id === id) {
      gradeExists = true;

      break;
    }
  }
  return gradesExists;
};

module.exports.existCourse = existCourse;
module.exports.existStudent = existStudent;
module.exports.existGrade = existGrade;
