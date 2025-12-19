//for dom ke liye sochunga yaha

function displayMovies(movies){
    const moviegrid = document.getElementById('moviegrid')

    moviegrid.innerHTML = ''
    

    if(movies.length===0){`
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h2>No movies found 🎬</h2>
                <p>Try a different search term</p>
            </div>
        `;

        
   return
    }


    movies.forEach(movie =>{

        const posterUrl = movie.Poster !=='N/A' 

        const cardHTML = `
    <article class="movie-card" data-imdb-id="${movie.imdbID}">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-card-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    </article>
`;
movieGrid.innerHTML += cardHTML;

    })

    function attachCardClickListeners(){
        const cards = document.querySelectorAll('.movie-card')
    };





   
const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

    


    
}

