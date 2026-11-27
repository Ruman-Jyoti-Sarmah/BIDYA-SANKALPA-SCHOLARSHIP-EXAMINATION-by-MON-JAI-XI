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

/* The merit list.

   cls: the class the candidate studies in ("6", "7", "8", "9", "10"),
   always written as a string. roll: the examination roll number as printed
   on the admit card; an empty string means the roll number was not
   collected, and the site shows "Roll No. not given". To show a photo, put
   the file in assets/students/ and set photo: "assets/students/roll-13.jpg";
   without a photo the site shows the candidate's initials.

   status: use "Rejected" when a candidature was rejected for not following
   the instructions, and "Cancelled" when it was cancelled. Such a candidate
   keeps a roll number but carries no marks, so the site lists them separately
   with their status and leaves them out of the ranking and the statistics.

   Equal marks share a rank. Ranking stays one common merit list across all
   classes. */
const STUDENTS = [
  /* top 10 */
  { roll: "13", name: "Debarchana Deka",            marks: 54, cls: "6", photo: "assets/students/topper-1.jpg" },
  { roll: "22", name: "Harsita Kalita",             marks: 47, cls: "7", photo: "assets/students/topper-2.jpg" },
  { roll: "19", name: "Prisha Kakati",              marks: 46, cls: "6", photo: "assets/students/topper-3.jpg" },
  { roll: "16", name: "Arnab Patgiri",              marks: 44, cls: "8", photo: "" },
  { roll: "08", name: "Sneha Priya Talukdar",        marks: 43, cls: "9", photo: "" },
  { roll: "26", name: "Mayukh Ranjan Patgiri",       marks: 43, cls: "6", photo: "" },
  { roll: "20", name: "Prakriti Rani Baro",          marks: 43, cls: "8", photo: "" },
  { roll: "19", name: "Harshil Pritam Kashyap",      marks: 42, cls: "7", photo: "" },
  { roll: "",   name: "Ishan Jyoti Roy",             marks: 42, cls: "7", photo: "" },
  { roll: "05", name: "Drishnanshu Deka",            marks: 41, cls: "7", photo: "" },
  { roll: "12", name: "Kushi Rabha",                 marks: 40, cls: "8", photo: "" },
  { roll: "02", name: "Hrishita Malakar",            marks: 40, cls: "8", photo: "" },

  /* class 6 */
  { roll: "24", name: "Rudraksha Talukdar",          marks: 23, cls: "6", photo: "" },
  { roll: "22", name: "Didriksha Das",               marks: 29, cls: "6", photo: "" },
  { roll: "09", name: "Jigyasha Sarma",              marks: 13, cls: "6", photo: "" },
  { roll: "33", name: "Juman Jyoti Kalita",          marks: 35, cls: "6", photo: "" },
  { roll: "14", name: "Uschajit Barman",             marks: 25, cls: "6", photo: "" },
  { roll: "30", name: "Ankur Mishra",                marks: 24, cls: "6", photo: "" },
  { roll: "32", name: "Pahi Das",                    marks: 20, cls: "6", photo: "" },
  { roll: "15", name: "Aprapali Basumatary",         marks: 31, cls: "6", photo: "" },
  { roll: "03", name: "Shibangi Rabha",              marks: 22, cls: "6", photo: "" },
  { roll: "16", name: "Dimpi Sarma",                 marks: 19, cls: "6", photo: "" },
  { roll: "37", name: "Ananya Deka",                 marks: 29, cls: "6", photo: "" },
  { roll: "39", name: "Meghaliw Sarma",              marks: 32, cls: "6", photo: "" },
  { roll: "12", name: "Ayushi Das",                  marks: 22, cls: "6", photo: "" },
  { roll: "25", name: "Dhritisman Choudhury",        marks: 33, cls: "6", photo: "" },
  { roll: "06", name: "Parchi Kashyap Das",          marks: 20, cls: "6", photo: "" },
  { roll: "38", name: "Jengsha Kashyap",             marks: 37, cls: "6", photo: "" },
  { roll: "04", name: "Mrigankee Das",               marks: 31, cls: "6", photo: "" },
  { roll: "36", name: "Dawar Kalita",                marks: 22, cls: "6", photo: "" },
  { roll: "07", name: "Dhritiranjan Das",            marks: 24, cls: "6", photo: "" },
  { roll: "29", name: "Pragyan Pratim Das",          marks: 11, cls: "6", photo: "" },

  /* class 7 */
  { roll: "16", name: "Hridisha Choudhury",          marks: 37, cls: "7", photo: "" },
  { roll: "15", name: "Hrishita Choudhury",          marks: 36, cls: "7", photo: "" },
    { roll: "05", name: "Priyam Malakar",              marks: 34, cls: "7", photo: "" },
  { roll: "31", name: "Priyanshu Koushik",           marks: 10, cls: "7", photo: "" },
  { roll: "02", name: "Siddhi Shristi Lahkar",       marks: 35, cls: "7", photo: "" },
  { roll: "04", name: "Jiya Deka",                   marks: 23, cls: "7", photo: "" },
  { roll: "32", name: "Jashaswee Priyam",            marks: 35, cls: "7", photo: "" },
  { roll: "06", name: "Sagar Pragya Dev Choudhury",  marks: 27, cls: "7", photo: "" },
  { roll: "10", name: "Ipshita J. Rajbongshi",       marks: 28, cls: "7", photo: "" },
  { roll: "13", name: "Devanshi Mahapatra",          marks: 36, cls: "7", photo: "" },
  { roll: "18", name: "Duke Nibir Kashyap",          marks: 13, cls: "7", photo: "" },
  { roll: "17", name: "Rishant Das",                 marks: 15, cls: "7", photo: "" },
  { roll: "25", name: "Ishita Talukdar",             marks: 22, cls: "7", photo: "" },
  { roll: "12", name: "Hiyashri Das",                marks: 30, cls: "7", photo: "" },
  { roll: "35", name: "Meghranjani Kalita",          marks: 25, cls: "7", photo: "" },
  { roll: "09", name: "Priyanashi Deka",             marks: 29, cls: "7", photo: "" },
  { roll: "27", name: "Anamika Boro",                marks: 16, cls: "7", photo: "" },
  { roll: "25", name: "Neha Das",                    marks: 15, cls: "7", photo: "" },
  { roll: "33", name: "Jina Uzir",                   marks: 27, cls: "7", photo: "" },
  { roll: "28", name: "Harleena Swargiary",          marks: 21, cls: "7", photo: "" },

  /* class 8 */
  { roll: "27", name: "Nikhilesh Barman",            marks: 18, cls: "8", photo: "" },
  { roll: "11", name: "Pallab Deka",                 marks: 39, cls: "8", photo: "" },
  { roll: "37", name: "Hriday Pratim Sarma",         marks: 22, cls: "8", photo: "" },
  { roll: "",   name: "Suraj Das",                   marks: 27, cls: "8", photo: "" },
  { roll: "15", name: "Ridipta Kashyap",             marks: 28, cls: "8", photo: "" },
  { roll: "26", name: "Mumi Malakar",                marks: 37, cls: "8", photo: "" },
  { roll: "22", name: "Chayan Das",                  marks: 30, cls: "8", photo: "" },
  { roll: "31", name: "Baritone Tahbilder",          marks: 20, cls: "8", photo: "" },
  { roll: "10", name: "Dibyanshi Patgiri",           marks: 37, cls: "8", photo: "" },
  { roll: "38", name: "Asish Sarma",                 marks: 37, cls: "8", photo: "" },
  { roll: "01", name: "Arnab Malakar",               marks: 37, cls: "8", photo: "" },
  { roll: "23", name: "Abhilasha Talukdar",          marks: 24, cls: "8", photo: "" },
  { roll: "08", name: "Madhurjya Sarma",             marks: 0,  cls: "8", photo: "" },
  { roll: "",   name: "Pragyan Daimary",             marks: 0,  cls: "8", photo: "" },
  { roll: "28", name: "Dhritiman Deka",              marks: 0,  cls: "8", photo: "" },
  { roll: "35", name: "Hrishika Talukdar",           marks: 35, cls: "8", photo: "" },
  { roll: "24", name: "Parthiv Diganta",             marks: 19, cls: "8", photo: "" },
  { roll: "32", name: "Hrishi Deka",                 marks: 35, cls: "8", photo: "" },
  { roll: "14", name: "Neha Rabi Kalita",            marks: 28, cls: "8", photo: "" },
  { roll: "06", name: "Minipangini Malakar",         marks: 30, cls: "8", photo: "" },
  { roll: "11", name: "Anurag Pathak",               marks: 10, cls: "8", photo: "" },
  { roll: "35", name: "Suman Das",                   marks: 12, cls: "8", photo: "" },
  { roll: "09", name: "Bhagawati Roy",               marks: 11, cls: "8", photo: "" },
  { roll: "14", name: "Rausikhar",                   marks: 20, cls: "8", photo: "" },
  { roll: "05", name: "Rimpi Das",                   marks: 14, cls: "8", photo: "" },
  { roll: "29", name: "Jigyasha Das",                marks: 28, cls: "8", photo: "" },
  { roll: "19", name: "Bhushanjyoti Sarma",          marks: 32, cls: "8", photo: "" },
  { roll: "33", name: "Riya Sultana",                marks: 30, cls: "8", photo: "" },
  { roll: "34", name: "Meghna Das",                  marks: 20, cls: "8", photo: "" },

  /* class 9 */
  { roll: "02", name: "Prachurjya Patgiri",          marks: 38, cls: "9", photo: "" },
  { roll: "22", name: "Hirak Jyoti Bayan",           marks: 30, cls: "9", photo: "" },
  { roll: "04", name: "Chayasmita Talukdar",         marks: 14, cls: "9", photo: "" },
  { roll: "05", name: "Nishan Das",                  marks: 19, cls: "9", photo: "" },
  { roll: "11", name: "Akanxa Parashar",             marks: 23, cls: "9", photo: "" },
  { roll: "12", name: "Jitjan Kashyav",              marks: 9,  cls: "9", photo: "" },
  { roll: "10", name: "Arnabjyoti Das",              marks: 7,  cls: "9", photo: "" },
  { roll: "20", name: "Nimisha Kalita",              marks: 11, cls: "9", photo: "" },
  { roll: "28", name: "Madhusmita Roy",              marks: 21, cls: "9", photo: "" },
  { roll: "06", name: "Granthik Talukdar",           marks: 11, cls: "9", photo: "" },
  { roll: "24", name: "Dibij Kalita",                marks: 6,  cls: "9", photo: "" },
  { roll: "19", name: "Imran Hoque",                 marks: 18, cls: "9", photo: "" },
  { roll: "17", name: "Debasish Mishra Bhagawati",   marks: 11, cls: "9", photo: "" },
  { roll: "27", name: "Angaj Pratim Roy",            marks: 9,  cls: "9", photo: "" },
  { roll: "25", name: "Nikita Malakar",              marks: 17, cls: "9", photo: "" },
  { roll: "18", name: "Chayashree Kakati",           marks: 8,  cls: "9", photo: "" },
  { roll: "01", name: "Anmol Kakati",                marks: 2,  cls: "9", photo: "" },
  { roll: "15", name: "Abhilash Kashyap",            marks: 18, cls: "9", photo: "" },
  { roll: "21", name: "Angkita Roy",                 marks: 21, cls: "9", photo: "" },
  { roll: "09", name: "Diyasmita Patowary",          marks: 11, cls: "9", photo: "" },
  { roll: "07", name: "Ruhi Choudhury",              marks: 2,  cls: "9", photo: "" },
  { roll: "13", name: "Adhrit Talukdar",             marks: 7,  cls: "9", photo: "" },
  { roll: "03", name: "Susmita Das",                 marks: 10, cls: "9", photo: "" },
  { roll: "23", name: "Eisha Das",                   marks: 25, cls: "9", photo: "" },
  { roll: "14", name: "Udipta Talukdar",             marks: 3,  cls: "9", photo: "" },

  /* rejected — for not following the instructions */
  { roll: "29", name: "Sumit Roy",                   marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "20", name: "Rehan Ahmed",                 marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "30", name: "Dikshita Kalita",             marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "34", name: "Sagar Talukdar",              marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "15", name: "Mayurta Kashyap",             marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "11", name: "Kabyam Kakoti",               marks: 0,  cls: "7", status: "Rejected", photo: "" },
  { roll: "01", name: "Shreyangana Mahanta",         marks: 0,  cls: "7", status: "Rejected", photo: "" },

  /* cancelled */
  { roll: "02", name: "Hardik Roy",                  marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "31", name: "Bibhan K Das",                marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "17", name: "Jeuse Das",                   marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "08", name: "Rohan Malakar",               marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "18", name: "David Das",                   marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "28", name: "Harshit Talukdar",            marks: 0,  cls: "6", status: "Cancelled", photo: "" },
  { roll: "16", name: "Supratim Sing Ramchiary",     marks: 0,  cls: "9", status: "Cancelled", photo: "" }
];
