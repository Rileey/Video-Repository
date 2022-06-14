import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/navbar'
import '../css/search.modules.css'
import SearchItem from '../components/searchItem'
import SearchBar from '../components/searchBar'
import { useNavigate, useSearchParams, creareSearchParams, useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce';
import { MovieContext } from '../Context/movieContext/movieContext'
import { getMovies } from '../Context/movieContext/apicalls'

const Search = () => {
    const history = useNavigate()
    
    // const [movies, setMovies] = useState([])
    const { movies, dispatch } = useContext(MovieContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    // const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    useEffect(() => {
        getMovies(dispatch)
    }, [dispatch])

    const handleFilter = (e) => {
        e.preventDefault()
        history(`/search?q=${searchTerm}`)
        setSearchTerm(e.target.value);
        setSearchTerm(e.target.value)
        
    }

    // useEffect(() => {
    //     const params = new URLSearchParams();
    //     if (searchTerm) {  
    //       params.append("q", searchTerm);
    //       history({ search: params.toString() });
    //     } else {
    //       params.delete("q");
    //     }
    //   }, [searchTerm, history]);

  return (
      <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="search-background">
      <div className="search">
        <input className="searchs-input" type="text" name="" placeholder="Search..." id="" onChange={handleFilter} />
      </div>
    <div className='search-container'>
        <div className="search-list-container"
        
        >
            {
                movies.filter((content) => {
                    if (searchTerm === "") {
                        return content
                    } else if (content.title.toLowerCase().includes(searchTerm.toLowerCase()) || content.director.toLowerCase().includes(searchTerm.toLowerCase()) || content.description.toLowerCase().includes(searchTerm.toLowerCase()) || content.genre.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return content
                    }  
                    //sorting in alphabetical order
                    }).sort((a, b) => a.title > b.title ? 1 : -1).map((content) => {
                        return (
            <div className='search-list-wrapper' key={content._id}>
                <SearchItem content={content}/>
            </div>
                        );
            })}
                
        </div>
    </div>
    </div>
    </>
  )
}

export default Search