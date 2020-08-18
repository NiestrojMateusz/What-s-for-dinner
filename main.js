const title = document.querySelector('.title');
const searchInput = document.querySelector('.title-show');
const searchIcon = document.querySelector('.fa-search');
const searchBtn = document.querySelector('.search');
const revealButton = document.querySelector('.reveal-input');

// Reveal searching input

function animateSearch(e) {
  searchInput.classList.add('input-active');
  document.querySelectorAll('.title-hide').forEach(span => {
    span.style.display = 'none';
  });
  revealButton.classList.add('search-hide');
};

// API download

const apiKey = "&apiKey=194c879ee3354f51bfca24dfb859cd08";

async function apiFunc() {
  const searchValue = searchInput.value;
  const dataFetch = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}${apiKey}`,
{
  method: "GET",
  headers: {
    Accept: "application/json",
  }
}
  );  
  const data = await dataFetch.json();
  console.log(data.results);
};



// Event listeners and invokes

revealButton.addEventListener('click', animateSearch);
searchInput.addEventListener('animationstart', () => {
 searchBtn.classList.add('icon-active');
  searchInput.focus();
});
searchBtn.addEventListener('click', apiFunc);
