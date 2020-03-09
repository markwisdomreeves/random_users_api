//global variables
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
let peopleArray = [];


//fetch data from API
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(res => res.json())
  .then(data => {
    peopleArray = [...data.results];
    generateCards(data.results);})


//function to generate HTML
function generateCards(employeeList) {
  for (i=0; i<employeeList.length; i++) {
    let card = `<div title="${i}" class="card">
                    <div title="${i}" class="card-img-container">
                        <img title="${i}" class="card-img" src="${employeeList[i].picture.large}" alt="profile picture">
                    </div>
                    <div title="${i}" class="card-info-container">
                        <h3 title="${i}" id="name" class="card-name cap">${employeeList[i].name.first} ${employeeList[i].name.last}</h3>
                        <p title="${i}" class="card-text">${employeeList[i].email}</p>
                        <p title="${i}" class="card-text cap">${employeeList[i].location.city}, ${employeeList[i].location.state}</p>
                    </div>
                </div>`
   galleryDiv.innerHTML += card;  
  }
}


//function to create modal window
function createModal(data) {
  let window = document.createElement('div');
  window.className = 'modal-container';
  window.innerHTML = 
                `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${data.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                        <p class="modal-text">${data.email}</p>
                        <p class="modal-text cap">${data.location.city}</p>
                        <hr>
                        <p class="modal-text">${data.phone}</p>
                        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                        <p class="modal-text">Birthday: ${data.dob.date.slice(5,7)}/${data.dob.date.slice(8,10)}/${data.dob.date.slice(0,4)}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>`;
  
  body.appendChild(window);
  window.style.display = '';
  
  
  //event handler to close modal window
  const closeBtn = document.getElementById('modal-close-btn');
  closeBtn.addEventListener('click', () => {
    window.remove()
  });


  //getting the prev and next buttons
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  let peopleArrayIndex = peopleArray.indexOf(data);

  if(data === peopleArray[0]){
    prevBtn.style.display = 'none';
  }
  if(data === peopleArray[11]){
    nextBtn.style.display = 'none';
  }

  prevBtn.addEventListener('click', () => {
    window.remove();
    createModal(peopleArray[(peopleArrayIndex - 1)]);
  })
  
  nextBtn.addEventListener('click', () => {
    window.remove();
    createModal(peopleArray[(peopleArrayIndex + 1)]);
  })
}


//event listener to display modal window
galleryDiv.addEventListener('click', (e) => {
  if (e.target.className.includes('card')) {
    createModal(peopleArray[e.target.title]);
  }
 });


//create search bar
const searchContainer = document.querySelector('div.search-container');
let searchBarHTML = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;
searchContainer.innerHTML = searchBarHTML;
const searchInput = document.getElementById('search-input');
const searchBar = document.querySelector('form');
const noUser = document.createElement('h2');
noUser.innerHTML = 'No user found.'
body.appendChild(noUser);
noUser.style.display = 'none';
searchBar.addEventListener('keyup', () => {
  let displayedCards = 0;
  for(i=0; i<peopleArray.length; i++){
    if(peopleArray[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || peopleArray[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())){
      document.querySelector(`[title="${i}"]`).style.display = '';
      displayedCards += 1;
    } else {
      document.querySelector(`[title="${i}"]`).style.display = 'none';
    }
  }

  if(displayedCards < 1){
    noUser.style.display = 'block';
  } else {
    noUser.style.display = 'none';
  }
});


//prevent search bar from submitting
searchBar.addEventListener('submit', (e) => {
  e.preventDefault();
});