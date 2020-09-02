import { data } from './data.js';
const title = document.querySelector('.title');
const searchInput = document.querySelector('.title-show');
const searchBtn = document.querySelector('.search');
const revealButton = document.querySelector('.reveal-input');
const recipesContainer = document.querySelector('.recipes-container');
const hamburgerBtn = document.querySelector('.hamburger');
const library = document.querySelector('.library-recipes');

let recipesStorage = JSON.parse(localStorage.getItem('savedRecipes')) || [];
let libraryIndex = 0;
const test = {};


// Add recipe to library from local storage

  if(recipesStorage) {
    recipesStorage.forEach((recipeObject) => {
      addRecipe(recipeObject);
    })
  }

// Reveal searching input

function animateSearch(e) {
  searchInput.classList.add('input-active');
  document.querySelectorAll('.title-hide').forEach(span => {
    span.style.display = 'none';
  });
     revealButton.style.display = 'none';
     recipesContainer.style.display = 'flex';
};

// API download

const apiKey = "&apiKey=194c879ee3354f51bfca24dfb859cd08";
let recipesId= [];


async function getRecipesId() {
  // Add loading animation

  const loadIcon = document.createElement('i');
  loadIcon.classList.add('fas','fa-spinner');
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
  recipesId = [];
  recipes.forEach(recipe => {
    let id = recipe.id;
    recipesId.push(id);
  });
  // searchValue = '';
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
  recipesContainer.innerHTML = '';
  getRecipesId();
  
}

function recipeView(infoArray) {
  
  recipesContainer.innerHTML = '';
  
  infoArray.forEach((info,index) => {
    const recipeSection = document.createElement('section');
    recipeSection.classList.add('recipe');
    recipesContainer.appendChild(recipeSection);

    const recipeImg = document.createElement('img');
    recipeImg.classList.add('recipe-img');
    recipeImg.style.content = `url(${info.image})`
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
    link.innerHTML = `<i class="fas fa-link"></i> Go to recipe`;

    const transfer = document.createElement('button');
    // transfer.classList.add('transfer-recipe');
    if(recipesStorage.length > 0) {
      let indexOfrecipe = recipesStorage.length + index;
      transfer.classList.add('transfer-recipe',  `recipe${indexOfrecipe}`);
    } else {
      transfer.classList.add('transfer-recipe', `recipe${index}`);
    }
    transfer.innerHTML = '<i class="fas fa-plus"></i> Add to library';
    recipeLink.appendChild(transfer);
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
      fact.style.lineHeight = '1';
      fact.innerHTML = `<span class="score" style="font-weight:bold;font-size:1.8rem">${nutritionFacts[4]}</span> Health Score `;
      recipeNutrition.appendChild(fact);
    };
  });
  
  
  const buttonsToSave = document.querySelectorAll('.transfer-recipe');
  buttonsToSave.forEach((btn, index) => {
    let indexOfRecipe;
    if(recipesStorage.length > 0) {
      indexOfRecipe = recipesStorage.length + index;
    } else {
      indexOfRecipe = index;
    }
    btn.addEventListener('click', e => {
      let buttonTarget = e.target;
      if(buttonTarget.classList.contains(`recipe${indexOfRecipe}`)) {
        addRecipe(infoArray[index]);
        addToStorage(infoArray[index].image, infoArray[index].title,infoArray[index].sourceUrl )
    }
    })
    searchInput.value = '';
})
};


function addRecipe(recipeObject) {
  
  const savedRecipe = document.createElement('div');
  savedRecipe.classList.add('saved-recipe');
  if(!recipesStorage) {
    savedRecipe.setAttribute('data-index', `${libraryIndex}`);
  } else {
    libraryIndex++;
    savedRecipe.setAttribute('data-index', `${libraryIndex}`);
  }
  library.appendChild(savedRecipe);
  const savedImg = document.createElement('img');
  savedImg.classList.add('saved-img');
  savedImg.setAttribute('src', recipeObject.image);
  savedRecipe.appendChild(savedImg);
  const savedTitle = document.createElement('p');
  savedTitle.classList.add('saved-title');
  savedTitle.innerText = recipeObject.title;
  savedRecipe.appendChild(savedTitle);
  const savedLink = document.createElement('a');
  savedLink.classList.add('saved-link');
  savedLink.setAttribute('href', recipeObject.sourceUrl);
  savedLink.setAttribute('target', '_blank');
  savedLink.innerHTML = `<i class='fas fa-arrow-right'></i>`;
  savedRecipe.appendChild(savedLink);
  const deleteSaved = document.createElement('button');
  deleteSaved.classList.add('delete-saved');
  deleteSaved.innerHTML = "<i class='fas fa-trash'></i>";
  savedRecipe.appendChild(deleteSaved);
  deleteSaved.addEventListener('click', e => {
    const recipeContainer = e.target.parentElement.parentElement.parentElement;
    let containerIndex = recipeContainer.getAttribute('data-index');
    let storageIndex = containerIndex - 1;
    const newStorage = recipesStorage.filter((recipe, index) => {
      return index !== storageIndex;
    });
    recipesStorage = newStorage;
    localStorage.setItem('savedRecipes', JSON.stringify(recipesStorage));
    library.removeChild(recipeContainer);
  })
}

function addToStorage(image, title, link) {
  let recipeSaved = {
    image : image,
    title : title,
    sourceUrl : link,
  }
  recipesStorage.push(recipeSaved);
  localStorage.setItem('savedRecipes', JSON.stringify(recipesStorage));
  const storage = JSON.parse(localStorage.getItem('savedRecipes'));
}

function libraryReveal() {
  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');
  line1.classList.toggle('line1-active');
  line2.classList.toggle('line2-active');
  const library = document.querySelector('.library');
  library.classList.toggle('library-active');
}

// recipeView([data]);

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
hamburgerBtn.addEventListener('click', libraryReveal)

export default test;