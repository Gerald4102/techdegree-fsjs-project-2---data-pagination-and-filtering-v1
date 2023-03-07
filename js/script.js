/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentList = document.querySelector('.student-list');
const studentsPerPage = 9;
let numberOfPages = Math.ceil(data.length /studentsPerPage);
const linkList = document.querySelector('.link-list');
let activePage = 1;
let displayData = data;

const header = document.querySelector('header');

function showFilter () {
   const label = document.createElement('label');
   const span = document.createElement('span');
   const input = document.createElement('input');
   const button = document.createElement('button');
   const img = document.createElement('img');

   // setting the label's for attribute as shown here: https://stackoverflow.com/questions/15750290/setting-the-html-label-for-attribute-in-javascript
   label.htmlFor = 'search';
   label.className = 'student-search';
   span.textContent = 'Search by name';
   input.id = 'search';
   input.placeholder = 'Search by name...';
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';

   button.append(img);
   label.append(span);
   label.append(input);
   label.append(button);
   header.append(label);
}

function filterStudents(students, searchText) {
   let searchResults = [];
   for ( let i=0; i<data.length; i++ ) {
      let studentNames = `${students[i].name.first.toLowerCase()} ${students[i].name.last.toLowerCase()}`;
      if(studentNames.includes(searchText)) {
         searchResults.push(students[i]);
      };
   }
   linkList.innerHTML = '';
   studentList.innerHTML = '';
   activePage = 1
   numberOfPages = Math.ceil(searchResults.length /studentsPerPage);
   displayData = searchResults;
   addPagination(searchResults);
   showPage(searchResults);
}
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(students) {
   const firstStudent = (activePage * studentsPerPage) - studentsPerPage;
   let lastStudent = 0;
   if ( activePage*studentsPerPage < students.length ) {
      lastStudent = activePage*studentsPerPage;
   } else {
      lastStudent = students.length;
   }
   for( let i=firstStudent; i<lastStudent; i++ ) {
      studentList.insertAdjacentHTML( 'beforeend', 
      `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${students[i].picture.large}" alt="Profile Picture">
               <h3>${students[i].name.first} ${students[i ].name.last}</h3>
               <span class="email">${students[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${students[i].registered.date}</span>
            </div>
         </li>
      `);
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(students) {
   for ( let i=0; i<numberOfPages; i++ ) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i+1;
      if ( i===0 ) {
         button.className = 'active';
      };
      li.append(button)
      linkList.append(li);
   }
}

// Call functions
showFilter();
addPagination(data);
showPage(data);

linkList.addEventListener('click', (event)=> {
   if(event.target.type === 'button') {
      activePage = event.target.textContent;
      const buttons = linkList.querySelectorAll('button');
      for ( let i=0; i<numberOfPages; i++ ) {
         buttons[i].className = '';
         if ( i === activePage-1 ) {
            buttons[i].className = 'active';
         }
      }
      studentList.innerHTML = '';
      showPage(displayData);
   }
});

const searchFilter = header.querySelector('input');
const searchBtn = header.querySelector('button');

searchFilter.addEventListener('keyup', (event)=> {
   filterStudents(data, event.target.value.toLowerCase());
});