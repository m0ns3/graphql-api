const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

const courses = require("../courses.json");
const CourseType = require("./CourseType");

const StudentType = new GraphQLObjectType({
  name: "Student",
  description: "Represent students",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    courseId: { type: GraphQLNonNull(GraphQLInt) },
    course: {
      type: CourseType,
      resolve: student => {
        return courses.find(course => course.id === student.courseId);
      }
    }
  })
});
module.exports = StudentType;
