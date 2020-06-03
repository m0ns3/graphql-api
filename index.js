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

const existsIds = require("./existsId");

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

//Mutations
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCourse: {
      type: CourseType,
      description: "Add a course",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const course = {
          id: courses.length + 1,
          name: args.name,
          description: args.description
        };
        courses.push(course);
        return course;
      }
    },
    addStudent: {
      type: StudentType,
      description: "Add a student",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        courseId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        if (existsIds.existCourse(courses, args.courseId)) {
          const student = {
            id: students.length + 1,
            name: args.name,
            lastname: args.lastname,
            courseId: args.courseId
          };

          students.push(student);
          return student;
        } else {
          throw new Error("Doesn't exist that courseId.");
        }
      }
    },
    addGrade: {
      type: GradeType,
      description: "Add a grade",
      args: {
        grade: { type: GraphQLNonNull(GraphQLString) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        studentId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        if (existsIds.existCourse(courses, args.courseId)) {
          if (existsIds.existStudent(students, args.studentId)) {
            const grade = {
              id: grades.length + 1,
              grade: args.grade,
              courseId: args.courseId,
              studentId: args.studentId
            };
            grades.push(grade);
            return grade;
          } else {
            throw new Error("Doesn't exist that studentId.");
          }
        } else {
          throw new Error("Doesn't exist that courseId.");
        }
      }
    }
  })
});

//Queries
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

//Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
