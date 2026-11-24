/* ------------------------------------------------------------------
   BIDYA SANKALPA SCHOLARSHIP EXAMINATION — site data
   Edit only this file to change names, roll numbers, marks or photos.
   ------------------------------------------------------------------ */

const EXAM = {
  title: "BIDYA SANKALPA SCHOLARSHIP EXAMINATION",
  presentedBy: "by MON JAI XI",
  school: "PATHSALA PUBLIC SCHOOL",
  session: "2026-27",
  totalQuestions: 39,
  marksPerQuestion: 1,
  totalMarks: 39,
  resultLabel: "RESULTS FOR PATHSALA PUBLIC SCHOOL STUDENTS (2026-27)",
  answerLabel: "Answers Sheet for PATHSALA PUBLIC SCHOOL (2026-27)",
  /* Brand assets */
  logo: "assets/brand/logo.jpeg",
  heroImage: "assets/img/hero.jpg",
  monLogo: "assets/brand/mon-jai-xi.jpeg",
  heroImageAlt: "Students of Pathsala Public School in their school uniform"
};

/* Correct option for Q1 ... Q39 */
const ANSWER_KEY = [
  "B", "C", "C", "B", "B", "A", "A", "A", "D", "C",
  "B", "D", "C", "C", "B", "A", "B", "A", "A", "A",
  "C", "A", "C", "A", "C", "A", "A", "A", "B", "B",
  "B", "A", "A", "B", "A", "A", "A", "A", "A"
];

/* Students — sample entries. Replace the names, roll numbers and marks
   with the real ones. To show a real photo, put the file in
   assets/students/ and set photo: "assets/students/roll-07.jpg".
   The three photos currently used are free stock placeholders. */
const STUDENTS = [
  { roll: "01", name: "Abir Chakraborty",  marks: 29, photo: "" },
  { roll: "02", name: "Amit Barman",       marks: 21, photo: "" },
  { roll: "03", name: "Arnab Chatterjee",  marks: 34, photo: "" },
  { roll: "04", name: "Bikash Sardar",     marks: 17, photo: "" },
  { roll: "05", name: "Debjit Mondal",     marks: 25, photo: "" },
  { roll: "06", name: "Sangita Das",       marks: 14, photo: "" },
  { roll: "07", name: "Ananya Das",        marks: 38, photo: "assets/students/topper-1.jpg" },
  { roll: "08", name: "Payel Mondal",      marks: 16, photo: "" },
  { roll: "09", name: "Ishita Banerjee",   marks: 32, photo: "" },
  { roll: "10", name: "Kaushik Barui",     marks: 23, photo: "" },
  { roll: "11", name: "Priyanka Roy",      marks: 33, photo: "" },
  { roll: "12", name: "Diya Pal",          marks: 30, photo: "" },
  { roll: "13", name: "Rupam Ghosh",       marks: 15, photo: "" },
  { roll: "14", name: "Trisha Dutta",      marks: 18, photo: "" },
  { roll: "15", name: "Mousumi Ghosh",     marks: 28, photo: "" },
  { roll: "16", name: "Srijita Paul",      marks: 22, photo: "" },
  { roll: "17", name: "Ritwik Ghosh",      marks: 37, photo: "assets/students/topper-2.jpg" },
  { roll: "18", name: "Nandini Roy",       marks: 20, photo: "" },
  { roll: "19", name: "Sourav Dey",        marks: 33, photo: "" },
  { roll: "20", name: "Puja Adhikari",     marks: 24, photo: "" },
  { roll: "21", name: "Rahul Sarkar",      marks: 31, photo: "" },
  { roll: "22", name: "Tanmoy Nandi",      marks: 27, photo: "" },
  { roll: "23", name: "Sneha Mondal",      marks: 35, photo: "assets/students/topper-3.jpg" },
  { roll: "24", name: "Riya Saha",         marks: 26, photo: "" },
  { roll: "25", name: "Suman Halder",      marks: 19, photo: "" },
  { roll: "26", name: "Arindam Sen",       marks: 12, photo: "" }
];
