# Create a Graphql structure in order to:

- Query all Courses, Students and Grades
- Query by id a Course, Student and Grade 
- Create a Course, Student and Grade
- Delete a Course, Student and Grade

### Explanations

- There a 3 JSON files with Course, Student and Grade
- Course have an id, name and description
- Student have id, name, lastname, courseId (Assumption: 1 student only can be in one course)
- Grade have id, courseId, studentId, grade

### Steps for running GraphQLApi
- Clone repository <code>git clone https://github.com/m0ns3/graphql-api </code>
- Enter to graphql-api directory
- Run <code>npm install</code>
- Run project with: <code>npm run dev</code>
