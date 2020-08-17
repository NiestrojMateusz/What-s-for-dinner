// const auth = "194c879ee3354f51bfca24dfb859cd08";

// async function apiFunc() {
//   const dataFetch = await fetch("https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=194c879ee3354f51bfca24dfb859cd08",
// {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     // Authorization: auth
//   }
// }
//   );  
//   const data = await dataFetch.json();
//   console.log(data.results);
// }

// apiFunc()



const title = document.querySelector('.title');
const input = document.querySelector('.title-show');
document.querySelector('.search').addEventListener('click', animateSearch);

function animateSearch(e) {
  input.classList.add('input-active');
  document.querySelectorAll('.title-hide').forEach(span => {
    span.style.display = 'none';
  });
};

input.addEventListener('animationstart', () => {
  title.querySelector('.svg-inline--fa').classList.add('icon-active');
  input.focus();
})