//for dom ke liye sochunga yaha dom manipulation - creathe and update krunga html elements


function displayMovies(movies){
    const movieGrid = document.getElementById('movieGrid')
    movieGrid.innerHTML = ''
    
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
            
       //yaha pr 0.7 seconds ke liye proces krega
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




function showMovieDetails(movie) {
    // Get modal elements from HTML
    const modal = document.getElementById('movieModal');
    const modalBody = document.getElementById('modalBody');
    
   //pehle dekh le poster exist krta ki nhi 
    const posterUrl = movie.Poster !== 'N/A' 
        ? movie.Poster 
        : 'https://via.placeholder.com/300x450?text=No+Poster';
    
   //poster left me rhega and info right me rkhunga

    const modalHTML = `
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
            
            <!-- Left side: Movie Poster -->
            <div style="flex: 0 0 300px;">
                <img src="${posterUrl}" 
                     alt="${movie.Title}" 
                     style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            </div>
            
            <!-- Right side: Movie Information -->
            <div style="flex: 1; min-width: 300px;">
                
                <!-- Title -->
                <h2 style="margin: 0 0 15px 0; font-size: 32px;">
                    ${movie.Title}
                </h2>
                
                <!-- Quick Info: Rating, Year, Runtime -->
                <p style="color: #b3b3b3; margin-bottom: 20px; font-size: 16px;">
                    ⭐ <strong style="color: #ffd700;">${movie.imdbRating || 'N/A'}</strong>/10 | 
                    📅 ${movie.Year} | 
                    ⏱️ ${movie.Runtime}
                </p>
                
                <!-- Plot Summary -->
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #e50914; margin-bottom: 10px;">Plot</h3>
                    <p style="line-height: 1.6;">
                        ${movie.Plot || 'No plot available.'}
                    </p>
                </div>
                
                <!-- Director -->
                <p style="margin-bottom: 10px;">
                    <strong style="color: #e50914;">Director:</strong> 
                    ${movie.Director || 'N/A'}
                </p>
                
                <!-- Actors -->
                <p style="margin-bottom: 10px;">
                    <strong style="color: #e50914;">Cast:</strong> 
                    ${movie.Actors || 'N/A'}
                </p>
                
                <!-- Genre -->
                <p style="margin-bottom: 10px;">
                    <strong style="color: #e50914;">Genre:</strong> 
                    ${movie.Genre || 'N/A'}
                </p>
                
                <!-- Language -->
                <p style="margin-bottom: 10px;">
                    <strong style="color: #e50914;">Language:</strong> 
                    ${movie.Language || 'N/A'}
                </p>
                
                <!-- Box Office (if available) -->
                ${movie.BoxOffice ? `
                    <p style="margin-bottom: 10px;">
                        <strong style="color: #e50914;">Box Office:</strong> 
                        ${movie.BoxOffice}
                    </p>
                ` : ''}
                
            </div>
        </div>
    `;
    
    
    modalBody.innerHTML = modalHTML;
    modal.classList.add('active');
}

function closeModal() {
    
    const modal = document.getElementById('movieModal');
    
    modal.classList.remove('active');
}


function addToHistory(searchTerm) {
  
    if (!searchTerm || searchTerm.trim() === '') {
        return;
    }
    
    
    searchTerm = searchTerm.trim().toLowerCase();
    
    let history = localStorage.getItem('searchHistory');
    history = history ? JSON.parse(history) : [];
  
    if (history.includes(searchTerm)) {
        history = history.filter(term => term !== searchTerm);
    }
    
   

    //recent history top pr show hoga humesha
    history.unshift(searchTerm);

    //isse max 5 ya jitna chaho utna history hi visible krwaynege
    history = history.slice(0, CONFIG.MAX_HISTORY);
    
    localStorage.setItem('searchHistory', JSON.stringify(history));
    
    displayHistory();
    
    console.log('Added to history:', searchTerm);
}





function displayHistory() {
    //  history list element from HTML nikalana hai
    const historyList = document.getElementById('historyList');
    
    //history ko local storage se niklana padega
    let history = localStorage.getItem('searchHistory');
    history = history ? JSON.parse(history) : [];
    
    historyList.innerHTML = '';
    
   
    if (history.length === 0) {
        historyList.innerHTML = `
            <li style="color: #666; padding: 10px; text-align: center;">
                No recent searches
            </li>
        `;
        return;
    }
    
    
    history.forEach(term => {
        
        const li = document.createElement('li');
        li.className = 'history-item';
        li.textContent = term;
        
        // Add click listener to re-search this term
        li.addEventListener('click', () => {
            console.log('Re-searching from history:', term);
            
            
            const searchInput = document.getElementById('searchInput');
            searchInput.value = term;
            
            const searchForm = document.getElementById('searchForm');
            searchForm.dispatchEvent(new Event('submit'));
        });
        
       
        historyList.appendChild(li);
    })

}
