
const URL = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";


const studentTable = document.querySelector('.table-body');
const sortNameAscBtn = document.querySelector('#sort-name-asc');
const sortNameDescBtn = document.querySelector('#sort-name-desc');
const sortMarksBtn = document.querySelector('#sort-marks');
const sortPassingBtn = document.querySelector('#sort-passing');
const sortClassBtn = document.querySelector('#sort-class');
const sortGenderBtn = document.querySelector('#sort-gender');

async function fetchStudents() {
    try {
      let response = await fetch(URL);
      let data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  (async function() {
    let students = await fetchStudents();
    let studentobj = [...students];

function renderStudents(){

  studentTable.innerHTML = '';
  studentobj.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td class="avatar-container"><img src="${student.img_src}" alt="avatar" class="avatar"> ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passed" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    studentTable.appendChild(row);
  });
};

const searchInput = document.querySelector('.search-form input[type="search"]');
const searchButton = document.querySelector('.search-form input[type="submit"]');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const searchResults = students.filter(student => {
    return (
      student.first_name.toLowerCase().includes(searchTerm) ||
      student.last_name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });
  studentobj = searchResults;
  renderStudents();
});

sortNameAscBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => a.first_name.localeCompare(b.first_name));
  renderStudents();
});


sortNameDescBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => b.first_name.localeCompare(a.first_name));
  renderStudents();
});


sortMarksBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => b.marks - a.marks);
  renderStudents();
});


sortPassingBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => b.passing - a.passing);
  renderStudents();
});


sortClassBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => a.class - b.class);
  renderStudents();
});


sortGenderBtn.addEventListener('click', () => {
  studentobj.sort((a, b) => a.gender.localeCompare(b.gender));
  renderStudents();
});


renderStudents();
  })();




