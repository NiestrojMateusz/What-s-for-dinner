import { data } from './data.js';
const title = document.querySelector('.title');
const searchInput = document.querySelector('.title-show');
const searchIcon = document.querySelector('.fa-search');
const searchBtn = document.querySelector('.search');
const revealButton = document.querySelector('.reveal-input');
const recipesContainer = document.querySelector('.recipes-container');

const test = {}

// Reveal searching input

function animateSearch(e) {
  searchInput.classList.add('input-active');
  document.querySelectorAll('.title-hide').forEach(span => {
    span.style.display = 'none';
  });
  revealButton.style.display = 'none';
};

// API download

const apiKey = "&apiKey=194c879ee3354f51bfca24dfb859cd08";
let recipesId= [];

async function apiFunc() {
  // Add loading animation

  const loadIcon = document.createElement('i');
  loadIcon.classList.add('fas', 'fa-spinner');
  loadIcon.classList.toggle('loading-active');
  recipesContainer.appendChild(loadIcon);

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
  const recipes = data.results;

  // Get recipe ID
 
  recipes.forEach(recipe => {
    let id = recipe.id;
    recipesId.push(id);
  });

  getRecipesInfo(recipesId);
};

// Get recipe info

const getRecipesInfo = async arrayId => {
  let recipesInfo = [];

  for(let i = 0; i < arrayId.length; i++) {
    const id = arrayId[i];
    const infoFetch = await fetch(`https://api.spoonacular.com/recipes/${id}/information?${apiKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      }
    }
      );  
      const data = await infoFetch.json();
      recipesInfo.push(data);
  }
  recipeView(recipesInfo);
  }
  
// Changing view to searched recipes

function revealRecpies() {
  searchInput.value = '';
  recipesContainer.innerHTML = '';
  // apiFunc();
}

function recipeView(infoArray) {
  
  recipesContainer.innerHTML = '';
  
  
  infoArray.forEach(info => {
    const recipeSection = document.createElement('section');
    recipeSection.classList.add('recipe');
    recipesContainer.appendChild(recipeSection);

    const recipeImg = document.createElement('div');
    recipeImg.classList.add('recipe-img');
    let url = info.image;
    recipeImg.style.backgroundImage = `url("${url}")`;
    recipeSection.appendChild(recipeImg);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-info');
    recipeSection.appendChild(recipeInfo);

    const recipeTitle = document.createElement('h3');
    recipeTitle.classList.add('recipe-title');
    let title = info.title;
    recipeTitle.innerText = title;
    recipeInfo.appendChild(recipeTitle);

    const recipeTime = document.createElement('div');
    recipeTime.classList.add('recipe-time');
    recipeInfo.appendChild(recipeTime);

    const time = document.createElement('h4');
    time.classList.add('time');
    let minutes = info.readyInMinutes;
    time.innerHTML = `<i class='fas fa-clock'></i> ${minutes} min`;
    recipeTime.appendChild(time);

    const money = document.createElement('span');
    let price = info.cheap;
    money.innerHTML = `<i class="fas fa-dollar-sign"></i> ${price? 'Cheap':'Expensive'}`;
    recipeTime.appendChild(money);

    const recipeLink = document.createElement('div');
    recipeLink.classList.add('recipe-link');
    const link = document.createElement('a');
    recipeLink.appendChild(link);
    const hrefValue = info.sourceUrl;
    link.setAttribute('href',hrefValue);
    link.setAttribute('target', "_blank");
    link.innerHTML = `<i class="fas fa-link"></i> Go to recipe`
    recipeInfo.appendChild(recipeLink);

    const recipeNutrition = document.createElement('div');
    recipeNutrition.classList.add('recipe-nutrition');
    recipeSection.appendChild(recipeNutrition);

    const nutritionFacts = [info.dairyFree, info.glutenFree, info.vegan, info.veryHealthy, info.healthScore];
    if(!nutritionFacts[0]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-cheese"></i> Dairy Free <span class='false-fact'></span>`;
      recipeNutrition.appendChild(fact);
    } else if(nutritionFacts[0]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-cheese"></i> Dairy Free`;
      recipeNutrition.appendChild(fact);
    };

    if(!nutritionFacts[1]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-bread-slice"></i> Gluten Free <span class='false-fact'></span>`;
      recipeNutrition.appendChild(fact);
    } else if(nutritionFacts[1]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-bread-slice"></i> Gluten Free`;
      recipeNutrition.appendChild(fact);
    };

    if(!nutritionFacts[2]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-seedling"></i> Vegan <span class='false-fact'></span>`;
      recipeNutrition.appendChild(fact);
    } else if(nutritionFacts[2]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-seedling"></i> Vegan`;
      recipeNutrition.appendChild(fact);
    };

    if(!nutritionFacts[3]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-heartbeat"></i> Healthy <span class='false-fact'></span>`;
      recipeNutrition.appendChild(fact);
    } else if(nutritionFacts[3]) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.innerHTML = `<i class="fas fa-heartbeat"></i> Healthy`;
      recipeNutrition.appendChild(fact);
    };

    if(nutritionFacts[4] >= 0) {
      const fact = document.createElement('span');
      fact.classList.add('nutrition-fact');
      fact.style.fontSize = '1.5rem';
      fact.style.marginTop = '-10px';
      fact.innerHTML = `<span class="score" style="font-weight:bold;font-size:1.8rem">${nutritionFacts[4]}</span> Health Score `;
      recipeNutrition.appendChild(fact);
    };
  });
}

recipeView([data]);

// Event listeners and invokes

revealButton.addEventListener('click', animateSearch);
searchInput.addEventListener('keypress', e => {
  if(e.keyCode === 13) {
    revealRecpies();
  }
});
searchInput.addEventListener('animationstart', () => {
 searchBtn.classList.add('icon-active');
  searchInput.focus();
});
searchBtn.addEventListener('click', revealRecpies);

export default test;