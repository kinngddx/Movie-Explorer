//for dom ke liye sochunga yaha dom manipulation - creathe and update krunga html elements


function displayMovies(movies){
    const movieGrid = document.getElementById('movieGrid')

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
        ? movie.Poster
        :'https://via.placeholder.com/300x450?text=No+Poster'

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

 attachCardClickListeners();


    
}

function attachCardClickListeners() {
 

    //sare elements yaha se nikal lunga mai
    const cards = document.querySelectorAll('.movie-card');
    
    
    cards.forEach(card => {
        
        card.addEventListener('click', async () => {
         
            const imdbID = card.dataset.imdbId;
            
            console.log('Card clicked! Movie ID:', imdbID);
            
       
            card.style.opacity = '0.7';
            card.style.cursor = 'wait';
            
         
            const movie = await getMovieDetails(imdbID);
            
      
            card.style.opacity = '1';
            card.style.cursor = 'pointer';
            
          //agr movie milla ot kaam krega
            if (movie) {
                showMovieDetails(movie);
            } else {
                alert('Failed to load movie details. Try again!');
            }
        });
    });
}

