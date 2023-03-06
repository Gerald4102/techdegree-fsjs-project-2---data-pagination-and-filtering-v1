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
const numberOfPages = Math.ceil(data.length /studentsPerPage);
const linkList = document.querySelector('.link-list');
let activePage = 1;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(students) {
   const firstStudent = (activePage * studentsPerPage) - studentsPerPage;
   let lastStudent = 0;
   if ( activePage*studentsPerPage < data.length ) {
      lastStudent = activePage*studentsPerPage;
   } else {
      lastStudent = data.length;
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
      showPage(data);
   }
});
