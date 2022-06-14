import { ArrowDropDown, Notifications, KeyboardArrowDownOutlined } from '@material-ui/icons'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useContext, useState, useRef } from 'react'
import { useEffect } from 'react'
import { createSearchParams, Link, useSearchParams } from 'react-router-dom'
import '../css/navbar.modules.css'
import SearchBar from './searchBar'
import axios from 'axios'
import { AuthContext } from '../authContext/authContext'
import { logout } from '../authContext/authActions'
import { useNavigate } from 'react-router-dom'
import useDebounce from './debounce_hook/useDebounce'
import Media from "react-media"


const Navbar = ({ searchTerm, 
    setSearchTerm, 
}) => {
    const history = useNavigate()
    const input = setSearchTerm

    // const params = useParams().id


    const debouncedSearch = useDebounce(searchTerm,
        //  500
         )
    const params = {q: debouncedSearch}
    const [isScrolled, setisScrolled] = useState(false);
    const [movie, setMovie] = useState([]);
    const [user, setUser] = useState([])
    const {dispatch, user: userInfo} = useContext(AuthContext)
    const searchRef = useRef(null)
    

    window.onscroll = () => {
        setisScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }

    useEffect(()=> {
        const getUser = async () => {
            const res = await axios.get(`/users/find/${userInfo._id}`, {
                headers: {
                    token: userInfo.accessToken
                }
            })
            setUser(res.data)
        }
        getUser()
    }, [userInfo._id, userInfo.accessToken])

    
    
    useEffect(() => {
      const getMovie = async () => {
          const res = await axios.get('/movies', {
              headers: {
                  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzIyMjYsImV4cCI6MTY0MzIyNDIyNn0.FliBS9psdYuSEbr2OHwGf4iurw4ZjDYUJlbDggfnv1M'
              }
          })
          setMovie(res.data)
      }
      getMovie()
  }, [])

  if (user.length === 0) {
      return null
  }

  function setClicked() {
      dispatch(logout())
      history('/register')
  }

  const handleFilter = (event) => {
        event.preventDefault()
        history({
            // pathname: '/search',
            search: `?${createSearchParams(params)}`
        })

        input(event.target.value);
    // }
    
    }

    const handleFocus = (e) => {
        e.preventDefault()
        searchRef.current.style.visibility = 'hidden';
        history('/search')
        
    }

    const handleSearch = () => {
        history('/search')
    }
    
    
    
  

    return (
        <div className={isScrolled ? 'scrolled' : 'navbar'}>
            <div className="nav-container">
                <div className="nav-left">
                <Link to='/' style={{textDecoration: 'none', color: 'white', marginRight: '20px'}}>
                    <span className="logo">talentcroft</span>
                    </Link>

                    
                        <div className="dropdown">
                        <span style={{textDecoration: 'none', color: 'white', marginLeft: '20px'}}><KeyboardArrowDownOutlined/></span>
                        <div className="dropdown-content">
                        <Link to='/' style={{textDecoration: 'none', color: 'white', padding: '10px 0', marginLeft: '50px'}} className='mennu'>
                        <p>Home</p>
                        </Link>
                        <Link to='/series' style={{textDecoration: 'none', color: 'white', padding: '10px 0', marginLeft: '50px'}} className='mennu'>
                        <p>Shows</p>
                        </Link>
                        <Link to='/movies' style={{textDecoration: 'none', color: 'white', padding: '10px 0', marginLeft: '50px'}} className='mennu'>
                        <p>Movies</p>
                        </Link>
                        <Link to='/community' style={{textDecoration: 'none', color: 'white', padding: '10px 0', marginLeft: '50px'}} className='mennu'>
                        <p>Community</p>
                        </Link>
                        </div>
                        </div>

                <div className="longbar">
                    <Link to='/' style={{textDecoration: 'none', color: 'white', marginRight: '20px'}} className='mennu'>
                    <span>Home</span>
                    </Link>
                    <Link to='/series' style={{textDecoration: 'none', color: 'white', marginRight: '20px'}} className='mennu'>
                        <span>Shows</span>
                    </Link>
                    <Link to='/movies' style={{textDecoration: 'none', color: 'white', marginRight: '20px'}} className='mennu'>
                        <span>Movies</span>
                    </Link>
                    <Link to='/community' style={{textDecoration: 'none', color: 'white', marginRight: '20px'}} className='mennu'>
                        <span>Community</span>
                    </Link>
                    </div>
                </div>
                <div className="nav-right mennu" >
                <>
        <Media query = '(min-width: 945px)'>
      {
        matches => {
          return matches 
          ? (
                    <div className="search-s" >
                        {/* <SearchBar onClick={handleSearch} /> */}
                        <div className="search">
                            <input className="searchs-input" type="text" name="" placeholder="Search..." id=""  
                            ref={searchRef} onClick={handleFocus}
                            />
                        </div>
                    </div> ) : (
                        <div className="search-s" >
                        
                        <div className="search">
                            {/* <input className="searchs-input" type="text" name="" placeholder="Search..." id=""  
                            ref={searchRef} onClick={handleFocus}
                            /> */}
                            <SearchRoundedIcon ref={searchRef} onClick={handleFocus} />
                        </div>
                    </div> 
                    )}}
                      </Media>
                      
        </>
                    <Link to={`/profile/${user._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <img className="avatar" src={user.profilePicture[0]?.profilePicture || '../stockphoto.jpeg'} alt="" srcset="" />
                    </Link>
                    <div className="profile">
                        <ArrowDropDown className='icon'/>
                        <div className="options">
                            <Link to={`/account/${user._id}`} style={{textDecoration: 'none', color: 'white'}}>
                                <span className='drop-option'>Account</span>
                            </Link>
                            <span className='drop-option' onClick={setClicked}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
