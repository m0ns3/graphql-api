const courses = require("../courses.json");
const students = require("../students.json");
const grades = require("../grades.json");

const CourseType = require("../Types/CourseType");
const StudentType = require("../Types/StudentType");
const GradeType = require("../Types/GradeType");

let _ = require("lodash");
const existsIds = require("../existsId");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

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
          id: courses[courses.length - 1].id + 1,
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
        if (existsIds.existId(courses, args.courseId)) {
          const student = {
            id: students[students.length - 1].id + 1,
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
        if (existsIds.existId(courses, args.courseId)) {
          if (existsIds.existId(students, args.studentId)) {
            const grade = {
              id: grades[grades.length - 1].id + 1,
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
    },
    deleteCourse: {
      type: CourseType,
      description: "Delete a course",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        if (existsIds.existId(courses, args.id)) {
          if (!existsIds.existId(students, args.id)) {
            _.remove(courses, course => {
              return course.id == args.id;
            });
          } else {
            throw new Error(
              "You should not delete a course associated with a student."
            );
          }
        } else {
          throw new Error("Doesn't exist that courseId.");
        }
      }
    },
    deleteStudent: {
      type: StudentType,
      description: "Delete a student",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        if (existsIds.existId(students, args.id)) {
          if (!existsIds.existIdGrade(grades, args.id)) {
            _.remove(students, student => {
              return student.id == args.id;
            });
          } else {
            throw new Error(
              "You should not delete a student associated with a grade."
            );
          }
        } else {
          throw new Error("Doesn't exist that studentId.");
        }
      }
    },
    deleteGrade: {
      type: GradeType,
      description: "Delete a grade",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        if (existsIds.existId(grades, args.id)) {
          _.remove(grades, grade => {
            return grade.id == args.id;
          });
        } else {
          throw new Error("Doesn't exist that gradeId.");
        }
      }
    }
  })
});

module.exports = RootMutationType;
