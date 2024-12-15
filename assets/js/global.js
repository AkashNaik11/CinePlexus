'use strict';

/**
 * Add events on multiple elements
 */

const addEventOnElements=function(elements,eventType,callback){
    for(const elem of elements) elem.addEventListener(eventType,callback)
}

/**
 * Toggle search box in mobile device || small search
 */

const searchBox=document.querySelector("[search-box]");
const searchTogglers=document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function(){
    searchBox.classList.toggle("active");

})



// {/* <script> */}
// document.addEventListener('DOMContentLoaded', () => {
//   const sliderList = document.querySelector('.slider-list');
//   let isDown = false;
//   let startX;
//   let scrollLeft;

//   sliderList.addEventListener('mousedown', (e) => {
//     isDown = true;
//     sliderList.classList.add('active');
//     startX = e.pageX - sliderList.offsetLeft;
//     scrollLeft = sliderList.scrollLeft;
//   });

//   sliderList.addEventListener('mouseleave', () => {
//     isDown = false;
//     sliderList.classList.remove('active');
//   });

//   sliderList.addEventListener('mouseup', () => {
//     isDown = false;
//     sliderList.classList.remove('active');
//   });

//   sliderList.addEventListener('mousemove', (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - sliderList.offsetLeft;
//     const walk = (x - startX) * 2; // Adjust the scroll speed
//     sliderList.scrollLeft = scrollLeft - walk;
//   });
// });
// // </script>


/**
 * Store movieId in "local storage" when click on any movie card
 */

const getMovieDetail=function(movieId){
    window.localStorage.setItem("movieId", String(movieId));
}


const getMovieList=function(urlParam,generName){
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", generName)
}