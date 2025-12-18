//obviosuly all app search movies sb kaam yaha krenge
//socho yaha pr mai sb kuch mai jo commmunicate rkujga api se wo handle krun
// ga bhai



// function searchMovies(search) {
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.Response === 'True') {
//                 return data.Search;
//             } else {
//                 return [];
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             return [];
//         });
// }


async function searchMovies(search) {


    const url = `https://www.omdbapi.com//?s=${search}&apikey=78915f33`;
    console.log('api call kr')

 


   try{

    const response = await fetch(url)  
    
    
    const data = await response.json()


    console.log('api tested ')
    if(data.Response==='True'){
        return data.Search
    }else{
        console.log('No results ')
        return[]
    }


}

catch(error){
    console.error('Error', error)
        return[]
    
}



}

async function getMovieDetails(imdbID) {



    
    const url = `https://www.omdbapi.com//?i=${imdbID}&apikey=78915f33`;
    
    console.log('Getting details for:', imdbID);
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Movie details milega:', data);
        
        if (data.Response === 'True') {
            return data;  
        } else {
            console.log('Movie nii mila');
            return null;
        }
        
    } catch (error) {
        console.error('API ERROR:', error);
        return null;
    }
}



function populateYearFilter() {
    const currentYear = new Date().getFullYear();  
    const startYear = 1990;
    const numberOfYears = currentYear - startYear + 1;  
    

    const years = Array.from(
        {length: numberOfYears},
        (_, index) => currentYear - index
    );
    
    
    const yearFilter = document.getElementById('filterYear');
    
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
    
    console.log('Year filter populated ', years.length, 'years');
}
