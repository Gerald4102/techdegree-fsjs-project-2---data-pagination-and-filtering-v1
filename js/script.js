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
const linkList = document.querySelector('.link-list');
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(students) {
   let page = 5;
   if ( page === 5 ) {
      const firstStudent = (page * studentsPerPage) - studentsPerPage;
      for( let i=0; i<studentsPerPage; i++ ) {
         studentList.insertAdjacentHTML( 'beforeend', 
         `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${students[i+firstStudent].picture.large}" alt="Profile Picture">
                  <h3>${students[i+firstStudent].name.first} ${students[i].name.last}</h3>
                  <span class="email">${students[i+firstStudent].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${students[i+firstStudent].registered.date}</span>
               </div>
            </li>
         `);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(students) {
   const numberOfPages = Math.ceil(students.length /studentsPerPage);
   for ( let i=0; i<numberOfPages; i++ ) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i+1;
      if ( i===0 ) {
         button.className = 'active';
      };
      linkList.append(button);
   }
}


// Call functions
addPagination(data);
showPage(data);



