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
  /* Classes the exam was held for. Every class listed here shows up in the
     class filter on the results page, even when no candidate from that
     class appeared. */
  classes: ["6", "7", "8", "9", "10"],
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

/* Students — sample entries. Replace the names, roll numbers, class and marks
   with the real ones. To show a real photo, put the file in
   assets/students/ and set photo: "assets/students/roll-07.jpg".
   The three photos currently used are free stock placeholders.

   cls: the class the candidate studies in ("6", "7", "8", "9", "10").
   Write it always as a string. The classes offered by the filter come from
   EXAM.classes above; a class with no candidates (for example class 10)
   still appears in the dropdown and simply says nobody appeared from it.
   Ranking stays one common merit list across all classes. */
const STUDENTS = [
  { roll: "01", name: "Abir Chakraborty",  marks: 29, cls: "7", photo: "" },
  { roll: "02", name: "Amit Barman",       marks: 21, cls: "6", photo: "" },
  { roll: "03", name: "Arnab Chatterjee",  marks: 34, cls: "8", photo: "" },
  { roll: "04", name: "Bikash Sardar",     marks: 17, cls: "6", photo: "" },
  { roll: "05", name: "Debjit Mondal",     marks: 25, cls: "9", photo: "" },
  { roll: "06", name: "Sangita Das",       marks: 14, cls: "7", photo: "" },
  { roll: "07", name: "Ananya Das",        marks: 38, cls: "8", photo: "assets/students/topper-1.jpg" },
  { roll: "08", name: "Payel Mondal",      marks: 16, cls: "6", photo: "" },
  { roll: "09", name: "Ishita Banerjee",   marks: 32, cls: "9", photo: "" },
  { roll: "10", name: "Kaushik Barui",     marks: 23, cls: "8", photo: "" },
  { roll: "11", name: "Priyanka Roy",      marks: 33, cls: "9", photo: "" },
  { roll: "12", name: "Diya Pal",          marks: 30, cls: "7", photo: "" },
  { roll: "13", name: "Rupam Ghosh",       marks: 15, cls: "6", photo: "" },
  { roll: "14", name: "Trisha Dutta",      marks: 18, cls: "8", photo: "" },
  { roll: "15", name: "Mousumi Ghosh",     marks: 28, cls: "9", photo: "" },
  { roll: "16", name: "Srijita Paul",      marks: 22, cls: "7", photo: "" },
  { roll: "17", name: "Ritwik Ghosh",      marks: 37, cls: "8", photo: "assets/students/topper-2.jpg" },
  { roll: "18", name: "Nandini Roy",       marks: 20, cls: "6", photo: "" },
  { roll: "19", name: "Sourav Dey",        marks: 33, cls: "9", photo: "" },
  { roll: "20", name: "Puja Adhikari",     marks: 24, cls: "7", photo: "" },
  { roll: "21", name: "Rahul Sarkar",      marks: 31, cls: "8", photo: "" },
  { roll: "22", name: "Tanmoy Nandi",      marks: 27, cls: "6", photo: "" },
  { roll: "23", name: "Sneha Mondal",      marks: 35, cls: "9", photo: "assets/students/topper-3.jpg" },
  { roll: "24", name: "Riya Saha",         marks: 26, cls: "7", photo: "" },
  { roll: "25", name: "Suman Halder",      marks: 19, cls: "8", photo: "" },
  { roll: "26", name: "Arindam Sen",       marks: 12, cls: "6", photo: "" }
];
