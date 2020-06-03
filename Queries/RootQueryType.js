const courses = require("../courses.json");
const students = require("../students.json");
const grades = require("../grades.json");

const CourseType = require("../Types/CourseType");
const StudentType = require("../Types/StudentType");
const GradeType = require("../Types/GradeType");

const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    courses: {
      type: new GraphQLList(CourseType),
      description: "List of All Courses",
      resolve: () => courses
    },
    students: {
      type: new GraphQLList(StudentType),
      description: "List of All Students",
      resolve: () => students
    },
    grades: {
      type: new GraphQLList(GradeType),
      description: "List of All Grades",
      resolve: () => grades
    },
    course: {
      type: CourseType,
      description: "Particular Course",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => courses.find(course => course.id === args.id)
    },
    student: {
      type: StudentType,
      description: "Particular Student",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) =>
        students.find(student => student.id === args.id)
    },
    grade: {
      type: GradeType,
      description: "Particular Grade",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => grades.find(grade => grade.id === args.id)
    }
  })
});

module.exports = RootQueryType;
