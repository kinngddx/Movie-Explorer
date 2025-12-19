// event listening handle krunga yaha like socho logic and all bran part yehi hai

let currentMovies = []
let currentSearchTerm = ''

document.addEventListener('DOMContentLoaded', () => {
    console.log('app initilaise ho rha')


    populateYearFilter()

    displayHistory()

    setupSearchListener();


    setupFilterListeners();

    setupModalListeners();
});
    
function setupSearchListener() {
    const searchForm = document.getElementById('searchForm')

    const searchInput = document.getElementById('searchInput')

    searchForm.addEventListener('submit', async(event)=> {

        event.preventDefault()    //page reload nhi hoga  bhai bcz form hai n to reload ho jata hai


        const searchTerm = searchInput.Value.trim()


        if(!searchTerm){
            alert('Please Enter a Movie Name')
            return;
        }


        console.log('Searchiing for🔍:' , searchTerm)

//loading indicator yaha dikha deta hu
         const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
            <h2>Searching... 🔍</h2>
        </div>
    `;




    // console.log('Found', movies.length, 'movies')

    
 // Calling  API//
        const movies = await searchMovies(searchTerm);
        
      
        currentMovies = movies;
        currentSearchTerm = searchTerm;
        
        displayMovies(movies);
        
        addToHistory(searchTerm);
       
        document.getElementById('filterRating').value = '0';
        document.getElementById('filterYear').value = 'all';
        
        console.log('✅ Found', movies.length, 'movies');
    });
}



function setupFilterListeners() {
    const yearFilter = document.getElementById('filterYear');
    const clearBtn = document.getElementById('clearFilters');
    
    
    yearFilter.addEventListener('change', applyFilters);
    
    
    clearBtn.addEventListener('click', () => {
        document.getElementById('filterRating').value = '0';
        document.getElementById('filterYear').value = 'all';
        displayMovies(currentMovies);
        console.log('🔄 Filters cleared ho gya');
    });
}




function applyFilters() {

    const yearFilter = document.getElementById('filterYear').value;
    
    console.log('🔧 Applying filters:', { year: yearFilter });
    
   
    let filteredMovies = [...currentMovies];
    
  
    if (yearFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie => movie.Year === yearFilter);
    }
    
    console.log('📊 Filtered to', filteredMovies.length, 'movies');
    
  
    displayMovies(filteredMovies);
}



function setupModalListeners() {
    const modal = document.getElementById('movieModal');
    const closeBtn = document.getElementById('modalClose');
    
    
    closeBtn.addEventListener('click', closeModal);
    
    
  modal.addEventListener('click', (event) => {
    console.log('Clicked:', event.target);  
    console.log('Modal:', modal);
    console.log('Are they same?', event.target === modal);
    
    if (event.target === modal) {
        closeModal();
    }
});
    
   
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }

    });


//different ways de diya maine close krne ka modal ko 
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}


        //teem trike se maine close kr diya esc , outside area and close button

        