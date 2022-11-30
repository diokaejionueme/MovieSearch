import React, {useState} from "react";
import { MovieCard } from "./MovieCard";


function SearchMovies() {

     //states - input query,  movies
     const [query, setQuery] = useState('');
     const [movies, setMovies] = useState([]);

    const searchMovies = async (e) =>{
        e.preventDefault();
        console.log("submitting")


        const url = `https://api.themoviedb.org/3/search/movie?api_key=566f2bfd2a7ef2942721c2854a874a65&language=en-US&query=${query}&page=1&include_adult=true`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        }catch(err){
            console.log(err)
        }

    }
    return(

            <>
                <form className='form' onSubmit={searchMovies}>
                    <label htmlFor="query" className="label">Movie Name</label>
                    <input 
                        className="input" 
                        type="text" 
                        name="query" 
                        placeholder="Enter a Movie"
                        value={query}
                        onChange = {(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="button">Search</button>
                    
                </form>
                <div className="card--list">
                    {movies.filter(movie=> movie.poster_path).map(movie=> (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}

                </div>
            </>
        
    )
}

export {SearchMovies}