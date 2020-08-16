const auth = "194c879ee3354f51bfca24dfb859cd08";

async function apiFunc() {
  const dataFetch = await fetch("https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=194c879ee3354f51bfca24dfb859cd08",
{
  method: "GET",
  headers: {
    Accept: "application/json",
    // Authorization: auth
  }
}
  );  
  const data = await dataFetch.json();
  console.log(data.results);
}

apiFunc()