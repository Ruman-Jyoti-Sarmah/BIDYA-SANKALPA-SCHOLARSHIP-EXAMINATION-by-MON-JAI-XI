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
  /* the paper was evaluated out of 100 marks */
  totalMarks: 100,
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

/* Top 10 of the merit list, in order.

   cls: the class the candidate studies in ("6", "7", "8", "9", "10"),
   always written as a string. Rolls are sequential placeholders until the
   real examination roll numbers come in. To show a photo, put the file in
   assets/students/ and set photo: "assets/students/roll-01.jpg"; without a
   photo the site shows the candidate's initials.

   Equal marks share a rank, so the two candidates on 40 marks both stand
   at rank 10. The classes offered by the filter come from EXAM.classes
   above; a class with no candidates (for example class 10) still appears
   in the dropdown and simply says nobody appeared from it. Ranking stays
   one common merit list across all classes. */
const STUDENTS = [
  { roll: "01", name: "Debarchana Eka",         marks: 54, cls: "6", photo: "" },
  { roll: "02", name: "Harshita Kalita",        marks: 47, cls: "7", photo: "" },
  { roll: "03", name: "Prisha Kakati",          marks: 46, cls: "6", photo: "" },
  { roll: "04", name: "Arnab Patgiri",          marks: 44, cls: "8", photo: "" },
  { roll: "05", name: "Sneha Priya Talukdar",   marks: 43, cls: "9", photo: "" },
  { roll: "06", name: "Mayukh Ranjan Patgiri",  marks: 43, cls: "6", photo: "" },
  { roll: "07", name: "Prakriti Rani Boro",     marks: 43, cls: "8", photo: "" },
  { roll: "08", name: "Harshil Pratim Kashyap", marks: 42, cls: "7", photo: "" },
  { roll: "09", name: "Ishan Jyoti Roy",        marks: 42, cls: "7", photo: "" },
  { roll: "10", name: "Khushi Rabha",           marks: 40, cls: "8", photo: "" },
  { roll: "11", name: "Hrishita Malakar",       marks: 40, cls: "8", photo: "" }
];
