// api: <api_key>
// url: https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/search/movie?api_key=<api_key>&language=en-US&page=1&include_adult=false


// model-view-controller


import Search from './models/Search';
import {elements} from './base';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import { Movie } from './models/movie';

const state = {};

//Search Controller
const searchController = async () => {
    const keyword = elements.searchInput.value;

    if (keyword) {
        state.search = new Search(keyword);

        await state.search.getResults();

        searchView.clearInput();
        searchView.clearResults();
        searchView.displayResults(state.search.data);

    }else {
        alert('anahtar kelime girmelisiniz');
    }
}

elements.searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    searchController();
    console.log("form submitted");
});

//Movie Controller

const movieController = async () => {
    const id = window.location.hash.replace('#','');
    if(id){
        state.movie = new Movie(id);
        await state.movie.getMovie();

        movieView.displayMovie(state.movie.data);
        console.log(state.movie.data);
    }
}
window.addEventListener('hashchange',movieController);