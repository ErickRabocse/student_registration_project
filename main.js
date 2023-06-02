//CLASS STUDENT
class Student {
  constructor(name, surname, age, subjects) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.subjects = subjects;
  }
}

class Subjects_Grades {
  constructor(la, math, pe, sci, spa) {
    this.language_arts = la;
    this.maths = math;
    this.p_e = pe;
    this.science = sci;
    this.spanish = spa;
  }
}

//SELECTING USER REGISTRATION DATA
const enrollment_form = document.querySelector("#enrollment_form");
const student_name = document.querySelector("#student_name");
const student_surname = document.querySelector("#student_surname");
const student_age = document.querySelector("#student_age");
const enroll_btn = document.querySelector(".student_enrollment_btn");

//SELECTING USER GRADES DATA

enroll_btn.addEventListener("click", enroll);

//* * * * * Saving the students info in localStorage * * * * *
function enroll(e) {
  e.preventDefault();

  let students = localStorage.getItem("students");
  if (students === null) {
    studentsArray = [];
  } else {
    studentsArray = JSON.parse(students);
  }

  const student = new Student(
    student_name.value.toLowerCase().trim(),
    student_surname.value.toLowerCase().trim(),
    student_age.value
  );

  studentsArray.push(student);
  localStorage.setItem("students", JSON.stringify(studentsArray));
  enrollment_form.reset();
  showStudents();
}

//* * * * * Search a student by its name * * * * *
let student_search_btn = document.querySelector(".student_search_btn");
let student_search_input = document.querySelector(".student_search_input");
student_search_btn.addEventListener("click", search);

function search(e) {
  e.preventDefault();
  //ASSIGNNING PHOTO TO STUDENT
  const user_image = document.querySelector(".user_image");

  //GETTING USERS FROM LOCAL STORAGE
  let students = localStorage.getItem("students");
  if (students === null) {
    studentsArray = [];
  } else {
    studentsArray = JSON.parse(students);
  }
  //Accessing local storage
  const studentFound = studentsArray.find((student) => {
    let fullInputName = student_search_input.value.toLowerCase().trim();
    console.log(fullInputName);
    let fullName = `${student.name} ${student.surname}`;
    if (fullName === fullInputName) {
      user_image.innerHTML = `<img src="./images/${student.name}.jpeg" width="100px">`;

      // language_arts_grade.value = student.subjects.language_arts;
      // maths_grade.value = student.subjects.maths;
      // p_e_grade.value = student.subjects.p_e;
      // science_grade.value = student.subjects.science;
      // spanish_grade.value = student.subjects.spanish;

      return student;
    }
  });
  console.log(studentFound);
  let name = document.querySelector(".name_display");
  let surname = document.querySelector(".surname_display");
  let age = document.querySelector(".age_display");
  name.innerText =
    studentFound.name.slice(0, 1).toUpperCase() + studentFound.name.slice(1);
  surname.innerText =
    studentFound.surname.slice(0, 1).toUpperCase() +
    studentFound.surname.slice(1);
  age.innerText = `${studentFound.age} years old`;

  student_search_input.value = "";

  //SETTING INFO TO LOCAL STORAGE
  localStorage.setItem("students", JSON.stringify(studentsArray));
}

//* * * * * Assgning grades * * * * *
const language_arts_grade = document.querySelector("#language_arts");
const maths_grade = document.querySelector("#maths");
const p_e_grade = document.querySelector("#p_e");
const science_grade = document.querySelector("#science");
const spanish_grade = document.querySelector("#spanish");

const upload_grades_btn = document.querySelector(".upload_grades_btn");

upload_grades_btn.addEventListener("click", uploadGrades);

function uploadGrades(e) {
  e.preventDefault();
  //GETTING USERS FROM LOCAL STORAGE
  let students = localStorage.getItem("students");
  if (students === null) {
    studentsArray = [];
  } else {
    studentsArray = JSON.parse(students);
  }
  //Creating object for grades
  const studentGrades = new Subjects_Grades(
    parseInt(language_arts_grade.value),
    parseInt(maths_grade.value),
    parseInt(p_e_grade.value),
    parseInt(science_grade.value),
    parseInt(spanish_grade.value)
  );
  //Accessing local storage to add the object CLASSES as an attribute to the object STUDENT
  let name = document.querySelector(".name_display").innerText.toLowerCase();
  let surname = document
    .querySelector(".surname_display")
    .innerText.toLowerCase();
  studentsArray.find((student) => {
    if (student.name === name && student.surname === surname) {
      student.subjects = studentGrades;
    }
  });
  //Saving in localStorage all changes
  localStorage.setItem("students", JSON.stringify(studentsArray));
  //Cleaning grades form
  let student_grades_form = document.querySelector("#student_grades");
  student_grades_form.reset();
  showStudents();
}

//* * * * * Getting SS AVERAGE & storing them into an array* * * * *
const studentAverage = () => {
  //ACCESSING LOCAL STORAGE
  let students = localStorage.getItem("students");
  if (students === null) {
    studentsArray = [];
  } else {
    studentsArray = JSON.parse(students);
  }
  //RETURNNING THE AVERAGE FOR THE SS SELECTED
  const average_grades = studentsArray.map(function (student) {
    let total = 0;
    let clases_total = 0;
    if (student.subjects) {
      for (let classes in student.subjects) {
        clases_total++;
        total += student.subjects[classes];
      }
    }
    let result = total / clases_total;
    if (isNaN(result)) {
      return 0;
    }
    return result;
  });
  return average_grades;
};
studentAverage();

//* * * * * Display list of students * * * * *
const highest = document.querySelector("#highest");
const lowest = document.querySelector("#lowest");
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const id = document.querySelector("#id");

const ordered_list_element = document.querySelector(".list_of_students");

function showStudents() {
  //ACCESS LOCAL STORAGE
  let students = localStorage.getItem("students");
  if (students === null) {
    studentsArray = [];
  } else {
    studentsArray = JSON.parse(students);
  }

  //DISPLAY CONTENT ON SCREEN
  let html = "";
  studentsArray.forEach(function (element, index) {
    html += `
      <li>
        <span class="ss_id">${index + 1} </span>
        <span class="ss_name">${
          element.name.slice(0, 1).toUpperCase() +
          element.name.slice(1).toLowerCase()
        }</span>
        <span class="ss_surname">${
          element.surname.slice(0, 1).toUpperCase() +
          element.surname.slice(1).toLowerCase()
        }</span>
        <span class="ss_average">${studentAverage()[index]}</span>
      <li>
    `;
  });

  if (studentsArray.length !== 0) {
    ordered_list_element.innerHTML = html;
  } else {
    ordered_list_element.innerHTML = "No students registered";
  }
}

showStudents();
