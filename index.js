const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

app.listen(3000, () => {
  console.log("Server running");
});

const courses = require("./courses.json");
const students = require("./students.json");
const grades = require("./grades.json");

const CourseType = new GraphQLObjectType({
  name: "Course",
  description: "Represent courses",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) }
  })
});

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

//Query
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
    }
  })
});

//Schema
const schema = new GraphQLSchema({
  query: RootQueryType
  //mutation: RootMutationType
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
