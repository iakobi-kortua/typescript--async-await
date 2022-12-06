import "../css/style.css"

let searchedFilm = '';
const input = document.querySelector('#search');
const searchBtn = document.querySelector('#searchBtn');
const appendDiv = document.querySelector('.append-div');

searchBtn.addEventListener("click", () => {
    appendDiv.innerHTML =''
    searchedFilm = input.value;
    fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${searchedFilm}`)
    .then((filmData) => filmData.json())
    .then((filmData) => {
        // Country's Api
        fetch(`https://restcountries.com/v3.1/name/${filmData.Country}`)
        .then((countryData) => countryData.json())
        .then((countryData) => {
            let img = document.createElement('img');
            img.src = countryData[0].flags.png;
            forCurAndFlag.append(img);
        });


        // for actors names
        let str = filmData.Actors
        let arr = str.split(" ");
        let actorsArr = [];

        arr.forEach((names , i) => {
            if(i % 2 == 0){
                actorsArr.push(names);
            }
        });
        let actors = actorsArr.join();


        let div = document.createElement('div');
        div.innerHTML =`    
                        <div class="film-div">
                                <p>Year: ${filmData.Year}</p>
                                <p>Actors: ${actors} </p>
                        </div>`
        appendDiv.append(div); 
        const forCurAndFlag = document.querySelector('.film-div');
        input.value = '';               
    });
});




const first = document.querySelector('#searchF');
const second = document.querySelector('#searchS');
const third = document.querySelector('#searchT');
const filmsBtn = document.querySelector('#filmsBtn');
const timeAndPop = document.querySelector('.time-and-population');

async function getMovie(url){
    const json = await fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${url}`);
    const data = await json.json();
    return data;
}

async function getCountry(url){
    const json = await fetch(`https://restcountries.com/v3.1/name/${url}`);
    const data = await json.json();
    return data;
}


filmsBtn.addEventListener("click", () => {
    const firstMovie = getMovie(first.value);
    const secondMovie = getMovie(second.value);
    const thirdMovie = getMovie(third.value);

    Promise.all([firstMovie,secondMovie,thirdMovie])
    .then(allData => {
        let movieLength = 0;
        let populations = 0;
        allData.forEach(item => {
            // Calculate Mins
            if(item.Runtime == "N/A"){
                item.Runtime = 0;
            }
            if(item.Runtime != 0){
                const min = item.Runtime.split(" ");
                movieLength += Number(min[0]);    
            }
            const country = getCountry(item.Country);
            Promise.resolve(country).then(x => {
                populations += x[0].population;
            });
        })
        timeAndPop.append(movieLength);
    });
});


