import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView.js';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const controleRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResult());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlerSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    resultsView.render(model.getSearchResult());
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlePagination = function (btnGoTo) {
  resultsView.render(model.getSearchResult(btnGoTo));
  paginationView.render(model.state.search);
};

const controleServing = function (newServings) {
  model.upadateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controleAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.removeBookMark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const constroleBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controleAddRecipe = async function (newRecipe) {
  try {
    recipeView.renderSpinner();
    addRecipeView.toggleWindow();

    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controleRecipes);
  searchView.addHandlerListner(controlerSearchResults);
  paginationView.addHandlerClick(controlePagination);
  recipeView.addHandlerUpdateServings(controleServing);
  recipeView.addHandlerAddBookmark(controleAddBookMark);
  bookmarksView.addHandlerBookmarks(constroleBookmarks);
  addRecipeView.addHandlerUpload(controleAddRecipe);
};
init();

// if (module.hot) {
//   module.hot.accept();
// }
