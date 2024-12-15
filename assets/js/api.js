'use strict';

const api_key='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWFmOWEwYTA0NDI5MjI0ZDNjNzg4NGMwMzc5N2M3YyIsIm5iZiI6MTcyMTAzNDI5NS45MzEsInN1YiI6IjY2OTRlNjM3YjlkMjc4OTRlM2JhYzA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vI29JCa4eYO6cGgZo0Xn1EZBNtM4qiOLJWI77u1CCOM';
// const imageBaseURL='https://image.tmdb.org/t/p/';
const imageBaseURL='https://image.tmdb.org/t/p/';

/**
* Fetch data from a server using the 'url' and passes the result in JSON data
* to a callback function along with an optional parameter if has 'optionalparam'
*/

const fetchDataFromServer= function(url, callback, optionalParam ) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export{imageBaseURL, api_key, fetchDataFromServer};