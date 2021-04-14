const mealsEL = document.getElementById("meals");
const favMealsList = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
favMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const randomMeal = await resp.json();
  const respData = randomMeal.meals[0];

  addMeal(respData);
}

function addMeal(mealData) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `

            <div class="meal-header">
                <span class="random"> Recipe of the day </span>
                <img src="${mealData.strMealThumb}" alt="">
            </div> 

            <div class="meal-body">
                <h4> ${mealData.strMeal}</h4>
                <button class="fav-btn">
                    <i class="fas fa-heart"></i>
                </button>
            </div>

    `;

  meals.appendChild(meal);

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealtoLS(mealData.idMeal);
      btn.classList.add("active");
    }

    // favMealsList.innerHTML = "";
    favMeals();
  });
}

// Local Storage
function addMealtoLS(id_of_meal) {
  const mealIds = getMealFromLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, id_of_meal]));
}

function getMealFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function removeMealFromLS(mealId) {
  const mealIds = getMealFromLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id != mealId))
  );
}

// *******************************************

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function favMeals() {
  favMealsList.innerHTML = "";
  const mealIds = getMealFromLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealid = mealIds[i];

    meal = await getMealById(mealid);

    addMealToFavListDom(meal);
  }
}

async function addMealToFavListDom(mealData) {
  const favMeals = document.createElement("li");
  favMeals.innerHTML = `

        <img src="${mealData.strMealThumb}" alt="">
        <button class="clear">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
        </button>

    `;

  const btn = favMeals.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealFromLS(mealData.idMeal);
    location.reload();
  });

  favMealsList.appendChild(favMeals);
}

async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  return respData.meals;
}

searchBtn.addEventListener("click", async () => {
  mealsEL.innerHTML = ``;

  const search = searchTerm.value;

  const meals = await getMealBySearch(search);
  meals.forEach((element) => {
    addMeal(element);
  });
});
