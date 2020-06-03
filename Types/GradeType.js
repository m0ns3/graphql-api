const courses = require("../courses.json");
const students = require("../students.json");

const CourseType = require("./CourseType");
const StudentType = require("./StudentType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

const GradeType = new GraphQLObjectType({
  name: "Grade",
  description: "Represent grades",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    grade: { type: GraphQLNonNull(GraphQLString) },
    courseId: { type: GraphQLNonNull(GraphQLInt) },
    course: {
      type: CourseType,
      resolve: grade => {
        return courses.find(course => course.id === grade.courseId);
      }
    },
    studentId: { type: GraphQLNonNull(GraphQLInt) },
    student: {
      type: StudentType,
      resolve: grade => {
        return students.find(student => student.id === grade.studentId);
      }
    }
  })
});

module.exports = GradeType;
