'use strict';
/*
** Import all components and functions
*/

import {sidebar} from "./sidebar.js";
import {api_key, imageBaseURL, fetchDataFromServer} from "./api.js";
import {createMovieCard} from "./movie-card.js";
import { search } from "./search.js"
const pageContent= document.querySelector("[page-content]");

sidebar();

/**
 * Homepage section (TopRated, Upcoming, Trending Movies)
 * 
 */

const homePageSections=[
    {
        title:"Upcoming Movies",
        path:"/movie/upcoming"
    },
    {
        title:"Today's Trending",
        path:"/trending/movie/week"
    },

    {
        title:" Top Rated movies",
        path:"/movie/top_rated"
    },
]



 /**
  * fetch all geners eg:[{"id": "123","name", "action"}]
  * then change gener format eg:{123:"action"}
  */
 const genreList={

    //create genre string from genre-id eg:[23,43]--->"action , romance"

    asString(genreIdList){
        let newGenreList=[];

        for(const genreId of genreIdList){
            this[genreId] && newGenreList.push(this[genreId]);
        }

        return newGenreList.join(", ");

    }
 };

 fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, 
     function({genres}) {
         for(const {id, name} of genres){
             genreList[id]=name;
         }

        fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page_1`, heroBanner);
 }); 

const heroBanner= function({results: movieList}){

    const banner=document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel= "popular movies";
    banner.innerHTML=`
        <div class="banner-slider">

        </div>

        <div class="slider-control">
            <div class="control-inner">
                <button class="poster-box slider-item"> 
                </button>

            </div>
        </div>`;

        let controlitemIndex=0;

        for(const[index, movie] of movieList.entries()){
            const{
                backdrop_path,
                title,
                release_date,
                genre_ids,
                overview,
                poster_path,
                vote_average,
                id
            } = movie;


            const sliderItem= document.createElement("div");
            sliderItem.classList.add("slider-item");
            sliderItem.setAttribute("slider-item", "");

            sliderItem.innerHTML=`

                 <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}"
                 class="img-cover" loading=${index ==0 ? "eager" : "lazy"}>

                 <div class="banner-content">
                    <h2 class="heading">${title}</h2>

                    <div class="meta-list">
                        <div class="meta-item">${release_date.split("-")[0]}</div>
                        <div class="meta-item card-badge">${vote_average.toFixed(1)}</div> 
                    </div>
                    <p class="genre">${genreList.asString(genre_ids)}</p>
                    <p class="banner-text">${overview}</p>

                    <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                        <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">

                        <span class="span"> Watch now</span>

                    </a>

                 </div>
            
            `;


            banner.querySelector(".banner-slider").appendChild(sliderItem);


            const controlItem=document.createElement("button");
            controlItem.classList.add("poster-box", "slider-item");
            controlItem.setAttribute("slider-control",`${controlitemIndex}`);

            controlitemIndex++;
            controlItem.innerHTML=`
            <img src="${imageBaseURL}w154${poster_path}" 
            alt="Slide to ${title}" loading="lazy" draggable="false"
            class="img-cover">`;

            banner.querySelector(".control-inner").appendChild(controlItem);


        }


        pageContent.appendChild(banner);

        addHeroslide();



        /**
         * fetch data for home page section (top rated , upcoming, trending)
         */

        for(const{title,path} of homePageSections){
            fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList, title);
        }

    }

/**
 * Hero slider functionality
 */

    const addHeroslide=function(){
        const sliderItems=document.querySelectorAll("[slider-item]");

        const sliderControls= document.querySelectorAll("[slider-control]");

        let lastSliderItem=sliderItems[0];
        let lastSliderControl=sliderControls[0];

        lastSliderItem.classList.add("active");
        lastSliderControl.classList.add("active");

        const sliderStart=function(){
            lastSliderItem.classList.remove("active");
            lastSliderControl.classList.remove("active");

            //this== slider-control
            sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
            this.classList.add("active");

            lastSliderItem= sliderItems[Number(this.getAttribute("slider-control"))];
            lastSliderControl=this;

        }

        addEventOnElements(sliderControls, "click", sliderStart);
    }

const createMovieList= function({results:movieList}, title){
    const movielistElem=document.createElement("section");
    movielistElem.classList.add("movie-list");
    movielistElem.ariaLabel=`${title}`;

    movielistElem.innerHTML=`
        <div class="title-wrapper">
            <h1 class="title large">${title}</h1>
        </div><br>

        <div class="slider-list">
            <div class="slider-inner">
            </div>
        </div>
    
    `;

    for (const movie of movieList){
        const movieCard=createMovieCard(movie);//called from movie_card.js


        movielistElem.querySelector(".slider-inner").appendChild(movieCard);
    }

    pageContent.appendChild(movielistElem);
}

search();
