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



const forkIcon = document.querySelector('.fa-utensils');
document.querySelector('.search').addEventListener('click', animateSearch);

function animateSearch(e) {
  console.log('ok')
  document.querySelector('.title-show').style.animation = 'letter 3s ease-in-out alternate';
  document.querySelector('.title-show').style.animationFillMode = 'forwards';
  document.querySelectorAll('.title-hide').forEach(span => {
    span.style.display = 'none';
    // span.style.animation = 'title 3s ease-in-out';
    // span.style.animationFillMode = 'forwards';
  })
}