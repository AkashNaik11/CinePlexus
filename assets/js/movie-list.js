'use strict'

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js"
import { sidebar } from "./sidebar.js"
import { createMovieCard } from "./movie-card.js"
import { search } from "./search.js"

//Collect genername and url parameter from the local storage
const genreName=window.localStorage.getItem("genreName");
const urlParam=window.localStorage.getItem("urlParam");
const pageContent=document.querySelector("[page-content]");

sidebar();

let currentPage=1;
let totalPages=0
// const fetchURL=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false
//     &page=${currentPage}&${urlParam}`;

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false
    &page=${currentPage}&${urlParam}`, function({results: movieList, total_pages}){

    totalPages=total_pages;

    document.title=`${genreName} Movies-Tvflix`;
    const movielistElem= document.createElement("section");
    movielistElem.classList.add("movie-list", "genre-list");
    movielistElem.ariaLabel=`${genreName} Movies`;

    movielistElem.innerHTML=`
         <div class="title-wrapper">
            <h1 class="heading">All ${genreName} movies</h1>
        </div>

        <div class="grid-list"> </div>
        <button class="btn load-more" load-more>Load More</button>
    `;

/**
 * add movie card based on fetch item 
 */

    for(const movie of movieList){
        const movieCard=createMovieCard(movie);
        movielistElem.querySelector(".grid-list").appendChild(movieCard);
    }
    pageContent.appendChild(movielistElem);

/**
 * Load more button functionality
 * 
 */

    document.querySelector("[load-more]").addEventListener("click",function(){
        if (currentPage >= totalPages){
            this.style.display="none";//this== load-more-btn
            return;
        }

        currentPage++;
        this.classList.add("loading");//this==loading btn
        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false
    &page=${currentPage}&${urlParam}`, ({results: movieList})=>{
            this.classList.remove("loading");
            for(const movie of movieList){
                const movieCard=createMovieCard(movie);

                movielistElem.querySelector(".grid-list").appendChild(movieCard);
            }

        });
    });



    } );

search();

    