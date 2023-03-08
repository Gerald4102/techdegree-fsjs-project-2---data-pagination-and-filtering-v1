/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const studentsPerPage = 9;
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for( let i=0; i<list.length; i++ ) {
      if( i >= startIndex && i < endIndex ) {
         studentList.insertAdjacentHTML( 'beforeend', 
         `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i ].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
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
function addPagination(list) {
   const studentsPerPage = 9;
   const numberOfPages = Math.ceil(list.length /studentsPerPage);   
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for ( let i=0; i<numberOfPages; i++ ) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i+1;
      li.append(button)
      linkList.append(li);
   }
   linkList.querySelector('button').className = 'active';
   linkList.addEventListener('click', (event)=> {
      if(event.target.type === 'button') {
         const buttons = linkList.querySelectorAll('button');
         for ( let i=0; i<buttons.length; i++ ) {
            buttons[i].className = '';
         }
         event.target.className = 'active';
         showPage(list, event.target.textContent);
      }
   });
}


const header = document.querySelector('header');

/*
Creates the search bar to be displayed in the header for the exceeds exectations requirements.
*/
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

/*
Compares the text input from the search bar against the names in data.js and displays the results
*/
function filterStudents(students, searchText) {
   let searchResults = [];
   for ( let i=0; i<data.length; i++ ) {
      let studentNames = `${students[i].name.first.toLowerCase()} ${students[i].name.last.toLowerCase()}`;
      if(studentNames.includes(searchText)) {
         searchResults.push(students[i]);
      };
   }

   if( searchResults.length === 0 ) {
      document.querySelector('.student-list').innerHTML = `<p>No results found</p>`;
      document.querySelector('.link-list').innerHTML = ''; 
   } else {
      addPagination(searchResults);
      showPage(searchResults,1);
   }

   const searchFilter = header.querySelector('input');
   const searchBtn = header.querySelector('button');

   searchFilter.addEventListener('keyup', (event)=> {
      filterStudents(data, event.target.value.toLowerCase());
   });
   searchBtn.addEventListener('click', (event)=> {
      filterStudents(data, searchFilter.value.toLowerCase());
   });
}



// Call functions
showFilter();
showPage(data,1);
addPagination(data);
filterStudents(data, '');
